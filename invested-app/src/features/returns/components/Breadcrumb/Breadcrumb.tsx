import type { BreadcrumbItem } from '../../types'
import { IconArrowLeft } from '../Icons'
import styles from './Breadcrumb.module.css'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  onBack?: () => void
}

export function Breadcrumb({ items, onBack }: BreadcrumbProps) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <button className={styles.backButton} onClick={onBack} aria-label="Volver">
        <IconArrowLeft size={16} />
      </button>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {item.href && !item.active ? (
              <a href={item.href} className={styles.link}>
                {item.label}
              </a>
            ) : (
              <span className={item.active ? styles.active : styles.link}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
