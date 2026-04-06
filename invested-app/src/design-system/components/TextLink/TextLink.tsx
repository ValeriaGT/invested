import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styles from './TextLink.module.css'

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  size?: 'sm' | 'md'
}

export function TextLink({ children, size = 'md', className, ...rest }: TextLinkProps) {
  return (
    <a className={`${styles.link} ${styles[size]} ${className ?? ''}`} {...rest}>
      {children}
    </a>
  )
}
