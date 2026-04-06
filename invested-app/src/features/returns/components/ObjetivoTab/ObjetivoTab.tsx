import { IconEdit } from '../Icons'
import styles from './ObjetivoTab.module.css'

const GOAL = {
  userName: 'Juan Pablo',
  name: 'Primera cuota casita 🏠',
  category: 'Vivienda',
  timeToAchieve: '5 años',
  progressPercent: 35,
  targetAmount: 2300000000,
}

function formatCOPCompact(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

function SamiIcon() {
  return (
    <div className={styles.samiIcon} aria-hidden="true">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#E8F8FF" />
        <circle cx="16" cy="13" r="7" fill="#52FFD9" fillOpacity="0.4" />
        <rect x="10" y="10" width="12" height="10" rx="4" fill="#0099DE" />
        <circle cx="13" cy="14" r="1.5" fill="white" />
        <circle cx="19" cy="14" r="1.5" fill="white" />
        <path
          d="M13 18.5C13 18.5 14.5 20 16 20C17.5 20 19 18.5 19 18.5"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <rect x="14" y="6" width="4" height="3" rx="1" fill="#0099DE" />
        <circle cx="13" cy="6" r="1.2" fill="#00C73D" />
        <circle cx="19" cy="6" r="1.2" fill="#00C73D" />
      </svg>
      <span className={styles.sparkle}>✨</span>
    </div>
  )
}

export function ObjetivoTab() {
  return (
    <div className={styles.container}>
      {/* Header row */}
      <div className={styles.headerRow}>
        <SamiIcon />
        <p className={styles.headline}>
          <span className={styles.userName}>¡{GOAL.userName}</span>
          <span className={styles.headlineText}>, este es el progreso hacia tu objetivo! 🚀</span>
        </p>
        <button className={styles.editGoalBtn}>
          <span className={styles.editGoalBtnIcon}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M10 2C10 2 8 0 6 2C4 4 2 10 2 10C2 10 8 8 10 6C12 4 10 2 10 2Z"
                stroke="white"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path d="M6 6L8 4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </span>
          Editar objetivo
        </button>
      </div>

      {/* Goal progress card */}
      <div className={styles.goalCard}>
        {/* Left: details */}
        <div className={styles.goalDetails}>
          <div className={styles.goalTitleRow}>
            <h2 className={styles.goalName}>{GOAL.name}</h2>
            <button className={styles.goalEditBtn} aria-label="Editar nombre del objetivo">
              <IconEdit size={18} />
            </button>
          </div>

          <div className={styles.progressGroup}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${GOAL.progressPercent}%` }}
                role="progressbar"
                aria-valuenow={GOAL.progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span className={styles.progressLabel}>{GOAL.progressPercent} %</span>
              </div>
              <div className={styles.progressEmpty} />
            </div>

            <div className={styles.progressMeta}>
              <span className={styles.metaItem}>
                <strong>Categoría del objetivo: </strong>
                {GOAL.category}
              </span>
              <span className={`${styles.metaItem} ${styles.metaRight}`}>
                <strong>Tiempo para lograrlo: </strong>
                {GOAL.timeToAchieve}
              </span>
            </div>
          </div>
        </div>

        {/* Right: target amount */}
        <div className={styles.targetAmount}>
          <p className={styles.targetLabel}>Monto objetivo:</p>
          <div className={styles.targetBox}>
            <span className={`${styles.targetValue} monetary`}>
              {formatCOPCompact(GOAL.targetAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
