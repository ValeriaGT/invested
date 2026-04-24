/**
 * GrowthSidebar — versiones compactas de MiNivel, MisHitos y Aprende
 * diseñadas para el sidebar de 340px de DetailNielsen (V2).
 *
 * Los componentes originales usan grids horizontales pensados para
 * una vista de pantalla completa. Estas versiones usan listas de una
 * sola columna para eliminar el scroll lateral y reducir el scroll vertical.
 */

import { useState } from 'react'
import { Badge } from '@ds/components/Badge'
import { useToast } from '@ds/components/Toast'
import { LearningDrawer } from '@/components/crecer/LearningDrawer'
import type { Slide } from '@/components/crecer/LearningDrawer'
import { useInvestorLevel, mockInvestorInput } from '@/hooks/useInvestorLevel'
import styles from './GrowthSidebar.module.css'

// ══════════════════════════════════════════════════════════════════════════════
// MI NIVEL
// ══════════════════════════════════════════════════════════════════════════════

export function NivelSidebar() {
  const {
    currentLevel,
    currentLevelLabel,
    currentLevelEmoji,
    unlockedMixes,
    nextLevel,
    nextLevelEmoji,
    progressToNext,
  } = useInvestorLevel(mockInvestorInput)

  const monthsPct =
    progressToNext.monthsRequired > 0
      ? Math.min(100, (progressToNext.monthsCompleted / progressToNext.monthsRequired) * 100)
      : 100
  const milestonesPct =
    progressToNext.milestonesRequired > 0
      ? Math.min(100, (progressToNext.milestonesCompleted / progressToNext.milestonesRequired) * 100)
      : 100
  const monthsRemaining = Math.max(0, progressToNext.monthsRequired - progressToNext.monthsCompleted)
  const milestonesRemaining = Math.max(0, progressToNext.milestonesRequired - progressToNext.milestonesCompleted)

  return (
    <div className={styles.container}>

      {/* Nivel actual */}
      <div className={styles.nivelRow}>
        <Badge label={`${currentLevelEmoji} ${currentLevelLabel}`} variant="success" />
        <span className={styles.hint}>Tu nivel como inversionista</span>
      </div>

      {/* Mezclas desbloqueadas */}
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Mezclas disponibles</p>
        <div className={styles.mixChips}>
          {unlockedMixes.map((mix) => (
            <Badge key={mix} label={mix} variant="success" />
          ))}
        </div>
      </div>

      {/* Progreso al siguiente nivel */}
      {nextLevel ? (
        <div className={styles.section}>
          <p className={styles.sectionLabel}>Hacia {nextLevel} {nextLevelEmoji}</p>

          <div className={styles.progressGroup}>
            <div className={styles.progressLabelRow}>
              <span className={styles.progressLabel}>Tiempo activo</span>
              <span className={styles.progressCount}>
                {progressToNext.monthsCompleted}/{progressToNext.monthsRequired} meses
              </span>
            </div>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuenow={monthsPct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className={styles.progressFill} style={{ width: `${monthsPct}%` }} />
            </div>
            {monthsRemaining > 0 && (
              <span className={styles.hint}>Faltan {monthsRemaining} meses</span>
            )}
          </div>

          <div className={styles.progressGroup}>
            <div className={styles.progressLabelRow}>
              <span className={styles.progressLabel}>Hitos de aprendizaje</span>
              <span className={styles.progressCount}>
                {progressToNext.milestonesCompleted}/{progressToNext.milestonesRequired}
              </span>
            </div>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuenow={milestonesPct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className={styles.progressFill} style={{ width: `${milestonesPct}%` }} />
            </div>
            {milestonesRemaining > 0 && (
              <span className={styles.hint}>Faltan {milestonesRemaining} hitos</span>
            )}
          </div>
        </div>
      ) : (
        <p className={styles.maxLevel}>🏆 ¡Nivel máximo alcanzado!</p>
      )}

      {currentLevel === 'principiante' && (
        <div className={styles.infoNote}>
          Al subir de nivel desbloqueas mezclas más dinámicas que puedes explorar desde la pestaña Objetivo.
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MIS HITOS
// ══════════════════════════════════════════════════════════════════════════════

interface Hito {
  emoji: string
  title: string
  description: string
  unlockedAt?: string
}

const HITOS_PERMANENCIA: { unlocked: Hito[]; pending: Hito[] } = {
  unlocked: [
    {
      emoji: '🟢',
      title: 'Primer mes activo',
      description: 'Llevas más de 30 días con Invested',
      unlockedAt: '15 mar 2026',
    },
    {
      emoji: '🔵',
      title: 'Primer rebalanceo vivido',
      description: 'Viviste tu primer rebalanceo sin retirar',
      unlockedAt: '22 mar 2026',
    },
  ],
  pending: [
    {
      emoji: '🟠',
      title: 'Superar una caída',
      description: 'Mantente durante una caída mayor al 5%',
    },
  ],
}

const HITOS_APRENDIZAJE: { unlocked: Hito[]; pending: Hito[] } = {
  unlocked: [
    {
      emoji: '📊',
      title: 'Entendiste tu mezcla',
      description: 'Completaste Entiende tu mezcla',
      unlockedAt: '18 mar 2026',
    },
  ],
  pending: [
    {
      emoji: '🔄',
      title: 'Entendiste un rebalanceo',
      description: 'Lee el ¿Por qué? de 3 movimientos',
    },
    {
      emoji: '🛡️',
      title: 'Conoces tu perfil',
      description: 'Completa Tu perfil de riesgo',
    },
    {
      emoji: '📈',
      title: 'Rentabilidad real vs nominal',
      description: 'Nivel Observador requerido',
    },
  ],
}

function HitoRow({ hito, unlocked }: { hito: Hito; unlocked: boolean }) {
  return (
    <div className={`${styles.hitoRow} ${unlocked ? '' : styles.hitoRowPending}`}>
      <span className={styles.hitoEmoji} aria-hidden="true">{hito.emoji}</span>
      <div className={styles.hitoBody}>
        <span className={styles.hitoTitle}>{hito.title}</span>
        {unlocked && hito.unlockedAt ? (
          <span className={styles.hitoDate}>{hito.unlockedAt}</span>
        ) : (
          <span className={styles.hitoHint}>{hito.description}</span>
        )}
      </div>
      {unlocked && (
        <span className={styles.hitoCheck} aria-label="Desbloqueado">✓</span>
      )}
    </div>
  )
}

export function HitosSidebar() {
  const totalUnlocked =
    HITOS_PERMANENCIA.unlocked.length + HITOS_APRENDIZAJE.unlocked.length
  const totalHitos =
    HITOS_PERMANENCIA.unlocked.length +
    HITOS_PERMANENCIA.pending.length +
    HITOS_APRENDIZAJE.unlocked.length +
    HITOS_APRENDIZAJE.pending.length

  return (
    <div className={styles.container}>
      <p className={styles.hitosCounter}>
        <strong>{totalUnlocked}</strong> de {totalHitos} hitos desbloqueados
      </p>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Permanencia</p>
        {[
          ...HITOS_PERMANENCIA.unlocked.map((h) => ({ hito: h, unlocked: true })),
          ...HITOS_PERMANENCIA.pending.map((h) => ({ hito: h, unlocked: false })),
        ].map(({ hito, unlocked }) => (
          <HitoRow key={hito.title} hito={hito} unlocked={unlocked} />
        ))}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Aprendizaje</p>
        {[
          ...HITOS_APRENDIZAJE.unlocked.map((h) => ({ hito: h, unlocked: true })),
          ...HITOS_APRENDIZAJE.pending.map((h) => ({ hito: h, unlocked: false })),
        ].map(({ hito, unlocked }) => (
          <HitoRow key={hito.title} hito={hito} unlocked={unlocked} />
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// APRENDE
// ══════════════════════════════════════════════════════════════════════════════

interface Module {
  id: string
  emoji: string
  title: string
  available: boolean
  lockedMsg?: string
  slides: Slide[]
}

const MODULES: Module[] = [
  {
    id: 'mezcla',
    emoji: '📊',
    title: 'Entiende tu mezcla',
    available: true,
    slides: [
      {
        emoji: '📊',
        title: '¿Qué es tu mezcla?',
        body: 'Tu mezcla es la combinación de fondos en los que está invertido tu dinero. Invested la elige según tu perfil y la ajusta automáticamente.',
      },
      {
        emoji: '🎯',
        title: '¿Por qué esa mezcla?',
        body: 'Basándose en tu objetivo, horizonte de tiempo y tolerancia al riesgo, Invested seleccionó la mezcla que mejor protege y hace crecer tu dinero.',
      },
      {
        emoji: '✅',
        title: 'Tú no tienes que hacer nada',
        body: 'Invested monitorea y rebalancea tu mezcla automáticamente. Solo enfócate en tu objetivo.',
      },
    ],
  },
  {
    id: 'rebalanceo',
    emoji: '🔄',
    title: 'Qué es un rebalanceo',
    available: true,
    slides: [
      {
        emoji: '🔄',
        title: '¿Qué es un rebalanceo?',
        body: 'Un rebalanceo es el ajuste automático de tu mezcla para mantenerla alineada con tu perfil de riesgo.',
      },
    ],
  },
  {
    id: 'perfil',
    emoji: '🛡️',
    title: 'Tu perfil de riesgo',
    available: true,
    slides: [
      {
        emoji: '🛡️',
        title: 'Tu perfil de riesgo',
        body: 'Tu perfil define qué tan conservador o arriesgado puede ser tu portafolio. Invested lo considera para proteger tu inversión.',
      },
    ],
  },
  {
    id: 'rentabilidad',
    emoji: '📈',
    title: 'Rentabilidad en contexto',
    available: false,
    lockedMsg: 'Nivel Observador',
    slides: [],
  },
  {
    id: 'fondos',
    emoji: '🧩',
    title: 'Los fondos de tu mezcla',
    available: false,
    lockedMsg: 'Nivel Observador',
    slides: [],
  },
]

export function AprendeSidebar({ onModuleComplete }: { onModuleComplete?: () => void } = {}) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(null)
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const { show } = useToast()

  const openModule = MODULES.find((m) => m.id === openModuleId) ?? null

  function handleComplete() {
    if (!openModule) return
    setCompleted((prev) => new Set(prev).add(openModule.id))
    setOpenModuleId(null)
    show({ kind: 'success', title: '🎉 ¡Hito desbloqueado!', message: openModule.title })
    onModuleComplete?.()
  }

  return (
    <div className={styles.container}>
      <p className={styles.hint}>Completa módulos para desbloquear hitos de aprendizaje</p>

      <div className={styles.moduleList}>
        {MODULES.map((mod) => {
          const isCompleted = completed.has(mod.id)
          const isLocked = !mod.available
          const isClickable = mod.available && !isCompleted

          return (
            <button
              key={mod.id}
              type="button"
              disabled={isLocked}
              onClick={isClickable ? () => setOpenModuleId(mod.id) : undefined}
              className={[
                styles.moduleRow,
                isLocked    ? styles.moduleRowLocked    : '',
                isCompleted ? styles.moduleRowCompleted : '',
              ].filter(Boolean).join(' ')}
            >
              <div className={`${styles.moduleIcon} ${isLocked ? styles.moduleIconLocked : isCompleted ? styles.moduleIconDone : ''}`}>
                <span aria-hidden="true">{isLocked ? '🔒' : mod.emoji}</span>
              </div>
              <div className={styles.moduleInfo}>
                <span className={styles.moduleTitle}>{mod.title}</span>
                {isCompleted && (
                  <span className={`${styles.moduleMeta} ${styles.metaDone}`}>Completado ✓</span>
                )}
                {!isCompleted && !isLocked && (
                  <span className={`${styles.moduleMeta} ${styles.metaAvailable}`}>Disponible →</span>
                )}
                {isLocked && (
                  <span className={`${styles.moduleMeta} ${styles.metaLocked}`}>{mod.lockedMsg}</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <LearningDrawer
        isOpen={openModuleId !== null}
        onClose={() => setOpenModuleId(null)}
        onComplete={handleComplete}
        moduleName={openModule?.title ?? ''}
        slides={openModule?.slides ?? []}
      />
    </div>
  )
}
