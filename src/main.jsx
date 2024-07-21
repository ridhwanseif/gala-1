import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProviderWrapper } from './context/QueryClientProvider';
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProviderWrapper>
  </React.StrictMode>,
)
