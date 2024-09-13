import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DialogContent, DialogTitle, DialogDescription, DialogClose } from './ui/dialog'
import { RadioGroup, RadioGroupItem, RadioGroupIndicator } from './ui/radio'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { createGoal } from '../http/create-goal'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const createGoalSchema = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja praticar.'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7)
})

type CreateGoal = z.infer<typeof createGoalSchema>

export function CreateGoal() {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<CreateGoal>({
    resolver: zodResolver(createGoalSchema)
  })

  async function handleCreateGoal(data: CreateGoal) {
    try {
      setIsLoading(true)
      
      await createGoal(data)
      toast.success('Meta criada com sucesso!')

      reset()

      queryClient.invalidateQueries({ queryKey: ['summary'] })
      queryClient.invalidateQueries({ queryKey: ['pending-goals'] })
    } catch (error) {
      toast.error('Houve um erro ao tentar criar meta.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DialogContent>
      <form
        onSubmit={handleSubmit(handleCreateGoal)}
        className='h-full flex flex-col gap-6'
      >
        <div className='space-y-3'>
          <DialogTitle>
            Cadastrar meta
          </DialogTitle>
          <DialogDescription>
            Adicione atividades que <u>te fazem bem</u> e que você quer continuar praticando toda semana.
          </DialogDescription>
        </div>

        <div className='space-y-2 w-full'>
          <label
            htmlFor='title'
            className='font-medium text-sm text-zinc-100'>
            Qual a atividade?
          </label>
          <Input
            id='title'
            {...register('title')}
            placeholder='Praticar exercícios, meditar, etc...'
          />
          {errors.title && (
            <p className='text-sm text-red-400'>{errors.title.message}</p>
          )}
        </div>

        <div className='flex flex-col gap-2'>
          <label
            htmlFor='title'
            className='font-medium text-sm text-zinc-100'>
            Quantas vezes na semana?
          </label>

          <Controller
            name='desiredWeeklyFrequency'
            control={control}
            defaultValue={5}
            render={({ field }) => (
              <RadioGroup
                value={String(field.value)}
                onValueChange={field.onChange}
              >
                {Array.from({ length: 7 }, (_, i) => {
                  const frequency = String(i + 1)
                  return (
                    <RadioGroupItem key={i.toString()} value={frequency}>
                      <RadioGroupIndicator />
                      <span>{frequency}x na semana</span>
                      🥱
                    </RadioGroupItem>
                  )
                }
                )}
              </RadioGroup>
            )}
          />
        </div>
        <div className='w-full flex items-center gap-3 mt-auto'>
          <DialogClose asChild>
            <Button
              className='w-full'
              type='button'
              variant='secondary'
            >
              Fechar
            </Button>
          </DialogClose>
          <Button className='w-full' type='submit' disabled={isLoading}>
            {isLoading && <Loader2 className='size-4 animate-spin' />}
            Salvar
          </Button>
        </div>
      </form>
    </DialogContent>
  )
}