import React, { useState, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { interviewConversationActions } from '../../store';
import { MIDDLE_SERVER_URL } from '../../common';
import './interaction-interview.css';

export const InteractionInterview: React.FC = () => {
  const [interviewActive, setInterviewActive] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synth = window.speechSynthesis;
  const [sessionId, setSessionId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const dispatch = useDispatch();

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
        const response = await axios.post(`${MIDDLE_SERVER_URL}/api/interview-answer`, {
          message: transcript,
          session_id: sessionId,
        });
  
        const aiResponse = response.data.question;
        if (aiResponse) {
          dispatch(
            interviewConversationActions.addMessage({
              role: 'interviewer',
              content: aiResponse,
            })
          );
  
          const utterance = new SpeechSynthesisUtterance(aiResponse);
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
      setSessionId('');
      // Optionally, reset the conversation
      // dispatch(interviewConversationActions.resetConversation());
      recognitionRef.current?.stop();
    } else {
      setIsProcessing(true);
      const newSessionId = uuidv4();
      setSessionId(newSessionId);

      try {
        const response = await axios.post(`${MIDDLE_SERVER_URL}/api/interview-start`, {
          session_id: newSessionId,
        });

        const initialQuestion = response.data.question;
        dispatch(
          interviewConversationActions.addMessage({
            role: 'interviewer',
            content: initialQuestion,
          })
        );

        const utterance = new SpeechSynthesisUtterance(initialQuestion);
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
    </div>
  );
};
