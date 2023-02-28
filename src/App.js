import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';
import { exportComponentAsPNG } from 'react-component-export-image';

function App() {
  const testRef = useRef();
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

      <button
        style={{ margin: '30px' }}
        onClick={() => {
          console.log('test');
          exportComponentAsPNG(testRef, {
            html2CanvasOptions: {
              // onclone: (clonedDoc) => {
              //   clonedDoc.getElementById('legend').style.visibility = 'visible';
              // },
            },
          });
        }}
      >
        Export As PNG
      </button>
    </div>
  );
}

export default App;
