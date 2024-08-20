import React from 'react';
import './App.css';

import HomePage from './components/component-home-page/HomePage';

const App: React.FC = () => {
  return (
    <div className="App">
      {<HomePage />}
    </div>
  );
};

export default App;
