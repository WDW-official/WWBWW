'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

type ToastType = 'success' | 'error'
type Toast = {
  id: number
  type: ToastType
  title: string
  message?: string
}

type ToastContextValue = {
  toast: (input: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const value = useMemo<ToastContextValue>(() => ({
    toast: (input) => {
      const id = Date.now()
      setToasts((current) => [...current, { ...input, id }])
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== id))
      }, 4500)
    },
  }), [])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[90] grid w-[calc(100vw-2rem)] max-w-sm gap-3">
        {toasts.map((item) => {
          const Icon = item.type === 'success' ? CheckCircle2 : AlertCircle
          return (
            <div key={item.id} className="flex gap-3 rounded-lg border border-black/10 bg-white p-4 shadow-luxe">
              <Icon className={item.type === 'success' ? 'text-green-700' : 'text-red-700'} size={20}/>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{item.title}</div>
                {item.message && <p className="mt-1 text-sm leading-5 text-black/55">{item.message}</p>}
              </div>
              <button aria-label="Dismiss notification" onClick={() => setToasts((current) => current.filter((toast) => toast.id !== item.id))} className="h-7 w-7 shrink-0 rounded-full border border-black/10 text-black/50">
                <X className="mx-auto" size={14}/>
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside ToastProvider')
  return context
}
