import { Badge } from '@ds/components/Badge'
import { useInvestorLevel, mockInvestorInput } from '@/hooks/useInvestorLevel'
import styles from './MiNivel.module.css'

export function MiNivel() {
  const {
    currentLevel,
    currentLevelLabel,
    currentLevelEmoji,
    unlockedMixes,
    nextLevel,
    nextLevelEmoji,
    progressToNext,
  } = useInvestorLevel(mockInvestorInput)

  const monthsRemaining = Math.max(
    0,
    progressToNext.monthsRequired - progressToNext.monthsCompleted,
  )
  const milestonesRemaining = Math.max(
    0,
    progressToNext.milestonesRequired - progressToNext.milestonesCompleted,
  )
  const monthsPct =
    progressToNext.monthsRequired > 0
      ? Math.min(100, (progressToNext.monthsCompleted / progressToNext.monthsRequired) * 100)
      : 100
  const milestonesPct =
    progressToNext.milestonesRequired > 0
      ? Math.min(
          100,
          (progressToNext.milestonesCompleted / progressToNext.milestonesRequired) * 100,
        )
      : 100

  return (
    <div className={styles.container}>
      <div className={styles.grid}>

        {/* ── Columna izquierda ── */}
        <div className={styles.left}>
          <div className={styles.levelBadge}>
            <Badge label={`${currentLevelEmoji} ${currentLevelLabel}`} variant="success" />
          </div>
          <p className={styles.muted}>Tu nivel actual como inversionista</p>

          <p className={styles.mixesLabel}>Mezclas desbloqueadas:</p>
          <div className={styles.mixList}>
            {unlockedMixes.map((mix) => (
              <Badge key={mix} label={mix} variant="success" />
            ))}
          </div>
          <p className={styles.mutedSm}>Mezclas disponibles para tu nivel</p>
        </div>

        {/* ── Columna derecha ── */}
        <div className={styles.right}>
          {nextLevel ? (
            <>
              <p className={styles.progressTitle}>
                Progreso hacia {nextLevel} {nextLevelEmoji}
              </p>

              <div className={styles.progressGroup}>
                <span className={styles.progressLabel}>Tiempo activo</span>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={monthsPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: `${monthsPct}%` }}
                  />
                </div>
                <span className={styles.progressMeta}>
                  {progressToNext.monthsCompleted} meses activo · faltan {monthsRemaining} meses
                </span>
              </div>

              <div className={styles.progressGroup}>
                <span className={styles.progressLabel}>Hitos de aprendizaje</span>
                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-valuenow={milestonesPct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={styles.progressFill}
                    style={{ width: `${milestonesPct}%` }}
                  />
                </div>
                <span className={styles.progressMeta}>
                  {progressToNext.milestonesCompleted} completados · faltan {milestonesRemaining} hitos
                </span>
              </div>

              <p className={styles.muted}>Cuando completes los requisitos te avisaremos</p>
            </>
          ) : (
            <p className={styles.progressTitle}>¡Ya alcanzaste el nivel máximo!</p>
          )}
        </div>
      </div>

      {/* ── Sección inferior — solo principiante ── */}
      {currentLevel === 'principiante' && (
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>¿Qué pasa cuando subas de nivel?</p>
          <ul className={styles.infoList}>
            <li>🔓 Accedes a mezclas más dinámicas</li>
            <li>🎯 Aparecen en tu tab Objetivo para explorarlas</li>
          </ul>
          <p className={styles.muted}>
            Las nuevas mezclas no se activan automáticamente — tú decides si quieres explorar un cambio
          </p>
        </div>
      )}
    </div>
  )
}
