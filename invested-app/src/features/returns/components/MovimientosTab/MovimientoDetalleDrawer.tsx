import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Movement } from './movimientosMockData'
import styles from './MovimientoDetalleDrawer.module.css'

const REBALANCEO_FUNDS = [
  { name: 'Fondo Acciones Globales', change: -4, newWeight: 26 },
  { name: 'Fondo Renta Fija Col.', change: 3, newWeight: 48 },
  { name: 'Fondo Liquidez', change: 1, newWeight: 26 },
]

interface Props {
  movement: Movement | null
  isOpen: boolean
  onClose: () => void
  onNavigateToMiInvested?: () => void
}

function RebalanceoContent({ onNavigateToMiInvested }: { onNavigateToMiInvested?: () => void }) {
  return (
    <>
      {/* Sección 1 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon} aria-hidden="true">🔄</span>
          <h3 className={styles.sectionTitle}>¿Qué pasó?</h3>
        </div>
        <p className={styles.sectionText}>
          Invested ajustó la distribución de tu mezcla Discreta para mantener tu estrategia de
          inversión en equilibrio.
        </p>
      </div>

      {/* Sección 2 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon} aria-hidden="true">📉</span>
          <h3 className={styles.sectionTitle}>¿Por qué ocurrió?</h3>
        </div>
        <p className={styles.sectionText}>
          La renta variable subió más de lo esperado, lo que aumentó su peso en tu mezcla. Invested
          la reajustó para mantener tu perfil de riesgo original.
        </p>
      </div>

      {/* Sección 3 */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>¿Qué se movió?</h3>
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <span>Fondo</span>
            <span>Cambio</span>
            <span>Nuevo peso</span>
          </div>
          {REBALANCEO_FUNDS.map((fund) => (
            <div key={fund.name} className={styles.tableRow}>
              <span className={styles.fundName}>{fund.name}</span>
              <span className={fund.change < 0 ? styles.changeNeg : styles.changePos}>
                {fund.change > 0 ? `+${fund.change}%` : `${fund.change}%`}
              </span>
              <span className={styles.newWeight}>{fund.newWeight}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sección 4 */}
      <div className={`${styles.section} ${styles.tipBox}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon} aria-hidden="true">✅</span>
          <h3 className={`${styles.sectionTitle} ${styles.tipTitle}`}>¿Necesitas hacer algo?</h3>
        </div>
        <p className={styles.tipText}>
          No. Invested lo gestionó automáticamente por ti.
        </p>
      </div>

      {/* Sección 5 */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon} aria-hidden="true">💡</span>
          <h3 className={styles.sectionTitle}>¿Sabías que...</h3>
        </div>
        <p className={styles.sectionText}>
          Los rebalanceos protegen tu inversión de que un solo fondo tome demasiado peso con el
          tiempo.
        </p>
        {/* TODO: navegar al sub-tab Aprende del tab Mi InvestED */}
        <button
          className={styles.learnMoreBtn}
          onClick={onNavigateToMiInvested}
          type="button"
        >
          Aprender más →
        </button>
      </div>
    </>
  )
}

export function MovimientoDetalleDrawer({ movement, isOpen, onClose, onNavigateToMiInvested }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!movement) return null

  return createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="presentation"
    >
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mov-detalle-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p id="mov-detalle-title" className={styles.title}>{movement.type}</p>
            <p className={styles.date}>
              {movement.type === 'Rebalanceo' ? '15 de marzo de 2026' : movement.date}
            </p>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {movement.type === 'Rebalanceo' ? (
            <RebalanceoContent onNavigateToMiInvested={onNavigateToMiInvested} />
          ) : (
            <p className={styles.sectionText}>Detalle de {movement.type} — próximamente.</p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
