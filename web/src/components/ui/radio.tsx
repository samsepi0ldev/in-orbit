import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle, CheckCircle2 } from 'lucide-react'

export function RadioGroup(props: RadioGroupPrimitive.RadioGroupProps) {
  return (
    <RadioGroupPrimitive.RadioGroup
      {...props}
      className='flex flex-col gap-2'
    />
  )
}

export function RadioGroupItem(props: RadioGroupPrimitive.RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.RadioGroupItem
      {...props}
      className='group text-sm outline-none px-4 py-2.5 rounded-lg border border-zinc-800 bg-black text-zinc-300 flex items-center justify-between ring-4 ring-pink-500/0 focus-visible:ring-pink-500/10 focus-within:border-pink-500 data-[state=checked]:bg-violet-500/5 data-[state=checked]:border-pink-500 data-[state=checked]:'
    />
  )
}

export function RadioGroupIndicator() {
  return (
    <>
      <Circle className='size-4 text-zinc-600 group-data-[state=checked]:hidden' />
      <CheckCircle2 className='size-4 text-pink-400 hidden group-data-[state=checked]:inline' />
    </>
  )
}