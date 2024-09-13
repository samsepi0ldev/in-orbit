import { useQuery } from '@tanstack/react-query'

import { Dialog } from './components/ui/dialog'
import { WeeklySummary } from './components/weekly-summary'
import { getSummary } from './http/get-summary'
import { EmptyGoals } from './components/empty-goals'
import { Loader2 } from 'lucide-react'

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary
  })

  if (isLoading || !data) {
    return (
      <div className='w-full h-screen grid place-items-center'>
        <Loader2 className='animate-spin' />
      </div>
    )
  }

  return (
    <Dialog>
      {data.summary.total > 0 ? (
        <WeeklySummary
          summary={data?.summary}
        />
      ) : (
        <EmptyGoals />
      )}
    </Dialog>
  )
}