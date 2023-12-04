import React from 'react'
import ReactDOM from 'react-dom'
import {    BrowserRouter, createBrowserRouter,
            RouterProvider,
    } from 'react-router-dom';

import App from './App'

//Importing Roboto Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterTwoTone } from '@mui/icons-material';



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>

);



