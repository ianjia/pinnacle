import React, { useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Input,
  Button,
  CardPreview,
  Field,
  mergeClasses,
} from '@fluentui/react-components';

import { getCollegeNameKey } from '../../component-map';
import { getEphemeralKey, getStudentProfileInStr, SERVER_URL } from '../../component-service-proxy';
import { api, AuthContext } from '../../../auth';
import { interviewConversationActions, RootState } from '../../../store';
import { useStyles } from './interview-action-panel.styles';
import { InterviewActionPanelProps } from './interview-action-panel.types';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { Major } from '../../../shared';

export const InterviewActionPanel: React.FC<InterviewActionPanelProps> = ({
    onStartInterview,
    onStopInterview,
    onInterviewReview,
  }) => {

    const dispatch = useDispatch();
    const styles = useStyles();
  
    // Redux states
    const storeCollege: string = useSelector(
      (state: RootState) => state.conversation.college
    );
    const storeMajor: string = useSelector(
      (state: RootState) => state.conversation.major
    );
  
    // Local states
    const [collegeInput, setCollegeInput] = useState(storeCollege);
    const collegeInputRef = useRef<HTMLInputElement>(null);
  
    const [interviewActive, setInterviewActive] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
    // WebRTC references
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
    const dataChannelRef = useRef<RTCDataChannel | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    let offical_prompt = "";
  
    // Example prompt for the interview
    const prompt: string = `Your are playing the role of a college admission interviewer representing harvard university to interview 
                        a high school senior student. Please perform this interviewer role, ask questions based on the the information
                        provided here and based on the answer from the student, please also answer questions that the student asks.
                        Your questions should be able to help find out whether this student is a good fit for the college and whether 
                        the candidate should be admitted. Please continue the interview till you think you are confident to give a 
                         recommendation on whether we should admit, reject or waitlist this student. After that, please answer with 
                         the recommendation and the reasons of the recommendation, then stop asking or answering questions. Of course, 
                         if there is strong signal that the student does not fit, you could end the interview early, and give recommendation.`;
    
    /**
     * Validate and set the college name from user input.
     */
    const handleCollegeBlur = () => {
      const matchedCollegeName = getCollegeNameKey(collegeInput);
      if (matchedCollegeName) {
        setCollegeInput(matchedCollegeName);
        dispatch(interviewConversationActions.setCollege(matchedCollegeName));
      } else {
        alert('The college name you entered is not valid. Please re-enter.');
      }
    };
  
    const handleCollegeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        collegeInputRef.current?.blur();
      }
    };
  
    /**
     * Major change
     */
    const handleMajorChange = (newMajor: string) => {
      dispatch(interviewConversationActions.setMajor(newMajor));
    };
  
    /**
     * Start interview: sets up WebRTC + ephemeral token logic
     */
    const init = async () => {
      try {
        onStartInterview();
        const student_info: string = await getStudentProfileInStr();
        offical_prompt = prompt + student_info;

        setIsProcessing(true);
  
        // 1) Retrieve ephemeral key from server
        const EPHEMERAL_KEY = await getEphemeralKey();
  
        // 2) Create PeerConnection
        const peerConnection = new RTCPeerConnection();
        peerConnectionRef.current = peerConnection;
  
        // 3) Audio element for remote audio
        const audioEl = document.createElement('audio');
        audioEl.autoplay = true;
        audioRef.current = audioEl;
  
        peerConnection.ontrack = (e) => {
          audioEl.srcObject = e.streams[0];
        };
  
        // 4) Get local audio track
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = mediaStream;
        peerConnection.addTrack(mediaStream.getTracks()[0]);
  
        // 5) Create DataChannel
        const dataChannel = peerConnection.createDataChannel('oai-events');
        dataChannelRef.current = dataChannel;
  
        dataChannel.addEventListener('message', (e) => {
          const serverEvent = JSON.parse(e.data);
          if (serverEvent.type === 'session.created') {
            // Once the server session is created, instruct it with the prompt
            const event = {
              type: 'session.update',
              session: {
                instructions: offical_prompt,
                input_audio_transcription: { model: 'whisper-1' },
                turn_detection: {
                  type: 'server_vad',
                  silence_duration_ms: 1200,
                },
              },
            };
            dataChannel.send(JSON.stringify(event));
  
            // Start conversation from the server side
            const initResponseEvent = {
              type: 'response.create',
            };
            dataChannel.send(JSON.stringify(initResponseEvent));
          } 
          else if (
            serverEvent.type === 'response.done' &&
            serverEvent?.response?.output?.[0]?.content?.[0]?.transcript
          ) {
            const transcript = serverEvent.response.output[0].content[0].transcript;
            dispatch(
              interviewConversationActions.addMessage({
                role: 'interviewer',
                content: transcript,
              })
            );
          } 
          else if (
            serverEvent.type === 'conversation.item.input_audio_transcription.completed' &&
            serverEvent.transcript
          ) {
            dispatch(
              interviewConversationActions.addMessage({
                role: 'interviewee',
                content: serverEvent.transcript,
              })
            );
          }
        });
  
        // 6) Create offer, set local description
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
  
        // 7) Send offer to OpenAI Realtime endpoint
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
  
        // 8) Set remote description
        const answer: RTCSessionDescriptionInit = {
          type: 'answer',
          sdp: await sdpResponse.text(),
        };
        await peerConnection.setRemoteDescription(answer);
  
        // 9) DataChannel open event
        dataChannel.onopen = () => {
          console.log('Data channel is open');
        };
  
        setIsProcessing(false);
        setInterviewActive(true);
  
      } catch (error) {
        console.error('Error initializing real-time connection:', error);
        alert('An error occurred while starting the interview.');
        setIsProcessing(false);
      }
    };
  
    /**
     * Start/Stop interview logic
     */
    const toggleInterview = async () => {
      if (interviewActive) {
        // STOP Interview
        peerConnectionRef.current?.close();
        peerConnectionRef.current = null;
        dataChannelRef.current = null;
  
        // Stop mic
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
            mediaStreamRef.current = null;
        }
  
        setInterviewActive(false);
        if (onStopInterview) {
          onStopInterview();
        }
      } else {
        // START Interview
        await init();
      }
    };
  
    return (
      <div className={styles.container}>
        <Card className={styles.card}>
          {/* Title */}
          <h2 className={styles.header} style={{ textAlign: 'left' }}>
            Action Panel
          </h2>
  
          {/* CardPreview to match layout from Component 1 */}
          <CardPreview>
            <div className={styles.grid}>
              {/* Field for College */}
              <Field label="College" className={styles.field}>
                <Input
                  className={styles.input}
                  ref={collegeInputRef}
                  value={collegeInput}
                  onChange={(e) => setCollegeInput(e.target.value)}
                  onBlur={handleCollegeBlur}
                  onKeyDown={handleCollegeKeyPress}
                />
              </Field>
  
              {/* Field for Major */}
              <Field label="Major" className={styles.field}>
                <DropdownCustom
                  options={Major}
                  onOptionSelect={(e, option) =>
                    handleMajorChange(option.optionValue as Major)
                  }
                  value={storeMajor}
                  placeHolder="Select a major"
                />
              </Field>
  
            {/* Field for Start/Stop Interview */}
              <Field className={styles.fieldButton}>
                <Button
                className={mergeClasses(
                    styles.buttonSmall,
                    interviewActive ? styles.buttonRed : styles.buttonGreen
                  )}
                    onClick={toggleInterview}
                >
                    {interviewActive ? 'Stop Interview' : 'Start Interview'}
                </Button>
              </Field>

            {/* Field for Interview Review */}
              <Field className={styles.fieldButton}>
                <Button className={styles.buttonSmall} onClick={onInterviewReview}>
                    Review
                </Button>
              </Field>
            </div>
          </CardPreview>
        </Card>
  
        {/* Processing overlay if isProcessing */}
        {isProcessing && (
          <div className={styles.processingModal}>
            <div className={styles.processingDialog}>
              <h2>Processing...</h2>
              <p>Please wait while we connect to the real-time API.</p>
            </div>
          </div>
        )}
      </div>
    );
  };
