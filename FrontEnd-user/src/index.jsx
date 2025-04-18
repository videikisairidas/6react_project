import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/main.css'; // Ensure you have global styles if needed
import Body from './Body';

const container = document.getElementById('root');
const root = createRoot(container);  // Create a root

root.render(
    <React.StrictMode>
        <Body />
    </React.StrictMode>
);

