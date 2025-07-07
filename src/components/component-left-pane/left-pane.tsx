import React from 'react';
import { LeftPaneTabList } from '../component-nav-tab';
import { LeftContentPane } from '../component-left-pane-content';
import { useLeftPaneStyles } from './hooks/use-left-pane-styles';

interface Props {
  toggleTheme: () => void;
}

export const LeftPane: React.FC<Props> = ({ toggleTheme }) => {
  const styles = useLeftPaneStyles();

  return (
    <div className={styles.root}>
      <aside className={styles.railWrapper}>
        {/* pass it down to the tab list */}
        <LeftPaneTabList toggleTheme={toggleTheme} />
      </aside>

      <div className={styles.content}>
        <LeftContentPane />
      </div>
    </div>
  );
};
