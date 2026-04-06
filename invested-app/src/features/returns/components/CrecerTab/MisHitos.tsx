import { Card } from '@ds/components/Card'
import styles from './MisHitos.module.css'

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
      description: 'Completaste el módulo Entiende tu mezcla',
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
      title: 'Conoces tu perfil de riesgo',
      description: 'Completa el módulo Tu perfil de riesgo',
    },
    {
      emoji: '📈',
      title: 'Rentabilidad real vs nominal',
      description: 'Completa el módulo Rentabilidad en contexto',
    },
  ],
}

function HitoCard({ hito, unlocked }: { hito: Hito; unlocked: boolean }) {
  return (
    <Card
      padding="compact"
      className={unlocked ? styles.cardUnlocked : styles.cardPending}
    >
      <div className={styles.hitoRow}>
        <span className={styles.hitoEmoji} aria-hidden="true">{hito.emoji}</span>
        <div className={styles.hitoBody}>
          <p className={styles.hitoTitle}>{hito.title}</p>
          <p className={styles.hitoDescription}>{hito.description}</p>
          {hito.unlockedAt && (
            <p className={styles.hitoDate}>{hito.unlockedAt}</p>
          )}
        </div>
      </div>
    </Card>
  )
}

function HitosColumn({
  title,
  description,
  unlocked,
  pending,
}: {
  title: string
  description: string
  unlocked: Hito[]
  pending: Hito[]
}) {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <p className={styles.columnTitle}>{title}</p>
        <p className={styles.columnDescription}>{description}</p>
      </div>

      <div className={styles.hitosList}>
        {unlocked.map((h) => (
          <HitoCard key={h.title} hito={h} unlocked />
        ))}
        {pending.map((h) => (
          <HitoCard key={h.title} hito={h} unlocked={false} />
        ))}
      </div>
    </div>
  )
}

export function MisHitos() {
  const totalUnlocked =
    HITOS_PERMANENCIA.unlocked.length + HITOS_APRENDIZAJE.unlocked.length
  const totalHitos =
    HITOS_PERMANENCIA.unlocked.length +
    HITOS_PERMANENCIA.pending.length +
    HITOS_APRENDIZAJE.unlocked.length +
    HITOS_APRENDIZAJE.pending.length

  return (
    <div className={styles.container}>
      <p className={styles.header}>
        {totalUnlocked} de {totalHitos} hitos desbloqueados
      </p>

      <div className={styles.grid}>
        <HitosColumn
          title="Permanencia"
          description="Por mantenerte invertido"
          unlocked={HITOS_PERMANENCIA.unlocked}
          pending={HITOS_PERMANENCIA.pending}
        />
        <HitosColumn
          title="Aprendizaje"
          description="Por entender tu inversión"
          unlocked={HITOS_APRENDIZAJE.unlocked}
          pending={HITOS_APRENDIZAJE.pending}
        />
      </div>
    </div>
  )
}
