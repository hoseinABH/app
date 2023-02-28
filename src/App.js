import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

function App() {
  const testRef = useRef();

  function handleSubmit() {
    if (!testRef.current) return;
    htmlToImage.toPng(testRef.current).then(function (dataUrl) {
      download(dataUrl, 'my-node.png');
    });
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p ref={testRef}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <button style={{ margin: '30px' }} onClick={handleSubmit}>
        Export As PNG
      </button>
    </div>
  );
}

export default App;
