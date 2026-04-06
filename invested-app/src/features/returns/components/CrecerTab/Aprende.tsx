import { useState } from 'react'
import { useToast } from '@ds/components/Toast'
import { LearningDrawer } from '@/components/crecer/LearningDrawer'
import type { Slide } from '@/components/crecer/LearningDrawer'
import styles from './Aprende.module.css'

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
        title: '¿Por qué esa mezcla y no otra?',
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
        body: 'Un rebalanceo es el ajuste automático de tu mezcla de fondos para mantenerla alineada con tu perfil de riesgo y objetivo de inversión.',
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
        body: 'Tu perfil de riesgo define qué tan conservador o arriesgado puede ser tu portafolio. Invested lo tiene en cuenta para proteger y hacer crecer tu inversión.',
      },
    ],
  },
  {
    id: 'rentabilidad',
    emoji: '📈',
    title: 'Rentabilidad en contexto',
    available: false,
    lockedMsg: 'Disponible en nivel Observador',
    slides: [],
  },
  {
    id: 'fondos',
    emoji: '🧩',
    title: 'Los fondos de tu mezcla',
    available: false,
    lockedMsg: 'Disponible en nivel Observador',
    slides: [],
  },
]

export function Aprende() {
  const [openModuleId, setOpenModuleId] = useState<string | null>(null)
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const { show } = useToast()

  const openModule = MODULES.find((m) => m.id === openModuleId) ?? null

  function handleComplete() {
    if (!openModule) return
    setCompleted((prev) => new Set(prev).add(openModule.id))
    setOpenModuleId(null)
    show({
      kind: 'success',
      title: '🎉 ¡Hito desbloqueado!',
      message: openModule.title,
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.title}>Aprende sobre tu inversión</p>
        <p className={styles.subtitle}>Completa módulos y desbloquea hitos</p>
      </div>

      <div className={styles.moduleRow}>
        {MODULES.map((mod) => {
          const isCompleted = completed.has(mod.id)
          const isLocked = !mod.available
          const isClickable = mod.available && !isCompleted

          return (
            <button
              key={mod.id}
              className={[
                styles.moduleCard,
                isLocked ? styles.cardLocked : styles.cardAvailable,
                isCompleted ? styles.cardCompleted : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={isClickable ? () => setOpenModuleId(mod.id) : undefined}
              disabled={isLocked}
              aria-label={mod.title}
            >
              {/* Emoji box */}
              <div className={[
                styles.emojiBox,
                isLocked ? styles.emojiBoxLocked : '',
                isCompleted ? styles.emojiBoxCompleted : '',
              ].filter(Boolean).join(' ')}>
                <span>{mod.emoji}</span>
                {isCompleted && (
                  <span className={styles.overlayBadge} aria-label="Completado">✓</span>
                )}
                {isLocked && (
                  <span className={styles.overlayBadge} aria-label="Bloqueado">🔒</span>
                )}
              </div>

              {/* Title */}
              <p className={styles.moduleTitle}>{mod.title}</p>

              {/* Estado */}
              {isCompleted && (
                <span className={styles.statusBadge + ' ' + styles.statusCompleted}>
                  Completado ✓
                </span>
              )}
              {!isCompleted && !isLocked && (
                <span className={styles.statusBadge + ' ' + styles.statusAvailable}>
                  Disponible
                </span>
              )}
              {isLocked && (
                <>
                  <span className={styles.statusBadge + ' ' + styles.statusLocked}>
                    Bloqueado
                  </span>
                  <p className={styles.lockedMsg}>{mod.lockedMsg}</p>
                </>
              )}
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
