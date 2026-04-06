import type { ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeVariant = 'success' | 'neutral' | 'info' | 'warning' | 'error' | 'achievement'

export interface BadgeProps {
  label: string
  variant?: BadgeVariant
  icon?: ReactNode
  dot?: boolean
}

export function Badge({ label, variant = 'neutral', icon, dot = false }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </span>
  )
}
