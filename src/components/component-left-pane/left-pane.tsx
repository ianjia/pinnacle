
import { TabList } from '../component-nav-tab';
import { LeftContentPane } from '../component-left-pane-content';
import './left-pane.css';

export const LeftPane:  React.FC = () => {
  return (
    <div className="left-pane">
      <div className="tab-list">
        <TabList/>
      </div>
      <div >
         <LeftContentPane/>
      </div>
    </div>
  );
}

