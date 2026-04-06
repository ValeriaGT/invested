import { useState } from 'react'
import { Button } from '@ds/components/Button'
import { contractData, chartData, portfolioFunds } from './mockData'
import type { ContractTab, ReturnsSubTab } from './types'
import { Breadcrumb } from './components/Breadcrumb/Breadcrumb'
import { ContractSummaryCards } from './components/ContractSummaryCards/ContractSummaryCards'
import { TabNavigation } from './components/TabNavigation/TabNavigation'
import { ReturnsChart } from './components/ReturnsChart/ReturnsChart'
import { PortfolioTable } from './components/PortfolioTable/PortfolioTable'
import { CompositionView } from './components/ObjetivoTab/CompositionView'
import { ObjetivoTab } from './components/ObjetivoTab/ObjetivoTab'
import { MovimientosTab } from './components/MovimientosTab/MovimientosTab'
import { DetallesTab } from './components/DetallesTab/DetallesTab'
import { IconEdit } from './components/Icons'
import styles from './ContractDetailPage.module.css'

const BREADCRUMB_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'P. Voluntaria', href: '/voluntaria' },
  { label: `#${contractData.contractNumber}`, active: true },
]

export function ContractDetailPage() {
  const [activeTab, setActiveTab] = useState<ContractTab>('desempeno')
  const [activeSubTab, setActiveSubTab] = useState<ReturnsSubTab>('rendimientos')

  return (
    <div className={styles.page}>
      <div className={styles.headerArea}>
        <Breadcrumb items={BREADCRUMB_ITEMS} onBack={() => history.back()} />

        <div className={styles.titleArea}>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>{contractData.goalName}</h1>
            <button className={styles.editButton} aria-label="Editar objetivo">
              <IconEdit size={16} />
            </button>
          </div>
          <p className={styles.fundName}>{contractData.fundName}</p>
        </div>
      </div>

      <ContractSummaryCards data={contractData} />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'desempeno' && (
        <div className={styles.desempenoContent}>
          <div className={styles.subTabsRow}>
            <div className={styles.subTabs} role="tablist" aria-label="Tipo de desempeño">
              <button
                role="tab"
                aria-selected={activeSubTab === 'rendimientos'}
                className={`${styles.subTab} ${activeSubTab === 'rendimientos' ? styles.subTabActive : ''}`}
                onClick={() => setActiveSubTab('rendimientos')}
              >
                Rendimientos
              </button>
              <button
                role="tab"
                aria-selected={activeSubTab === 'composicion'}
                className={`${styles.subTab} ${activeSubTab === 'composicion' ? styles.subTabActive : ''}`}
                onClick={() => setActiveSubTab('composicion')}
              >
                Composición
              </button>
            </div>
            <Button
              variant="Secondary"
              size="Small"
              label="Gestionar Portafolios"
              onClick={() => {}}
            />
          </div>

          {activeSubTab === 'rendimientos' && (
            <div className={styles.chartsRow}>
              <div className={styles.chartPanel}>
                <ReturnsChart data={chartData} />
              </div>
              <div className={styles.tablePanel}>
                <PortfolioTable
                  funds={portfolioFunds}
                  prospectusUrl="https://www.skandia.co/portafolios-fondo-voluntario-de-pension-skandia"
                />
              </div>
            </div>
          )}

          {activeSubTab === 'composicion' && <CompositionView />}
        </div>
      )}

      {activeTab === 'objetivo' && <ObjetivoTab />}

      {activeTab === 'movimientos' && <MovimientosTab />}

      {activeTab === 'detalles' && <DetallesTab />}
    </div>
  )
}
