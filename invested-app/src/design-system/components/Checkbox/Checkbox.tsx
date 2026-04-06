import type { InputHTMLAttributes } from 'react'
import styles from './Checkbox.module.css'

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  label: string
  hint?: string
}

export function Checkbox({ label, hint, disabled, id, ...rest }: CheckboxProps) {
  const checkboxId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <label htmlFor={checkboxId} className={styles.wrapper} style={{ margin: 0 }}>
        <input
          type="checkbox"
          id={checkboxId}
          className={styles.input}
          disabled={disabled}
          {...rest}
        />
        <span className={styles.box} aria-hidden="true">
          <span className={styles.checkmark}>✓</span>
        </span>
        <span>
          <span className={styles.label}>{label}</span>
          {hint && <div className={styles.hint}>{hint}</div>}
        </span>
      </label>
    </div>
  )
}
