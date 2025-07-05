
import { LeftPaneTabList } from '../component-nav-tab';
import { LeftContentPane } from '../component-left-pane-content';
import { useLeftPaneStyles } from './hooks/use-left-pane-styles';

export const LeftPane: React.FC = () => {
  const styles = useLeftPaneStyles();

  return (
    <div className={styles.root}>
      <aside className={styles.railWrapper}>
        <LeftPaneTabList />
      </aside>

      <div className={styles.content}>
        <LeftContentPane />
      </div>
    </div>
  );
};