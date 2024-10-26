import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import '../dashboard/index.css'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import Admin from './admin.tsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('admin')!).render(
    <BrowserRouter>
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Admin />
            </QueryClientProvider>
        </StrictMode>
    </BrowserRouter>
)
