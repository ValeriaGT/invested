import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@ds/components/Button'
import { compositionFunds } from '@features/returns/components/ObjetivoTab/compositionMockData'
import styles from './MixDrawer.module.css'

interface MixDrawerProps {
  isOpen: boolean
  onClose: () => void
  onViewComposition: () => void
}

export function MixDrawer({ isOpen, onClose, onViewComposition }: MixDrawerProps) {
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
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mix-drawer-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p id="mix-drawer-title" className={styles.title}>Tu mezcla: Discreta</p>
            <p className={styles.subtitle}>Aquí te explicamos qué significa</p>
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

        {/* Scrollable content */}
        <div className={styles.body}>

          {/* Sección 1 */}
          <div className={styles.section}>
            <span className={styles.sectionEmoji} aria-hidden="true">📊</span>
            <div>
              <p className={styles.sectionTitle}>¿Qué es tu mezcla?</p>
              <p className={styles.sectionBody}>
                Tu mezcla Discreta combina fondos de renta fija y variable con un balance moderado.
                Está diseñada para crecer de forma estable sin asumir riesgos altos.
              </p>
            </div>
          </div>

          <hr className={styles.divider} aria-hidden="true" />

          {/* Sección 2 */}
          <div className={styles.section}>
            <span className={styles.sectionEmoji} aria-hidden="true">🎯</span>
            <div>
              <p className={styles.sectionTitle}>¿Por qué esta mezcla?</p>
              <p className={styles.sectionBody}>
                Invested la seleccionó basándose en tu objetivo, tu horizonte de inversión
                y tu tolerancia al riesgo.
              </p>
            </div>
          </div>

          <hr className={styles.divider} aria-hidden="true" />

          {/* Sección 3 */}
          <div className={styles.section}>
            <span className={styles.sectionEmoji} aria-hidden="true">🔄</span>
            <div>
              <p className={styles.sectionTitle}>¿Qué hace Invested por ti?</p>
              <p className={styles.sectionBody}>
                Monitorea y rebalancea tu mezcla automáticamente cuando el mercado se mueve.
                No tienes que hacer nada.
              </p>
            </div>
          </div>

          <hr className={styles.divider} aria-hidden="true" />

          {/* Sección 4 — Fondos */}
          <div className={styles.section}>
            <span className={styles.sectionEmoji} aria-hidden="true">📈</span>
            <div className={styles.sectionFunds}>
              <p className={styles.sectionTitle}>¿Cómo van tus fondos?</p>
              <ul className={styles.fundList}>
                {compositionFunds.map((fund) => (
                  <li key={fund.id} className={styles.fundRow}>
                    <span
                      className={styles.fundDot}
                      style={{ background: fund.color }}
                      aria-hidden="true"
                    />
                    <span className={styles.fundName}>{fund.name}</span>
                    <span className={styles.fundPct}>{fund.participation}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            variant="Primary"
            size="Large"
            label="Ver composición completa"
            fullWidth
            onClick={onViewComposition}
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
