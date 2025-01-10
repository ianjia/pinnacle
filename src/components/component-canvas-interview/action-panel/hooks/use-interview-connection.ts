import { useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { alertDialogActions, interviewConversationActions } from '../../../../store';
import {
  getEphemeralKey,
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

  const [interviewActive, setInterviewActive] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // WebRTC references
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const promptGenerator = usePromptGenerator();

  /**
   * Start the interview, mainly the setup through WebRTC with OpenAI realtime service.
   */
  const startInterview = useCallback(async () => {
    try {
      setIsProcessing(true);

      // 1) Prepare the prompt with student info
      const prompt: string = await promptGenerator();

      // 2) Retrieve ephemeral key from server
      const EPHEMERAL_KEY = await getEphemeralKey();

      // 3) Create the PeerConnection
      const peerConnection = new RTCPeerConnection();
      peerConnectionRef.current = peerConnection;

      // 4) Create an audio element for remote audio
      const audioEl = document.createElement('audio');
      audioEl.autoplay = true;
      audioRef.current = audioEl;

      peerConnection.ontrack = (e) => {
        audioEl.srcObject = e.streams[0];
      };

      // 5) Get local audio track
      const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = mediaStream;
      peerConnection.addTrack(mediaStream.getTracks()[0]);

      // 6) Create DataChannel
      const dataChannel = peerConnection.createDataChannel('oai-events');
      dataChannelRef.current = dataChannel;

      dataChannel.addEventListener('message', (e) => {
        const serverEvent = JSON.parse(e.data);

        // Session created => set up instructions
        if (serverEvent.type === 'session.created') {
          const event = {
            type: 'session.update',
            session: {
              instructions: prompt,
              input_audio_transcription: { model: 'whisper-1' },
              turn_detection: {
                type: 'server_vad',
                silence_duration_ms: 1200,
              },
            },
          };
          dataChannel.send(JSON.stringify(event));

          // Start conversation from server side
          const initResponseEvent = {
            type: 'response.create',
          };
          dataChannel.send(JSON.stringify(initResponseEvent));
        }
        // When server sends a final transcript for the interviewer
        else if (
          serverEvent.type === 'response.done' &&
          serverEvent?.response?.output?.[0]?.content?.[0]?.transcript
        ) {
          const transcript = serverEvent.response.output[0].content[0].transcript;
          dispatch(
            interviewConversationActions.addLiveConversationMessage({
              role: 'interviewer',
              content: transcript,
            })
          );
        }
        // When server sends a transcript of the interviewee’s spoken words
        else if (
          serverEvent.type === 'conversation.item.input_audio_transcription.completed' &&
          serverEvent.transcript
        ) {
          dispatch(
            interviewConversationActions.addLiveConversationMessage({
              role: 'interviewee',
              content: serverEvent.transcript,
            })
          );
        }
      });

      // 7) Create offer & set local description
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      // 8) Send offer to OpenAI’s Realtime endpoint
      const baseUrl = 'https://api.openai.com/v1/realtime';
      const model = 'gpt-4o-mini-preview-preview-2024-12-17';

      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          'Content-Type': 'application/sdp',
        },
      });

      // 9) Set remote description
      const answer: RTCSessionDescriptionInit = {
        type: 'answer',
        sdp: await sdpResponse.text(),
      };
      await peerConnection.setRemoteDescription(answer);

      // 10) DataChannel open event
      dataChannel.onopen = () => {
        console.log('Data channel is open');
      };

      onStartInterview();
      setIsProcessing(false);
      setInterviewActive(true);
    } catch (error) {
      console.error('Error initializing real-time connection:', error);
      dispatch(
        alertDialogActions.showAlert({
          title: 'Validation Error',
          message: 'An error occurred while starting the interview.',
        })
      );
      setIsProcessing(false);
    }
  }, [dispatch, prompt]);

  /**
   * Stop the interview (close everything).
   */
  const stopInterview = useCallback(async () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    dataChannelRef.current = null;

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    setInterviewActive(false);
    await onStopInterview();
  }, [onStopInterview]);

  /**
   * Toggle between start/stop interview.
   */
  const toggleInterview = useCallback(async () => {
    if (interviewActive) {
      await stopInterview();
    } else {
      await startInterview();
    }
  }, [interviewActive, startInterview, stopInterview]);

  return {
    interviewActive,
    isProcessing,
    toggleInterview,
  };
}
