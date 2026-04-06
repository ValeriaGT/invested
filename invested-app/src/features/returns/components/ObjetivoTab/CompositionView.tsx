import { useState } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import { formatCOP } from '@shared/utils/format'
import { IconBolt, IconCircleQuestion, IconScale, IconShield } from '../Icons'
import type { RiskProfile } from '../../types'
import { compositionFunds, type CompositionFund } from './compositionMockData'
import styles from './CompositionView.module.css'

function RiskIcon({ profile }: { profile: RiskProfile }) {
  switch (profile) {
    case 'prudente':
      return <IconShield size={16} />
    case 'observador':
      return <IconScale size={16} />
    case 'arriesgado':
      return <IconBolt size={16} />
  }
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload: CompositionFund }[]
}) {
  if (!active || !payload?.length) return null
  const fund = payload[0].payload
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltipDot} style={{ backgroundColor: fund.color }} />
      <span>
        {fund.participation}% {fund.name}
      </span>
    </div>
  )
}

export function CompositionView() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>Composición de tus portafolios</h3>
        <button className={styles.helpButton} aria-label="Más información sobre composición">
          <IconCircleQuestion size={18} />
        </button>
      </div>

      <div className={styles.content}>
        {/* Donut chart */}
        <div className={styles.chartPanel}>
          <PieChart width={254} height={254}>
            <Pie
              data={compositionFunds}
              cx={127}
              cy={127}
              innerRadius={72}
              outerRadius={120}
              paddingAngle={2}
              dataKey="participation"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {compositionFunds.map((fund, index) => (
                <Cell
                  key={fund.id}
                  fill={fund.color}
                  opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </div>

        {/* Portfolio table */}
        <div className={styles.tablePanel}>
          <div className={styles.columnHeaders}>
            <span className={styles.colPortafolios}>Portafolios</span>
            <span className={styles.colParticipacion}>Participación</span>
            <span className={styles.colSaldo}>Saldo total</span>
          </div>
          <ul className={styles.fundList}>
            {compositionFunds.map((fund) => (
              <li key={fund.id} className={styles.fundRow}>
                <div className={styles.fundInfo}>
                  <span className={styles.fundDot} style={{ backgroundColor: fund.color }} />
                  <RiskIcon profile={fund.riskProfile} />
                  <span className={styles.fundName}>{fund.name}</span>
                </div>
                <span className={styles.participation}>{fund.participation}%</span>
                <span className={`${styles.balance} monetary`}>{formatCOP(fund.balance)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.footnote}>
          *La distribución expuesta se basa en el precio de mercado de los portafolios en que estás
          invirtiendo.
        </p>
        <a href="#" className={styles.replicateLink}>
          Replicar distribución a otro contrato
        </a>
      </div>
    </div>
  )
}
