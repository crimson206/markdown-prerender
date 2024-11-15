import React from 'react';
import { MyPackage } from './MyPackage';
import { renderToString } from 'react-dom/server';

function App() {
  return (
    <div className="App">
      <MyPackage />
    </div>
  );
}

export function render() {
  return renderToString(<App />);
}

export default App;
