import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Card.module.css'

export type CardPadding = 'default' | 'compact' | 'flush'
export type CardVariant = 'default' | 'elevated'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: CardPadding
  variant?: CardVariant
  interactive?: boolean
}

export function Card({
  children,
  padding = 'default',
  variant = 'default',
  interactive = false,
  className,
  ...rest
}: CardProps) {
  const classes = [
    styles.card,
    styles[padding],
    variant === 'elevated' ? styles.elevated : '',
    interactive ? styles.interactive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      className={classes}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
