import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { interviewConversationActions } from '../../store';
import './interaction-interview.css';
import { SERVER_URL } from '../component-service-proxy';
import { SpecializedProgram } from '../component-specalized-program';
import { getCollegeNameKey } from '../component-map';
import { InterviewAnswerRequest, InterviewStartRequest } from '../component-service-proxy/interview/request-types';
import { api } from '../../auth';
import { InterviewAnswerResult, InterviewStartResult } from '../component-service-proxy/interview/result-types';

export const InteractionInterview: React.FC = () => {
  const dispatch = useDispatch();

  // Imported states from the global store
  const college: string = useSelector((state: RootState) => state.conversation.college);
  const major: string = useSelector((state: RootState) => state.conversation.major);

  // Local state for college input
  const [collegeInput, setCollegeInput] = useState('');
  const collegeInputRef = useRef<HTMLInputElement>(null);

  // Existing states for interview functionality
  const [interviewActive, setInterviewActive] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synth = window.speechSynthesis;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

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

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true; // Ensure continuous recognition
  
    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      dispatch(
        interviewConversationActions.addMessage({
          role: 'interviewee',
          content: transcript,
        })
      );
  
      // Send transcript to backend
      try {
        const response = await api.post(`${SERVER_URL}/api/v1/interview/answer`, {
          requestData: {message: transcript} as InterviewAnswerRequest
        });
  
        const aiResponse: InterviewAnswerResult = response.data;
        if (aiResponse) {
          dispatch(
            interviewConversationActions.addMessage({
              role: 'interviewer',
              content: aiResponse.message,
            })
          );
  
          const utterance = new SpeechSynthesisUtterance(aiResponse.message);
          utterance.onend = () => {
            startSpeechRecognition(); // Restart recognition after interviewer finishes speaking
          };
          synth.speak(utterance);
        } else {
          setInterviewActive(false);
          alert('The interview has concluded. Thank you!');
        }
      } catch (error) {
        console.error('Error communicating with the server:', error);
        alert('An error occurred. Please try again.');
      }
    };
  
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'aborted') {
        console.error('Speech recognition aborted, restarting...');
        // Restart speech recognition after it aborts
        startSpeechRecognition();
      } else {
        console.error('Speech recognition error detected:', event.error);
        alert('An error occurred during speech recognition. Please try again.');
      }
    };
  
    recognition.onend = () => {
      // Handle when recognition ends naturally
    };
  
    recognitionRef.current = recognition;
    recognition.start();
  };

  const toggleInterview = async () => {
    if (interviewActive) {
      setInterviewActive(false);
      recognitionRef.current?.stop();
    } else {
      setIsProcessing(true);

      try {
        const response = await api.post(`${SERVER_URL}/api/v1/interview/start`, {
          requestData: {college: college, major: major} as InterviewStartRequest
        });

        const aiResponse: InterviewStartResult = response.data;
        dispatch(
          interviewConversationActions.addMessage({
            role: 'interviewer',
            content: aiResponse.message,
          })
        );

        const utterance = new SpeechSynthesisUtterance(aiResponse.message);
        utterance.onend = () => {
          // Start listening after the interviewer finishes speaking
          startSpeechRecognition();
        };
        synth.speak(utterance);

        setInterviewActive(true);
      } catch (error) {
        console.error('Error starting the interview:', error);
        alert('An error occurred while starting the interview.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <div className="interaction-container">
      <h2>AI-Powered Mock Interview</h2>
      <div className="interaction-header">
        <button
          onClick={toggleInterview}
          className={`interview-button ${
            interviewActive ? 'stop-interview' : 'start-interview'
          }`}
        >
          {interviewActive ? 'Stop Interview' : 'Start Interview'}
        </button>
      </div>

      {isProcessing && (
        <div className="processing-modal">
          <div className="processing-dialog">
            <h2>Processing...</h2>
            <p>Please wait while we process your response.</p>
          </div>
        </div>
      )}

      {/* New Inputs for College and Major (mirroring File 1's logic) */}
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
