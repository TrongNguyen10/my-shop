import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import '../dashboard/index.css'
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import AdminPage from './routes/adminPage.tsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <AdminPage />
            </QueryClientProvider>
        </StrictMode>
    </BrowserRouter>
)
