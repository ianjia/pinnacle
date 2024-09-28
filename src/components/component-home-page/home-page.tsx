import React, { useState } from 'react';
import { Canvas } from '../component-canvas';
import { LeftPane } from '../component-left-pane';
//import axios from 'axios';
import './home-page.css';
import { startAsyncTask, handleAcademicReviewTask, TaskParameterType } from '../../proxy';
import { LoadingModal } from '../component-loading-modal-dialog';
import { MarkdownMessageDisplay } from '../component-mark-down-display';

export const HomePage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<string|undefined>(undefined); // State to hold the fetched data
    const [error, setError] = useState<string | undefined>(undefined); // State to handle errors

    const taskParams: TaskParameterType = {}

    const sendData = async () => {
        try {
            const response = await startAsyncTask(setIsLoading, handleAcademicReviewTask, taskParams);
            console.log('Data sent successfully:', response.result);
            setData(response.result); // Set the received data in state
            setError(undefined); // Clear any previous error if the request is successful
        } catch (error) {
            setError('Error sending data.');
            console.error('Error sending data:', error);
        }
    };

    return (
        <div className='container'>
            <div className="column">
                <LeftPane />
            </div>
            <div className="column">
                <Canvas />
            </div>
            <div className="column">
                <p>Content for the third column.</p>

                {error === undefined && data === undefined ? 
                    (<p>No data received yet. Click the button to send data.</p>) : 
                    (
                        <MarkdownMessageDisplay
                            errorMessage={error}
                            resultMessage= {data? data : " "}  // " " might not be apporiate message - todo
                        />
                    )
                }

                <button onClick={sendData}>Academic Evaluation</button>
            </div>
            <LoadingModal isVisible={isLoading} message='Evaluating ...' />
        </div>
    );
};

export default HomePage;
