import * as DialogPrimitive from '@radix-ui/react-dialog'
import { twMerge } from 'tailwind-merge'

export function Dialog(props: DialogPrimitive.DialogProps) {
  return (
    <DialogPrimitive.Dialog {...props} />
  )
}

export function DialogPortal(props: DialogPrimitive.DialogPortalProps) {
  return (
    <DialogPrimitive.DialogPortal {...props} />
  )
}

export function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
  return (
    <DialogPrimitive.DialogTrigger {...props} />
  )
}

export function DialogClose(props: DialogPrimitive.DialogCloseProps) {
  return (
    <DialogPrimitive.DialogClose {...props} />
  )
}

export function DialogOverlay(props: DialogPrimitive.DialogOverlayProps) {
  return (
    <DialogPrimitive.DialogOverlay
      {...props}
      className='fixed inset-0 bg-black/40 z-40 backdrop-blur-sm'
    />
  )
}

export function DialogContent(props: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.DialogContent
        {...props}
        className={
          twMerge(
            'fixed top-0 right-0 z-50 w-[25rem] bg-zinc-950 border-l border-l-zinc-900 p-8 h-screen',
            'data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-right-10',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-right-10'
          )
        }
      />
    </DialogPortal>
  )
}

export function DialogTitle(props: DialogPrimitive.DialogTitleProps) {
  return (
    <DialogPrimitive.DialogTitle
      {...props}
      className='text-lg font-semibold'
    />
  )
}

export function DialogDescription(props: DialogPrimitive.DialogDescriptionProps) {
  return (
    <DialogPrimitive.DialogDescription
      {...props}
      className='text-zinc-400 text-sm leading-relaxed'
    />
  )
}
