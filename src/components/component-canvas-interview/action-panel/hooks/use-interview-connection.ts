   import { useRef, useState, useCallback } from 'react';
   import { useDispatch } from 'react-redux';
   import {
     alertDialogActions,
     interviewConversationActions,
   } from '../../../../store';
   import {
     createInterviewSession,
     InterviewSessionInfo,
     reportInterviewDuration,
   } from '../../../component-service-proxy';
   import { usePromptGenerator } from './use-prompt-generator';
   
   interface UseInterviewConnectionProps {
     onStartInterview: () => void;
     onStopInterview: () => Promise<void>;
   }
   
   export function useInterviewConnection({
     onStartInterview,
     onStopInterview,
   }: UseInterviewConnectionProps) {
     const dispatch = useDispatch();
   
     const [interviewActive, setInterviewActive] = useState(false);
     const [isProcessing, setIsProcessing] = useState(false);
   
     /* ───── bookkeeping refs ──────────────────────────────── */
     const startTimeRef      = useRef<number | null>(null);
     const sessionIdRef      = useRef<string | null>(null);
     const limitTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
     const countdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
   
     /* ───── WebRTC refs ───────────────────────────────────── */
     const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
     const dataChannelRef    = useRef<RTCDataChannel | null>(null);
     const audioRef          = useRef<HTMLAudioElement | null>(null);
     const mediaStreamRef    = useRef<MediaStream | null>(null);
   
     const promptGenerator = usePromptGenerator();
   
     /* -------------------------------------------------------
        Stop interview (cleanup + duration report)
        ------------------------------------------------------- */
     const stopInterview = useCallback(async () => {
       /* clear any running timers */
       if (limitTimerRef.current)     clearTimeout(limitTimerRef.current);
       if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
       limitTimerRef.current = countdownTimerRef.current = null;
   
       /* close PeerConnection */
       peerConnectionRef.current?.close();
       peerConnectionRef.current = null;
       dataChannelRef.current    = null;
   
       /* stop local mic */
       if (mediaStreamRef.current) {
         mediaStreamRef.current.getTracks().forEach((t) => t.stop());
         mediaStreamRef.current = null;
       }
   
       /* record duration → server */
       if (startTimeRef.current && sessionIdRef.current) {
         const durationMs = Date.now() - startTimeRef.current;
         try {
           await reportInterviewDuration({
             sessionId: sessionIdRef.current,
             durationMs,
           });
         } catch (err) {
           console.error('[Interview] failed to report duration', err);
         }
       }
   
       setInterviewActive(false);
       await onStopInterview();
     }, [onStopInterview]);
   
     /* -------------------------------------------------------
        Start interview (creates session + timers)
        ------------------------------------------------------- */
     const startInterview = useCallback(async () => {
       try {
         setIsProcessing(true);
   
         /* 1 ) build tailored prompt */
         const prompt = await promptGenerator();
   
         /* 2 ) ask server for session + time budget */
         const {
           sessionId,
           ephemeralKey,
           allowedSeconds,
           countdownSeconds,
         }: InterviewSessionInfo = await createInterviewSession();
   
         sessionIdRef.current = sessionId;
         startTimeRef.current = Date.now();
   
         /* 3 ) WebRTC setup */
         const pc = new RTCPeerConnection();
         peerConnectionRef.current = pc;
   
         const audioEl = document.createElement('audio');
         audioEl.autoplay = true;
         audioRef.current = audioEl;
         pc.ontrack = (e) => (audioEl.srcObject = e.streams[0]);
   
         const mic = await navigator.mediaDevices.getUserMedia({ audio: true });
         mediaStreamRef.current = mic;
         pc.addTrack(mic.getTracks()[0]);
   
         /* 4 ) data channel */
         const dc = pc.createDataChannel('oai-events');
         dataChannelRef.current = dc;
   
         dc.addEventListener('message', (ev) => {
           const evt = JSON.parse(ev.data);
   
           if (evt.type === 'session.created') {
             dc.send(
               JSON.stringify({
                 type: 'session.update',
                 session: {
                   instructions: prompt,
                   input_audio_transcription: { model: 'whisper-1' },
                   turn_detection: {
                     type: 'server_vad',
                     silence_duration_ms: 1200,
                   },
                 },
               }),
             );
             dc.send(JSON.stringify({ type: 'response.create' }));
           } else if (
             evt.type === 'response.done' &&
             evt?.response?.output?.[0]?.content?.[0]?.transcript
           ) {
             dispatch(
               interviewConversationActions.addLiveConversationMessage({
                 role: 'interviewer',
                 content: evt.response.output[0].content[0].transcript,
               }),
             );
           } else if (
             evt.type ===
               'conversation.item.input_audio_transcription.completed' &&
             evt.transcript
           ) {
             dispatch(
               interviewConversationActions.addLiveConversationMessage({
                 role: 'interviewee',
                 content: evt.transcript,
               }),
             );
           }
         });
   
         /* 5 ) SDP exchange */
         const offer = await pc.createOffer();
         await pc.setLocalDescription(offer);
   
         const baseUrl = 'https://api.openai.com/v1/realtime';
         const model   = 'gpt-4o-mini-preview-preview-2024-12-17';
   
         const sdpResp = await fetch(`${baseUrl}?model=${model}`, {
           method: 'POST',
           body: offer.sdp,
           headers: {
             Authorization: `Bearer ${ephemeralKey}`,
             'Content-Type': 'application/sdp',
           },
         });
   
         await pc.setRemoteDescription({
           type: 'answer',
           sdp: await sdpResp.text(),
         });
   
         /* 6 ) timers: countdown + hard stop */
         if (countdownSeconds < allowedSeconds) {
           countdownTimerRef.current = setTimeout(() => {
             dispatch(
               alertDialogActions.showAlert({
                 title: 'Time notice',
                 message: `The interview will end in ${countdownSeconds} seconds.`,
               }),
             );
           }, (allowedSeconds - countdownSeconds) * 1000);
         }
   
         limitTimerRef.current = setTimeout(async () => {
           dispatch(
             alertDialogActions.showAlert({
               title: 'Time up',
               message: 'Your time budget for this interview is over.',
             }),
           );
           await stopInterview();          // graceful end
         }, allowedSeconds * 1000);
   
         /* 7 ) done */
         onStartInterview();
         setIsProcessing(false);
         setInterviewActive(true);
       } catch (err) {
         console.error('[Interview] start error', err);
         dispatch(
           alertDialogActions.showAlert({
             title: 'Start Interview Error',
             message: 'An error occurred while starting the interview.',
           }),
         );
         setIsProcessing(false);
       }
     }, [dispatch, promptGenerator, stopInterview, onStartInterview]);
   
     /* ------------------------------------------------------- */
     const toggleInterview = useCallback(async () => {
       interviewActive ? await stopInterview() : await startInterview();
     }, [interviewActive, startInterview, stopInterview]);
   
     return { interviewActive, isProcessing, toggleInterview };
   }
   