import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from '@ds/components/Toast'
import { VersionSwitch } from '@/components/dev/VersionSwitch'
import { Routes } from './routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 24h — datos financieros no cambian frecuentemente
      retry: 2,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
          <Routes />
          <VersionSwitch />
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
