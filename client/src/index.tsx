import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { AuthProvider } from './Utils/auth.js';
import { DiaryProvider } from './Utils/diary.js';
import { SingleEntryProvider } from './Utils/singleEntry.js';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <DiaryProvider>
          <SingleEntryProvider>

            <App />
          </SingleEntryProvider>
        </DiaryProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};