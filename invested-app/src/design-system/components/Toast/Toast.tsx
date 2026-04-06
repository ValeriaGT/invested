import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import styles from './Toast.module.css'

export type ToastKind = 'success' | 'info' | 'warning' | 'error'

export interface ToastItem {
  id: string
  kind: ToastKind
  title?: string
  message: string
  duration?: number
}

interface ToastContextValue {
  show: (toast: Omit<ToastItem, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ICONS: Record<ToastKind, string> = {
  success: '✓',
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
}

function ToastItem({ item, onRemove }: { item: ToastItem; onRemove: (id: string) => void }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => onRemove(item.id), item.duration ?? 4000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [item.id, item.duration, onRemove])

  return (
    <div className={`${styles.toast} ${styles[item.kind]}`} role="alert" aria-live="polite">
      <span className={styles.icon} aria-hidden="true">
        {ICONS[item.kind]}
      </span>
      <div className={styles.content}>
        {item.title && <div className={styles.title}>{item.title}</div>}
        <div className={styles.message}>{item.message}</div>
      </div>
      <button
        className={styles.closeBtn}
        onClick={() => onRemove(item.id)}
        aria-label="Cerrar notificación"
        type="button"
      >
        ✕
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((toast: Omit<ToastItem, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((prev) => [...prev, { ...toast, id }])
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className={styles.container} aria-label="Notificaciones">
        {toasts.map((t) => (
          <ToastItem key={t.id} item={t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>')
  return ctx
}
