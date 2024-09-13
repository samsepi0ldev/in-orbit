import React from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof button> { }

const button = tv({
  base: 'transition-colors flex items-center justify-center gap-2 outline-none disabled:opacity-40',
  variants: {
    variant: {
      primary: 'rounded-lg bg-violet-500 text-violet-50 hover:bg-violet-600 font-medium focus-visible:ring-2 ring-offset-2 ring-offset-zinc-950 focus-visible:ring-violet-500',
      secondary: 'rounded-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800 font-medium focus-visible:ring-2 ring-offset-2 ring-offset-zinc-950 focus-visible:ring-zinc-900',
      outline: 'rounded-full border border-dashed border-zinc-800 text-zinc-300 hover:border-zinc-700 focus-visible:border-pink-500 ring-4 ring-zinc-950/0 focus-visible:ring-pink-500/10'
    },
    size: {
      default: 'px-4 py-2.5 text-sm',
      sm: 'px-3 py-2 text-xs'
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button
    ref={ref}
    className={button({ className, variant, size })}
    {...props}
  />
))
