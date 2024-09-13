import { CheckCircle2, Plus } from 'lucide-react'
import dayjs from 'dayjs'

import { InOrbitIcon } from './in-orbit-icon'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { CreateGoal } from './create-goal'
import { Progress, ProgressIndicator } from './ui/progress'
import type { Summary } from '../http/get-summary'
import { PendingGoals } from './pending-goals'

type WeeklySummaryProps = Summary

export function WeeklySummary({ summary }: WeeklySummaryProps) {
  const fromDate = dayjs().startOf('week').format('D[ de ]MMM')
  const toDate = dayjs().endOf('week').format('D[ de ]MMM')

  const completedPercentage = Math.round(summary.completed * 100 / summary.total)

  return (
    <main className='my-10 mx-auto w-full max-w-[30rem] flex flex-col gap-6'>
      <div className='flex items-center gap-3 w-full'>
        <InOrbitIcon />
        <span className='font-semibold text-lg'>{fromDate} a {toDate}</span>

        <DialogTrigger asChild>
          <Button
            size='sm'
            className='ml-auto'
          >
            <Plus className='size-4' />
            Cadastrar meta
          </Button>
        </DialogTrigger>
        <CreateGoal />
      </div>

      <div className='w-full text-zinc-400 flex flex-col gap-3'>

        <Progress value={summary.completed} max={summary.total}>
          <ProgressIndicator style={{ transform: `translateX(${completedPercentage}%)` }} />
        </Progress>

        <div className='flex items-center justify-between text-xs'>
          <span>
            Você completou <span className='text-zinc-100'>{summary.completed}</span> de <span className='text-zinc-100'>{summary.total}</span> metas nessa semana.
          </span>
          <span>
            {completedPercentage}%
          </span>
        </div>
      </div>

      <hr className='w-full h-px border-zinc-900' />

      <PendingGoals />

      <div className='space-y-6'>
        <h2 className='font-medium text-xl'>Sua semana</h2>

        {summary.goalsPerDay ? (
          Object.entries(summary.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format('dddd')
            const parsedDate = dayjs(date).format('D[ de ]MMM')

            return (
              <div key={date} className='space-y-4'>
                <h3 className='font-medium'>
                  <span className='capitalize'>{weekDay} </span>
                  <span className='text-xs text-zinc-400'>({parsedDate})</span>
                </h3>

                <ul className='space-y-3'>
                  {goals.map(goal => {
                    const parsedTime = dayjs(goal.createdAt).format('HH:mm[h]')
                    return (
                      <li key={goal.id} className='flex items-center gap-2'>
                        <CheckCircle2 className='size-4 text-pink-400' />
                        <span className='text-sm text-zinc-400'>
                          Você completou "
                          <span className='font-medium text-zinc-100'>{goal.title}</span>" às{' '}
                          <span className='text-zinc-100'>{parsedTime}</span>
                        </span>
                      </li>
                    )
                  })
                  }
                </ul>
              </div>
            )
          })
        ) : (
          <p className='text-sm text-zinc-400'>Você ainda não completou nenhuma meta essa semana.</p>
        )}
      </div>
    </main>
  )
}
