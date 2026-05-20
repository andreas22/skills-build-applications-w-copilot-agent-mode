import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import App from './App';

console.log('REACT_APP_CODESPACE_NAME=', process.env.REACT_APP_CODESPACE_NAME);
const baseApi = process.env.REACT_APP_CODESPACE_NAME
	? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`
	: undefined;
console.log('Base API (derived):', baseApi);

const root = createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
