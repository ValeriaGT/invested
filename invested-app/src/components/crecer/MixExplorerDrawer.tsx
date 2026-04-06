import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { Button } from '@ds/components/Button'
import { Badge } from '@ds/components/Badge'
import { Card } from '@ds/components/Card'
import styles from './MixExplorerDrawer.module.css'

export interface MixExplorerDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigateToCrecer?: () => void
}

export function MixExplorerDrawer({ isOpen, onClose, onNavigateToCrecer }: MixExplorerDrawerProps) {
  const [expanded, setExpanded] = useState<'paciente' | 'dinamica' | null>(null)

  useEffect(() => {
    if (isOpen) setExpanded(null)
  }, [isOpen])

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

  function handleExploreChange() {
    onClose()
    onNavigateToCrecer?.()
  }

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
        aria-labelledby="mix-explorer-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <p id="mix-explorer-title" className={styles.title}>
              Tus nuevas mezclas disponibles
            </p>
            <p className={styles.levelBadge}>Nivel Observador 🔭</p>
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

        {/* Scrollable body */}
        <div className={styles.body}>

          {/* Sección: tu mezcla actual */}
          <p className={styles.sectionLabel}>TU MEZCLA ACTUAL</p>
          <Card padding="compact" className={styles.currentCard}>
            <div className={styles.currentRow}>
              <span className={styles.activeDot} aria-hidden="true" />
              <div>
                <p className={styles.mixName}>Discreta</p>
                <p className={styles.mixMeta}>Moderada · 7.1% EA histórico</p>
              </div>
            </div>
          </Card>

          {/* Sección: nuevas mezclas */}
          <div className={styles.newSection}>
            <p className={styles.sectionLabel}>AHORA DISPONIBLES</p>
            <p className={styles.unlockedNote}>Desbloqueadas por alcanzar nivel Observador</p>
          </div>

          {/* Card Paciente */}
          <Card padding="compact" className={styles.newCard}>
            <div className={styles.newCardHeader}>
              <div className={styles.newCardTitles}>
                <p className={styles.mixName}>Paciente</p>
                <p className={styles.mixMeta}>Moderada-dinámica · 7.8% EA histórico</p>
                <p className={styles.mixDesc}>
                  Mayor crecimiento a largo plazo con algo más de riesgo
                </p>
              </div>
              <Badge label="Nueva para ti" variant="success" />
            </div>
            <button
              className={styles.toggleBtn}
              onClick={() => setExpanded(expanded === 'paciente' ? null : 'paciente')}
              type="button"
              aria-expanded={expanded === 'paciente'}
            >
              {expanded === 'paciente' ? 'Ocultar detalle ↑' : 'Ver detalle ↓'}
            </button>
            {expanded === 'paciente' && (
              <p className={styles.detailText}>
                La mezcla Paciente combina un 60% en renta variable y 40% en renta fija. Ideal
                para horizontes mayores a 5 años.
              </p>
            )}
          </Card>

          {/* Card Dinámica */}
          <Card padding="compact" className={styles.newCard}>
            <div className={styles.newCardHeader}>
              <div className={styles.newCardTitles}>
                <p className={styles.mixName}>Dinámica</p>
                <p className={styles.mixMeta}>Dinámica · 8.2% EA histórico</p>
                <p className={styles.mixDesc}>
                  Para objetivos de largo plazo con tolerancia alta
                </p>
              </div>
              <Badge label="Nueva para ti" variant="success" />
            </div>
            <button
              className={styles.toggleBtn}
              onClick={() => setExpanded(expanded === 'dinamica' ? null : 'dinamica')}
              type="button"
              aria-expanded={expanded === 'dinamica'}
            >
              {expanded === 'dinamica' ? 'Ocultar detalle ↑' : 'Ver detalle ↓'}
            </button>
            {expanded === 'dinamica' && (
              <p className={styles.detailText}>
                La mezcla Dinámica invierte un 80% en renta variable. Mayor potencial de
                crecimiento a largo plazo.
              </p>
            )}
          </Card>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            variant="Primary"
            size="Large"
            label="Quiero explorar un cambio"
            fullWidth
            onClick={handleExploreChange}
          />
          <button className={styles.stayBtn} onClick={onClose} type="button">
            Quedarme con mi mezcla actual
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
