import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Admin from './admin.tsx'
import '../dashboard/index.css'
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Admin />
    </QueryClientProvider>
  </StrictMode>,
)
