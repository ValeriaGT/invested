import { useState } from 'react'
import { useInvestorLevel, mockInvestorInput } from '@/hooks/useInvestorLevel'
import { MixExplorerDrawer } from '@/components/crecer/MixExplorerDrawer'
import { IconRefresh } from '../Icons'
import styles from './ObjetivoTab.module.css'

const GOAL = {
  name: 'Invertir en finca raíz 🏠',
  currentAmount: 125450000,
  targetAmount: 250000000,
  progressPercent: 50,
  startDate: '15 mar 2025',
  estimatedDate: '15 mar 2030',
  monthlyContribution: 2500000,
  contributionDay: '05 de cada mes',
}

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function ObjetivoTab({ onNavigateToCrecer }: { onNavigateToCrecer?: () => void } = {}) {
  const { currentLevel, currentLevelLabel, currentLevelEmoji } = useInvestorLevel(mockInvestorInput)
  const hasEvolved = currentLevel !== 'principiante'
  const [bannerVisible, setBannerVisible] = useState(hasEvolved)
  const [explorerOpen, setExplorerOpen] = useState(false)

  return (
    <div className={styles.container}>
      {/* ── Header: goal name + Editar objetivo button ── */}
      <div className={styles.headerRow}>
        <h2 className={styles.pageTitle}>{GOAL.name}</h2>
        <button className={styles.editGoalBtn} type="button">
          <span className={styles.editGoalBtnIcon}><IconRefresh size={14} /></span>
          Editar objetivo
        </button>
      </div>

      {/* ── Card progreso de meta ── */}
      <div className={styles.progressCard}>
        <div className={styles.progressTopRow}>
          <div className={styles.progressAmountBlock}>
            <div className={styles.progressLabelRow}>
              <p className={styles.progressLabel}>Progreso de tu meta</p>
              {hasEvolved && !bannerVisible && (
                <button
                  className={styles.levelChip}
                  onClick={() => setExplorerOpen(true)}
                  type="button"
                  data-tooltip="Ver mis mezclas disponibles"
                  aria-label="Ver mis mezclas disponibles"
                >
                  Nivel {currentLevelLabel} {currentLevelEmoji}
                </button>
              )}
            </div>
            <p className={`${styles.progressAmount} monetary`}>
              {formatCOP(GOAL.currentAmount)}{' '}
              <span className={styles.progressTarget}>/ {formatCOP(GOAL.targetAmount)}</span>
            </p>
          </div>
          <span className={styles.progressPercent}>{GOAL.progressPercent}%</span>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${GOAL.progressPercent}%` }}
            role="progressbar"
            aria-valuenow={GOAL.progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <div className={styles.progressDates}>
          <span>Iniciaste: {GOAL.startDate}</span>
          <span>Meta estimada: {GOAL.estimatedDate}</span>
        </div>
      </div>

      {/* ── Banner nivel ── */}
      {hasEvolved && bannerVisible && (
        <div className={styles.banner}>
          <button
            className={styles.bannerClose}
            onClick={() => setBannerVisible(false)}
            type="button"
            aria-label="Cerrar"
          >
            ✕
          </button>
          <div className={styles.bannerContent}>
            <div className={styles.bannerLeft}>
              <span className={styles.bannerEmoji} aria-hidden="true">{currentLevelEmoji}</span>
              <div>
                <p className={styles.bannerTitle}>¡Alcanzaste el nivel {currentLevelLabel}!</p>
                <p className={styles.bannerText}>
                  Tienes acceso a 2 mezclas nuevas que podrían acelerar tu meta
                </p>
              </div>
            </div>
            <div className={styles.bannerRight}>
              <button
                className={styles.bannerBtn}
                type="button"
                onClick={() => setExplorerOpen(true)}
              >
                Explorar mezclas →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dos cards inferiores ── */}
      <div className={styles.cardsGrid}>
        {/* Detalles del plan */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Detalles del plan</h3>
          <div className={styles.detailList}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Aporte mensual</span>
              <span className={`${styles.detailValue} monetary`}>{formatCOP(GOAL.monthlyContribution)}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Frecuencia</span>
              <span className={styles.detailValue}>Mensual</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Día de aporte</span>
              <span className={styles.detailValue}>{GOAL.contributionDay}</span>
            </div>
          </div>
        </div>

        {/* Proyección estimada */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Proyección estimada</h3>
          <p className={styles.projectionText}>
            Vas por buen camino. Si mantienes tu ritmo actual de aportes y la rentabilidad
            proyectada, alcanzarás tu meta 3 meses antes de lo previsto.
          </p>
          <div className={styles.tipBox}>
            <p className={styles.tipLabel}>Tip de Invested</p>
            <p className={styles.tipText}>
              Aumentar tu aporte en un 5% anual compensaría la inflación y protegería tu
              poder adquisitivo.
            </p>
          </div>
        </div>
      </div>

      <MixExplorerDrawer
        isOpen={explorerOpen}
        onClose={() => setExplorerOpen(false)}
        onNavigateToCrecer={onNavigateToCrecer}
      />
    </div>
  )
}
