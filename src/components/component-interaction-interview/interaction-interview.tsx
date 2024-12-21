import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { interviewConversationActions } from '../../store';
import './interaction-interview.css';
import { SpecializedProgram } from '../component-specalized-program';
import { getCollegeNameKey } from '../component-map';
import { api } from '../../auth';
import { SERVER_URL } from '../component-service-proxy';


const prompt: string = `Your are playing the role of a college admission interviewer representing harvard university to interview 
                        a high school senior student. Please perform this interviewer role, ask questions based on the the information
                        provided here and based on the answer from the student, please also answer questions that the student asks.
                        Your questions should be able to help find out whether this student is a good fit for the college and whether 
                        the candidate should be admitted. Please continue the interview till you think you are confident to give a 
                         recommendation on whether we should admit, reject or waitlist this student. After that, please answer with 
                         the recommendation and the reasons of the recommendation, then stop asking or answering questions. Of course, 
                         if there is strong signal that the student does not fit, you could end the interview early, and give recommendation.`

export const InteractionInterview: React.FC = () => {
  const dispatch = useDispatch();

  const college: string = useSelector((state: RootState) => state.conversation.college);
  const major: string = useSelector((state: RootState) => state.conversation.major);

  const [collegeInput, setCollegeInput] = useState('');
  const collegeInputRef = useRef<HTMLInputElement>(null);

  const [interviewActive, setInterviewActive] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // State and refs for new Real-time API from File 2
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const msRef = useRef<MediaStream | null>(null);

  const handleCollegeBlur = () => {
    const matchedCollegeName = getCollegeNameKey(collegeInput); // Fuzzy search/match
    if (matchedCollegeName) {
      setCollegeInput(matchedCollegeName);
      dispatch(interviewConversationActions.setCollege(matchedCollegeName));
    } else {
      alert("The college name you entered is not valid. Please re-enter.");
    }
  };

  const handleCollegeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      collegeInputRef.current?.blur();
    }
  };

  // The new init function that sets up the WebRTC connection
  async function init() {
    try {
      setIsProcessing(true);

      // Get ephemeral key from server
      const tokenResponse = await api.get(`${SERVER_URL}/api/v1/interview/session`);
      const EPHEMERAL_KEY = tokenResponse.data.client_secret.value;

      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Set up audio element for remote audio
      const audioEl = document.createElement("audio");
      audioEl.autoplay = true;
      audioRef.current = audioEl;

      pc.ontrack = e => {
        audioEl.srcObject = e.streams[0];
      };

      // Add local audio track from microphone
      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      msRef.current = ms;
      pc.addTrack(ms.getTracks()[0]);

      // Set up data channel for sending/receiving events
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.addEventListener("message", (e) => {
        // Real-time server events appear here
        const serverEvent = JSON.parse(e.data);
        if (serverEvent.type === "session.created") {
          const event = {
            type: "session.update",
            session: {
              instructions: prompt,
              input_audio_transcription: { "model" : "whisper-1"},
              turn_detection: {
                type: "server_vad",
                silence_duration_ms: 1200
              }
            },
          };
          
          // WebRTC data channel and WebSocket both have .send()
          dc.send(JSON.stringify(event));

          // Below is to let the interviewer starts the conversation
          const initResponseEvent = {
            type: "response.create",
          }

          dc.send(JSON.stringify(initResponseEvent));
        }
        else if (serverEvent.type === "response.done" && serverEvent?.response?.output?.[0]?.content?.[0]?.transcript) {
          const transcript = serverEvent.response.output[0].content[0].transcript;
          dispatch(
            interviewConversationActions.addMessage({
              role: 'interviewer',
              content: transcript,
            })
          );
          // console.log("Output Transcript:", transcript);
        }
        else if (serverEvent.type === "conversation.item.input_audio_transcription.completed" && serverEvent.transcript) {
          dispatch(
            interviewConversationActions.addMessage({
              role: 'interviewee',
              content: serverEvent.transcript,
            })
          );
          // console.log("Input Transcript:", serverEvent.transcript);
        }
      });

      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const baseUrl = "https://api.openai.com/v1/realtime";
      // const model = "gpt-4o-realtime-preview-2024-12-17";
      const model = "gpt-4o-mini-preview-preview-2024-12-17";

      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        },
      });

      const answer: RTCSessionDescriptionInit = {
        type: "answer",
        sdp: await sdpResponse.text(),
      };
      await pc.setRemoteDescription(answer);

      // Once connected, you may send initial context or prompt via dc
      // For example, send the college and major as initial context:
      dc.onopen = () => {
        console.log("Data channel is open");
      };

      setIsProcessing(false);
      setInterviewActive(true);

    } catch (error) {
      console.error("Error initializing real-time connection:", error);
      alert("An error occurred while starting the interview.");
      setIsProcessing(false);
    }
  }

  const toggleInterview = async () => {
    if (interviewActive) {
      // Stop interview: close PeerConnection and reset states
      pcRef.current?.close();
      pcRef.current = null;
      dcRef.current = null;
  
      // Stop the microphone tracks
      if (msRef.current) {
        msRef.current.getTracks().forEach((track) => track.stop());
        msRef.current = null;
      }
  
      setInterviewActive(false);
    } else {
      await init();
    }
  };  

  return (
    <div className="interaction-container">
      <h2>AI-Powered Mock Interview (Real-Time)</h2>
      <div className="interaction-header">
        <button
          onClick={toggleInterview}
          className={`interview-button ${interviewActive ? 'stop-interview' : 'start-interview'}`}
        >
          {interviewActive ? 'Stop Interview' : 'Start Interview'}
        </button>
      </div>

      {isProcessing && (
        <div className="processing-modal">
          <div className="processing-dialog">
            <h2>Processing...</h2>
            <p>Please wait while we connect to the real-time API.</p>
          </div>
        </div>
      )}

      <div className="interaction-input">
        <label htmlFor="collegeInput">College:</label>
        <input
          id="collegeInput"
          type="text"
          value={college}
          ref={collegeInputRef}
          onChange={(e) => setCollegeInput(e.target.value)}
          onBlur={handleCollegeBlur}
          onKeyDown={handleCollegeKeyPress}
        />
      </div>

      <div className="interaction-input">
        <label>Major:</label>
        <SpecializedProgram
          value={major}
          onPreferenceChange={(newMajor) => dispatch(interviewConversationActions.setMajor(newMajor))}
        />
      </div>
    </div>
  );
};
