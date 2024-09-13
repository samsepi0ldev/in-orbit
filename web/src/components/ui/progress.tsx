import * as ProgressPrimitive from '@radix-ui/react-progress'
import { twMerge } from 'tailwind-merge'

export function Progress({ className, ...props }: ProgressPrimitive.ProgressProps) {
  return (
    <ProgressPrimitive.Progress
      {...props}
      className={twMerge(
        'w-full relative h-2 rounded-full bg-zinc-900 overflow-hidden',
        className
      )}
    />
  )
}

export function ProgressIndicator({ className, ...props }: ProgressPrimitive.ProgressIndicatorProps) {
  return (
    <ProgressPrimitive.ProgressIndicator
      {...props}
      className={twMerge(
        'w-full h-full absolute top-0 -left-full rounded-full bg-gradient-to-r from-pink-400 to-violet-500 transition-transform',
        className
      )}
    />
  )
}
