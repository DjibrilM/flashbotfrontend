import ReactDOM from 'react-dom/client'
import "./index.css";
import { SpeechProvider } from '@speechly/react-client';

import {
  BrowserRouter
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import App from './App';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <BrowserRouter>
      <SpeechProvider
        appId={'17323fbd-a88b-4fdc-8e56-f7f7a60198fc'}
        debug
      >
        <App />
      </SpeechProvider>
    </BrowserRouter>
  </RecoilRoot>,
)
