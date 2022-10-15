import "./style.css"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { getLibrary } from './Lib/web3';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Web3ReactProvider getLibrary={getLibrary}>
          <App />
    </Web3ReactProvider>
  </>
);

