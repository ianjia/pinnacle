
import React, { useState } from 'react';
import './LeftPane.css';

const tabs = [
  { id: 1, label: 'Tab 1', content: 'Content for Tab 1' },
  { id: 2, label: 'Tab 2', content: 'Content for Tab 2' },
  { id: 3, label: 'Tab 3', content: 'Content for Tab 3' },
];

function LeftPane() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="left-pane">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

export default LeftPane;
