import type { ReactNode } from 'react'
import styles from './Alert.module.css'

export type AlertVariant = 'success' | 'info' | 'warning' | 'error'

export interface AlertProps {
  variant?: AlertVariant
  title?: string
  message: ReactNode
}

const ICONS: Record<AlertVariant, string> = {
  success: '✓',
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
}

export function Alert({ variant = 'info', title, message }: AlertProps) {
  return (
    <div className={`${styles.alert} ${styles[variant]}`} role="alert">
      <span className={styles.icon} aria-hidden="true">
        {ICONS[variant]}
      </span>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.message}>{message}</div>
      </div>
    </div>
  )
}
