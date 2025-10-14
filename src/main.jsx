import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import store from './app/store.js'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
  <Toaster/>
    <App />
  </Provider>
  </BrowserRouter>
)
