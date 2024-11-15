import React, { useState, useEffect } from 'react';

interface DynamicComponentProps {
  title: string;
  initialCount: number;
  items: string[];
}

export const ExampleDynamicComponent: React.FC<DynamicComponentProps> = ({ title, initialCount, items }) => {
  const [count, setCount] = useState(initialCount);
  const [data, setData] = useState<string | null>(null);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px 0' }}>
      <h1>{title}</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      {data && <p>{data}</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

interface HighlightDisplayComponentProps {
  highlightedHTML: string;
}

export const HighlightDisplayComponent: React.FC<HighlightDisplayComponentProps> = ({ highlightedHTML }) => {
  
  const handleCopy = () => {
    navigator.clipboard.writeText(highlightedHTML).then(() => {
      alert("Copied to clipboard!");
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: highlightedHTML }} style={{ padding: '1rem', backgroundColor: '#1f1f1f', color: '#cccccc', fontFamily: 'Consolas, "Courier New", monospace' }} />
      <button onClick={handleCopy} style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        Copy
      </button>
    </div>
  );
};

export default ExampleDynamicComponent;