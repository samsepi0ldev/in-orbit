import { Plus } from 'lucide-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { Button } from './ui/button'
import { getPendingGoals } from '../http/get-pending-goals'
import { createGoalCompletion } from '../http/create-goal-completion'


export function PendingGoals() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals
  })

  async function handleCreateGoalCompletion(goalId: string) {
    await createGoalCompletion(goalId)

    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    queryClient.invalidateQueries({ queryKey: ['summary'] })
  }

  if (isLoading || !data) {
    return <span>Carregando</span>
  }


  return (
    <div className='flex flex-wrap gap-2'>
      {data.pendingGoals.map(goal => (
        <Button
          key={goal.id}
          variant='outline'
          size='sm'
          disabled={goal.completionCount === goal.desiredWeeklyFrequency}
          onClick={() => handleCreateGoalCompletion(goal.id)}
        >
          <Plus className='size-4' />
          {goal.title}
        </Button>
      ))}
    </div>
  )
}