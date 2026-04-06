import type { ReactNode } from 'react'
import styles from './Button.module.css'

export type ButtonVariant = 'Primary' | 'Secondary' | 'Tertiary'
export type ButtonSize = 'Small' | 'Large'
export type ButtonIcon = 'None' | 'Left' | 'Right' | 'On'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: ButtonIcon
  label?: string
  iconElement?: ReactNode
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  /** Requerido cuando icon === 'On' para accesibilidad */
  'aria-label'?: string
}

const variantClass: Record<ButtonVariant, string> = {
  Primary: styles.primary,
  Secondary: styles.secondary,
  Tertiary: styles.tertiary,
}

const sizeClass: Record<ButtonSize, string> = {
  Small: styles.small,
  Large: styles.large,
}

export function Button({
  variant = 'Primary',
  size = 'Large',
  icon = 'None',
  label,
  iconElement,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isIconOnly = icon === 'On'

  const classes = [
    styles.btn,
    variantClass[variant],
    sizeClass[size],
    isIconOnly ? styles.iconOnly : '',
    fullWidth ? styles.fullWidth : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={classes}
      disabled={disabled}
      type={type}
      onClick={onClick}
      aria-label={isIconOnly ? ariaLabel : undefined}
    >
      {(icon === 'Left' || icon === 'On') && iconElement}
      {!isIconOnly && <span>{label}</span>}
      {icon === 'Right' && iconElement}
    </button>
  )
}
