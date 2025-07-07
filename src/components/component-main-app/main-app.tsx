import React from 'react';
import { Canvas } from '../component-canvas';
import { LeftPane } from '../component-left-pane';
import { mergeClasses } from '@fluentui/react-components';
import { useMainLayoutStyles } from './hooks/use-main-layout-styles';

/* NEW: accept the prop */
interface Props {
  toggleTheme: () => void;
}

export const MainApp: React.FC<Props> = ({ toggleTheme }) => {
  const styles = useMainLayoutStyles();

  return (
    <div className={styles.container}>
      <div className={mergeClasses(styles.column, styles.leftColumn)}>
        {/* forward it to LeftPane */}
        <LeftPane toggleTheme={toggleTheme} />
      </div>

      <div className={mergeClasses(styles.column, styles.rightColumn)}>
        <Canvas />
      </div>
    </div>
  );
};

export default MainApp;
