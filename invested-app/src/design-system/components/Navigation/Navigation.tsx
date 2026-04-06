import type { ReactNode } from 'react'
import styles from './Navigation.module.css'

/* ─── Top Header ─── */
export interface NavHeaderProps {
  title?: string
  onBack?: () => void
  action?: ReactNode
}

export function NavHeader({ title, onBack, action }: NavHeaderProps) {
  return (
    <header className={styles.header}>
      {onBack && (
        <button className={styles.backButton} onClick={onBack} aria-label="Volver" type="button">
          ←
        </button>
      )}
      {title && <h1 className={styles.title}>{title}</h1>}
      {action && <div className={styles.action}>{action}</div>}
    </header>
  )
}

/* ─── Bottom Tab Bar ─── */
export interface TabItem {
  id: string
  label: string
  icon: string
}

export interface TabBarProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (id: string) => void
}

export function TabBar({ tabs, activeTab, onChange }: TabBarProps) {
  return (
    <nav className={styles.tabBar} aria-label="Navegación principal">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onChange(tab.id)}
          aria-current={activeTab === tab.id ? 'page' : undefined}
          type="button"
        >
          <span className={styles.tabIcon} aria-hidden="true">
            {tab.icon}
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
