import type { ContractTab } from '../../types'
import { IconChartMixed, IconFolderGrid, IconRefresh, IconRocket } from '../Icons'
import styles from './TabNavigation.module.css'

interface Tab {
  id: ContractTab
  label: string
  icon: React.ReactNode
}

const TABS: Tab[] = [
  { id: 'desempeno', label: 'Desempeño', icon: <IconChartMixed size={24} /> },
  { id: 'objetivo', label: 'Objetivo', icon: <IconRocket size={24} /> },
  { id: 'movimientos', label: 'Movimientos', icon: <IconRefresh size={24} /> },
  { id: 'detalles', label: 'Detalles', icon: <IconFolderGrid size={24} /> },
]

interface TabNavigationProps {
  activeTab: ContractTab
  onTabChange: (tab: ContractTab) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className={styles.tabBar} aria-label="Secciones del contrato">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
          aria-pressed={activeTab === tab.id}
        >
          <span className={styles.tabIcon}>{tab.icon}</span>
          <span className={styles.tabLabel}>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
