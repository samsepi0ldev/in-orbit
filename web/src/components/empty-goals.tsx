import { Plus } from 'lucide-react'

import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import logoInOrbit from '../assets/in-orbit-logo.svg'
import illustrationLetsStart from '../assets/illustration-lets-start.svg'
import { CreateGoal } from './create-goal'

export function EmptyGoals() {
  return (
    <main className='w-full h-screen flex flex-col items-center justify-center gap-8'>
      <img src={logoInOrbit} alt='in.orbit' />
      <img src={illustrationLetsStart} alt='Ilustração de uma mulher controlando um lançamento de um foguete através de um controle remoto' />

      <p className='text-zinc-300 max-w-xs leading-relaxed text-center'>
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>
      <DialogTrigger asChild>
        <Button>
          <Plus className='size-4' />
          Cadastrar meta
        </Button>
      </DialogTrigger>
      <CreateGoal />
    </main>
  )
}