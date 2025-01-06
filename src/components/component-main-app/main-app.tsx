import React from 'react';
import { Canvas } from '../component-canvas';
import { LeftPane } from '../component-left-pane';
import './main-app.css';

export const MainApp: React.FC = () => {
    return (
        <div className="container">
            <div className="column">
                <LeftPane />
            </div>
            <div className="column">
                <Canvas />
            </div>
        </div>
    );
};

export default MainApp;
