import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.ComponentProps<'input'> { }

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    {...props}
    className={twMerge(
      'w-full h-12 px-4 text-sm rounded-lg border border-zinc-900 placeholder-zinc-400 text-zinc-50 bg-black hover:border-zinc-800 focus-visible:border-pink-500 ring-4 ring-pink-500/0 focus-visible:ring-pink-500/10 outline-none transition-colors',
      className
    )}
  />
))

Input.displayName = 'Input'
