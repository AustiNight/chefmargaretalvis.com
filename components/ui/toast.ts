"use client"

import * as React from "react"

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToast as useToastOriginal,
} from "@/registry/new-york/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterProps = {
  children: React.ReactNode
}

function Toaster({ children }: ToasterProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ToastProvider limit={TOAST_LIMIT} removeDelay={TOAST_REMOVE_DELAY}>
      {children}
      <ToastViewport />
    </ToastProvider>
  )
}

type ToastProps = React.ComponentProps<typeof Toast>

type ToastActionProps = React.ComponentProps<typeof ToastAction>

const toast = (...args: Parameters<typeof useToastOriginal>) => {
  const { toast } = useToastOriginal()
  return toast(...args)
}

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  useToastOriginal as useToast,
  toast,
}
