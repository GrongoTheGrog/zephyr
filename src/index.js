import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DefinitionsProvider } from './siteDefinitions';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DefinitionsProvider>
    <Router>
      <App />
    </Router>
  </DefinitionsProvider>
);

