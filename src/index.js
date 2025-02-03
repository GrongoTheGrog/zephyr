import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DefinitionsProvider } from './siteDefinitions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DefinitionsProvider>
    <App />
  </DefinitionsProvider>
);

