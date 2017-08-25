import React from 'react';
import { render } from 'react-dom';
import { SnowTest } from '../../src/index';
import '../../style/react-tabs.css';

const App = () => {
  
  return (
    <div>
      <SnowTest />
    </div>
  );
};

render(<App />, document.getElementById('example'));
