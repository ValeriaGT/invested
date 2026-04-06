import type { PortfolioFund, RiskProfile } from '../../types'
import { IconBolt, IconCircleQuestion, IconFilePdf, IconScale, IconShield } from '../Icons'
import styles from './PortfolioTable.module.css'

interface KpiData {
  percentage: number
  label: string
  period: string
}

const KPI_CARDS: KpiData[] = [
  { percentage: 6.57, label: 'EA Neto', period: 'Un año' },
  { percentage: 10.57, label: 'EA Neto', period: 'Tres años' },
]

interface PortfolioTableProps {
  funds: PortfolioFund[]
  prospectusUrl?: string
  replicateUrl?: string
}

function RiskIcon({ profile }: { profile: RiskProfile }) {
  switch (profile) {
    case 'prudente':
      return <IconShield size={14} />
    case 'observador':
      return <IconScale size={14} />
    case 'arriesgado':
      return <IconBolt size={14} />
  }
}

function KpiCard({ data }: { data: KpiData }) {
  return (
    <div className={styles.kpiCard}>
      <p className={styles.kpiPercentage}>
        {data.percentage.toFixed(2)} % <span className={styles.kpiLabel}>{data.label}</span>
      </p>
      <p className={styles.kpiPeriod}>{data.period}</p>
    </div>
  )
}

export function PortfolioTable({ funds, prospectusUrl, replicateUrl }: PortfolioTableProps) {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>Rentabilidad de tus portafolios E.A.</h3>
          <button className={styles.helpButton} aria-label="Más información sobre rentabilidad">
            <IconCircleQuestion size={16} />
          </button>
        </div>
        {prospectusUrl && (
          <a
            href={prospectusUrl}
            className={styles.prospectusLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prospectos
          </a>
        )}
      </div>

      {/* KPI summary cards */}
      <div className={styles.kpiRow}>
        {KPI_CARDS.map((kpi, i) => (
          <KpiCard key={i} data={kpi} />
        ))}
      </div>

      {/* Portfolio table */}
      <div className={styles.tableWrapper}>
        <div className={styles.columnHeaders}>
          <span className={styles.colPortafolios}>Portafolios</span>
          <span className={styles.col365}>Últimos 365 días</span>
          <span className={styles.colInformes}>Informes</span>
        </div>

        <ul className={styles.fundList}>
          {funds.map((fund) => (
            <li key={fund.id} className={styles.fundRow}>
              <div className={styles.fundInfo}>
                <RiskIcon profile={fund.riskProfile} />
                <span className={styles.fundName}>{fund.name}</span>
              </div>
              <span className={styles.fundReturn}>{fund.return365}%</span>
              <button className={styles.pdfButton} aria-label={`Descargar informe de ${fund.name}`}>
                <IconFilePdf size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom CTA */}
      <a href={replicateUrl ?? '#'} className={styles.replicateLink}>
        Replicar distribución a otro contrato
      </a>
    </div>
  )
}
