import React, { useState } from 'react';
import { Canvas } from '../component-canvas';
import { LeftPane } from '../component-left-pane';
import axios from 'axios';
import './home-page.css';

export const HomePage: React.FC = () => {
    const [data, setData] = useState<any>(null); // State to hold the fetched data
    const [error, setError] = useState<string | null>(null); // State to handle errors

    // Function to send data and fetch the response from the backend
    const sendData = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/data', {
                key: 'value',
            });
            console.log('Data sent successfully:', response.data);
            setData(response.data); // Set the received data in state
            setError(null); // Clear any previous error if the request is successful
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

                {/* Display fetched data or a message if no data */}
                {error ? (
                    <p>{error}</p>
                ) : data ? (
                    <div>
                        <h3>Data from server:</h3>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                ) : (
                    <p>No data received yet. Click the button to send data.</p>
                )}

                <button onClick={sendData}>Send Data</button>
            </div>
        </div>
    );
};

export default HomePage;
