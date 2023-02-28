import './App.css';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

function App() {
  const testRef = useRef();

  const handleDownloadImage = async () => {
    const element = testRef.current;
    const canvas = await html2canvas(element, {
      allowTaint: true,
      useCORS: true,
      logging: true,
      foreignObjectRendering: true,
    });
    console.log(document.querySelector('.App-logo'));

    const data = canvas.toDataURL();
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'test';

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
        <img src="/logo.svg" className="App-logo" alt="logo" />
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
