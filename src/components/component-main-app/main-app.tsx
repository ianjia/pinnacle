import React from 'react';
import { Canvas } from '../component-canvas';
import { LeftPane } from '../component-left-pane';
import { mergeClasses } from '@fluentui/react-components';
import { useMainLayoutStyles } from './hooks/use-main-layout-styles';
import { IThemeToggleProps } from '../component-util';

export const MainApp: React.FC<IThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  const styles = useMainLayoutStyles();

  return (
    <div className={styles.container}>
      <div className={mergeClasses(styles.column, styles.leftColumn)}>
        <LeftPane toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      </div>

      <div className={mergeClasses(styles.column, styles.rightColumn)}>
        <Canvas />
      </div>
    </div>
  );
};

export default MainApp;
