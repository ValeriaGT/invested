import { useState } from 'react'
import { Button } from '@ds/components/Button'
import { contractData, chartData, portfolioFunds } from '../../mockData'
import type { ContractTab, ReturnsSubTab } from '../../types'
import { Breadcrumb } from '../Breadcrumb/Breadcrumb'
import { ContractSummaryCards } from '../ContractSummaryCards/ContractSummaryCards'
import { TabNavigation } from '../TabNavigation/TabNavigation'
import { ReturnsChart } from '../ReturnsChart/ReturnsChart'
import { PortfolioTable } from '../PortfolioTable/PortfolioTable'
import { CompositionView } from '../ObjetivoTab/CompositionView'
import { ObjetivoTab } from '../ObjetivoTab/ObjetivoTab'
import { MovimientosTab } from '../MovimientosTab/MovimientosTab'
import { DetallesTab } from '../DetallesTab/DetallesTab'
import { MiNivel } from '../CrecerTab/MiNivel'
import { MisHitos } from '../CrecerTab/MisHitos'
import { Aprende } from '../CrecerTab/Aprende'
import { IconEdit } from '../Icons'
import investedLogo from '../../../../assets/invested.svg'
import styles from './DetailBase.module.css'

const BREADCRUMB_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'P. Voluntaria', href: '/voluntaria' },
  { label: `#${contractData.contractNumber}`, active: true },
]

export function DetailBase() {
  const [activeTab, setActiveTab] = useState<ContractTab>('desempeno')
  const [activeSubTab, setActiveSubTab] = useState<ReturnsSubTab>('rendimientos')
  const [activeCrecerSubTab, setActiveCrecerSubTab] = useState<'miNivel' | 'misHitos' | 'aprende'>('miNivel')

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
          <div className={styles.fundNameRow}>
            <p className={styles.fundName}>{contractData.fundName}</p>
            <span className={styles.fundNameSeparator} aria-hidden="true" />
            <img src={investedLogo} alt="InvestED" className={styles.fundLogo} />
          </div>
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

      {activeTab === 'objetivo' && (
        <ObjetivoTab
          onNavigateToCrecer={() => {
            setActiveTab('crecer')
            setActiveCrecerSubTab('miNivel')
          }}
        />
      )}

      {activeTab === 'crecer' && (
        <div className={styles.crecerContent}>
          <div className={styles.subTabsRow}>
            <div className={styles.subTabs} role="tablist" aria-label="Sección Mi InvestED">
              {(
                [
                  { id: 'miNivel', label: 'Mi Nivel' },
                  { id: 'misHitos', label: 'Mis Hitos' },
                  { id: 'aprende', label: 'Aprende' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeCrecerSubTab === t.id}
                  className={`${styles.subTab} ${activeCrecerSubTab === t.id ? styles.subTabActive : ''}`}
                  onClick={() => setActiveCrecerSubTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {activeCrecerSubTab === 'miNivel' && <MiNivel />}
          {activeCrecerSubTab === 'misHitos' && (
              <MisHitos onGoToObjetivo={() => setActiveTab('objetivo')} />
            )}
          {activeCrecerSubTab === 'aprende' && <Aprende />}
        </div>
      )}

      {activeTab === 'movimientos' && (
        <MovimientosTab
          onNavigateToMiInvested={() => {
            setActiveTab('crecer')
            setActiveCrecerSubTab('aprende')
          }}
        />
      )}

      {activeTab === 'detalles' && <DetallesTab />}
    </div>
  )
}
