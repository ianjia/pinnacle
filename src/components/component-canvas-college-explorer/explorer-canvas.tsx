import React from 'react';

import { useCanvasBackgroundStyles } from '../component-util';

export const ExplorerCanvas: React.FC = () => {

    const styles = useCanvasBackgroundStyles();

    return (
        <div className = {styles.container}>
            Explorer
        </div>
    );
};

