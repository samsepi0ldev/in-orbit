import { Loader2, Plus } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from './ui/button'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'


export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals
  })

  const { data: result, mutateAsync, isPending, variables } = useMutation({
    mutationFn: (goalId: string) => createGoalCompletion(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
      queryClient.invalidateQueries({ queryKey: ['summary'] })
    }
  })
  

  if (isLoading || !data) {
    return (
      <div className='max-w-sm animate-pulse space-x-2'>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className='px-3 py-2 rounded-full w-24 h-8 bg-zinc-700 inline-block' />
        ))}
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {data.pendingGoals.map(goal => (
        <Button
          key={goal.id}
          variant='outline'
          size='sm'
          disabled={goal.completionCount === goal.desiredWeeklyFrequency || isPending && variables === goal.id}
          onClick={() => mutateAsync(goal.id)}
        >
          { isPending && variables === goal.id ? (
            <Loader2 className='size-4 animate-spin' />
          ) : (
            <Plus className='size-4' />
          )}
          {goal.title}
        </Button>
      ))}
    </div>
  )
}