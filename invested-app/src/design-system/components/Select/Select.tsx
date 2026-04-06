import type { SelectHTMLAttributes } from 'react'
import styles from './Select.module.css'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string
  hint?: string
  errorMessage?: string
  options: SelectOption[]
  placeholder?: string
}

export function Select({
  label,
  hint,
  errorMessage,
  options,
  placeholder,
  id,
  disabled,
  ...rest
}: SelectProps) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

  const selectClasses = [styles.select, errorMessage ? styles.error : ''].filter(Boolean).join(' ')

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={selectId}
          className={selectClasses}
          disabled={disabled}
          aria-invalid={!!errorMessage}
          aria-describedby={
            errorMessage ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined
          }
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron} aria-hidden="true">
          ▾
        </span>
      </div>
      {errorMessage && (
        <span id={`${selectId}-error`} className={styles.errorMessage} role="alert">
          {errorMessage}
        </span>
      )}
      {!errorMessage && hint && (
        <span id={`${selectId}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
    </div>
  )
}
