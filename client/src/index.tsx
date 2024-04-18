import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import { Provider } from "react-redux"
import store from './redux/store';
import Echo from "laravel-echo";
import Pusher from "pusher-js"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

declare global {
  interface Window {
    Echo: Echo;
    Pusher: Pusher
  }
}
if (!window.Pusher) {
  window.Pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY!, {
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER!,
    forceTLS: true
  });

}
if (!window.Echo) {
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: process.env.REACT_APP_PUSHER_APP_KEY,
    cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
  });
}
root.render(

  // Initialize Pusher

  <React.StrictMode>
    <Provider store={store}>

      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
