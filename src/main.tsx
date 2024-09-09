import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

import AppRoute from '@/components/partials/app/app-route'

import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
