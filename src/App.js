import './App.css';
import { useRef } from 'react';
import { toBlob } from 'html-to-image';

const n = navigator;
const d = document;
const ua = n.userAgent;

export function isIOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(n.platform) ||
    // iPad on iOS 13 detection
    (ua.includes('Mac') && 'ontouchend' in d)
  );
}

/**
 * sharing a file - it needs the node to convert to image
 *
 * @param {ShareFileData} { node, title, text, url }
 * @return {Promise<void>}
 */
export function shareFile({ node, title }) {
  if (node) {
    return toBlob(node, { pixelRatio: 1 }).then(function (blob) {
      const file = new File([blob], 'image.png', { type: blob.type });
      /* NOTE: in ios devices the url is mandatory and if we don't send it the app will throw error
				also if I send empty string the share api will send the url of page
			 */
      const shareData = {
        ...(!isIOS()
          ? {
              title,
            }
          : {}),
        files: [file],
      };
      if (navigator?.share) {
        navigator?.share?.(shareData);
      }
    });
  }
}

function App() {
  const testRef = useRef();

  const handleDownloadImage = async () => {
    const node = testRef.current;

    shareFile({
      node,
      title: 'test',
    })
      .then(() => {
        // the card has been sent
        console.log('ok');
      })
      .finally(() => {
        console.log('error');
      });
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
