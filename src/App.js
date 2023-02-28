import logo from './logo.svg';
import './App.css';
import { useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';
import html2canvas from 'html2canvas';

function App() {
  const testRef = useRef();

  const handleDownloadImage = async () => {
    const element = testRef.current;
    const canvas = await html2canvas(element, {
      useCORS: true,
      logging: true,
    });
    document.body.appendChild(canvas);

    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.png';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  return (
    <div className="App">
      <header ref={testRef} className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
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

      <button style={{ margin: '30px' }} onClick={handleDownloadImage}>
        Export As PNG
      </button>
    </div>
  );
}

export default App;
