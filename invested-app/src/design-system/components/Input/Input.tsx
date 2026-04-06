import type { InputHTMLAttributes, ReactNode } from 'react'
import styles from './Input.module.css'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  hint?: string
  errorMessage?: string
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

export function Input({
  label,
  hint,
  errorMessage,
  iconLeft,
  iconRight,
  id,
  className: _className, // eslint-disable-line @typescript-eslint/no-unused-vars
  disabled,
  ...rest
}: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  const inputClasses = [
    styles.input,
    errorMessage ? styles.error : '',
    iconLeft ? styles.hasLeftIcon : '',
    iconRight ? styles.hasRightIcon : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
        <input
          id={inputId}
          className={inputClasses}
          disabled={disabled}
          aria-invalid={!!errorMessage}
          aria-describedby={
            errorMessage ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...rest}
        />
        {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
      </div>
      {errorMessage && (
        <span id={`${inputId}-error`} className={styles.errorMessage} role="alert">
          {errorMessage}
        </span>
      )}
      {!errorMessage && hint && (
        <span id={`${inputId}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  )
}
