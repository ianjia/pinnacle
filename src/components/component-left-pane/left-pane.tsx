import React from 'react';
import { LeftPaneTabList } from '../component-nav-tab';
import { LeftContentPane } from '../component-left-pane-content';
import { useLeftPaneStyles } from './hooks/use-left-pane-styles';
import { IThemeToggleProps } from '../component-util';


export const LeftPane: React.FC<IThemeToggleProps> = ({ toggleTheme, isDarkMode }) => {
  const styles = useLeftPaneStyles();

  return (
    <div className={styles.root}>
      <aside className={styles.railWrapper}>
        <LeftPaneTabList
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
      </aside>

      <div className={styles.content}>
        <LeftContentPane />
      </div>
    </div>
  );
};
