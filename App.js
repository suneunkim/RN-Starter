import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WeatherApp from './src/components/WeatherApp'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  )
}
