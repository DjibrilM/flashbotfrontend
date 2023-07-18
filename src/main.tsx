import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";


import {
  BrowserRouter
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import App from './App';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>,
)
