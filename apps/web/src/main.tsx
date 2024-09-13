import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

dayjs.locale('pt-BR')

import { App } from './app.tsx'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position='bottom-left'
        richColors
      />
    </QueryClientProvider>
  </StrictMode>,
)
