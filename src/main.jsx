import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux';
import store from './app/store.js'
import { ThemeProvider } from './context/ThemeContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
  <ThemeProvider>
  <Toaster/>
    <App />
  </ThemeProvider>
  </Provider>
  </BrowserRouter>
)
