import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProviderWrapper } from './context/QueryClientProvider';
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProviderWrapper>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProviderWrapper>
  </React.StrictMode>,
)
