import { useState, type ReactNode } from 'react'
import { Alert } from '@ds/components/Alert'
import { Badge, type BadgeVariant } from '@ds/components/Badge'
import { Button } from '@ds/components/Button'
import { Modal } from '@ds/components/Modal'
import { formatCOP } from '@shared/utils/format'
import { contractData, chartData, portfolioFunds } from '../../mockData'
import { movements, MOVEMENT_CHIP_STYLES, type MovementType } from '../MovimientosTab/movimientosMockData'
import { Breadcrumb } from '../Breadcrumb/Breadcrumb'
import { CompositionView } from '../ObjetivoTab/CompositionView'
import { DetallesTab } from '../DetallesTab/DetallesTab'
import { ReturnsChart } from '../ReturnsChart/ReturnsChart'
import { PortfolioTable } from '../PortfolioTable/PortfolioTable'
import { NivelSidebar, HitosSidebar, AprendeSidebar } from './GrowthSidebar'
import { IconChevronRight, IconCircleQuestion } from '../Icons'
import styles from './DetailNielsen.module.css'

// ─── Configuración ────────────────────────────────────────────────────────────
// Toggle: 'activo' | 'rebalanceando' | 'mercado_volatil'

type ContractStatus = 'activo' | 'rebalanceando' | 'mercado_volatil'
const CONTRACT_STATUS: ContractStatus = 'activo'

const GOAL = { name: 'Invertir en finca raíz 🏠', progressPercent: 50 }

const STATUS_BADGE: Record<ContractStatus, { label: string; variant: BadgeVariant }> = {
  activo:          { label: '● Activo',             variant: 'success' },
  rebalanceando:   { label: '⟳ Rebalanceando',      variant: 'warning' },
  mercado_volatil: { label: '⚠ Atención requerida', variant: 'info'    },
}

// Regla Nielsen 3: lenguaje del mundo real
const MOVEMENT_LABELS: Record<MovementType, string> = {
  'Retiro':                 'Retiro',
  'Aporte Único':           'Aporte único',
  'Aporte programado':      'Aporte programado',
  'Traslado':               'Traslado',
  'Devolución de comisión': 'Devolución de comisión',
  'Rebalanceo':             'Tu mezcla se ajustó automáticamente',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeDate(ddmmyyyy: string): string {
  const [d, m, y] = ddmmyyyy.split('/')
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000)
  if (days === 0) return 'hoy'
  if (days === 1) return 'ayer'
  if (days < 30) return `hace ${days} días`
  const months = Math.floor(days / 30)
  return months === 1 ? 'hace 1 mes' : `hace ${months} meses`
}

function formatAmount(value: number): string {
  const abs = formatCOP(Math.abs(value))
  return value < 0 ? `−${abs}` : `+${abs}`
}

const ANNUAL_RETURN_LABEL = `+${((contractData.returns / contractData.contributions) * 100).toFixed(1)}%`

// ─── Explainers — Regla Nielsen 4 ────────────────────────────────────────────

type ExplainerKey = 'rendimiento' | 'progreso' | 'mezcla' | 'rebalanceo'

const EXPLAINERS: Record<ExplainerKey, { title: string; body: string; highlight?: string }> = {
  rendimiento: {
    title: '¿Qué es el rendimiento del último año?',
    body: 'Es cuánto creció tu dinero en los últimos 12 meses. Si tienes $100 y el rendimiento es 8%, ganaste $8 sin hacer nada.',
    highlight: 'Un rendimiento positivo significa que tu dinero trabajó por ti.',
  },
  progreso: {
    title: '¿Qué es el progreso al objetivo?',
    body: 'Compara el saldo actual de tu contrato con la meta económica que definiste. Al 50% ya recorriste la mitad del camino.',
    highlight: 'Aportar regularmente es la forma más segura de llegar a la meta.',
  },
  mezcla: {
    title: '¿Qué es tu mezcla?',
    body: 'Es cómo está distribuido tu dinero entre distintos portafolios de inversión. Cada mezcla tiene un nivel de riesgo y una rentabilidad esperada diferente.',
    highlight: 'Perfil conservador: prioriza la estabilidad. Crece más lento pero con menor volatilidad.',
  },
  rebalanceo: {
    title: '¿Por qué se ajustó tu mezcla?',
    body: 'Cuando los mercados se mueven, la distribución de tu dinero puede desviarse del plan original. InvestED la reequilibra automáticamente para mantener tu perfil de riesgo.',
    highlight: 'No necesitas hacer nada — esto sucede en segundo plano y protege tu inversión.',
  },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HelpButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" className={styles.helpBtn} onClick={onClick} aria-label={label}>
      <IconCircleQuestion size={13} />
    </button>
  )
}

function ExplainerModal({ explainerKey, onClose }: { explainerKey: ExplainerKey | null; onClose: () => void }) {
  if (!explainerKey) return null
  const { title, body, highlight } = EXPLAINERS[explainerKey]
  return (
    <Modal open onClose={onClose} title={title}>
      <p className={styles.explainerText}>{body}</p>
      {highlight && <span className={styles.explainerHighlight}>{highlight}</span>}
    </Modal>
  )
}

// TODO: DS — Accordion component needed
function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.accordionItem}>
      <button
        type="button"
        className={styles.accordionTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.accordionTitle}>{title}</span>
        <IconChevronRight
          size={14}
          className={`${styles.accordionIcon} ${open ? styles.accordionIconOpen : ''}`}
        />
      </button>
      {open && <div className={styles.accordionContent}>{children}</div>}
    </div>
  )
}

function MovementRow({ type, date, netValue }: { type: MovementType; date: string; netValue: number }) {
  const chip = MOVEMENT_CHIP_STYLES[type]
  return (
    <div className={styles.movRow}>
      {/* TODO: DS-token — Chip/Tag component con variantes semánticas */}
      <span className={styles.movChip} style={{ backgroundColor: chip.bg, color: chip.color }}>
        {type}
      </span>
      <div className={styles.movInfo}>
        <span className={styles.movLabel}>{MOVEMENT_LABELS[type]}</span>
        <span className={styles.movDate}>{relativeDate(date)}</span>
      </div>
      {netValue !== 0 && (
        <span className={`${styles.movAmount} ${netValue < 0 ? styles.amountNeg : styles.amountPos}`}>
          {formatAmount(netValue)}
        </span>
      )}
    </div>
  )
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const BREADCRUMB_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'P. Voluntaria', href: '/voluntaria' },
  { label: `#${contractData.contractNumber}`, active: true },
]

const statusBadge = STATUS_BADGE[CONTRACT_STATUS]

// ─── Componente principal ─────────────────────────────────────────────────────

export function DetailNielsen() {
  const [explainer, setExplainer] = useState<ExplainerKey | null>(null)
  const [activeCrecerSubTab, setActiveCrecerSubTab] = useState<'miNivel' | 'misHitos' | 'aprende'>('miNivel')

  const lastMovement = movements[0]

  return (
    <div className={styles.page}>

      {/* ── Navegación ── */}
      <Breadcrumb items={BREADCRUMB_ITEMS} onBack={() => history.back()} />

      {/* Regla Nielsen 2: estado siempre visible cuando hay proceso en curso */}
      {CONTRACT_STATUS === 'rebalanceando' && (
        <Alert
          variant="warning"
          title="Estamos ajustando tu mezcla — esto toma hasta 24 horas"
          message={
            <p>
              Tu portafolio está siendo reequilibrado automáticamente para mantener tu perfil conservador.
              No necesitas hacer nada. El proceso estará listo hoy antes de las 8 pm.
            </p>
          }
        />
      )}

      {/*
        ══════════════════════════════════════════════════════════════════
        NIVEL 1 — Primer vistazo (above the fold)
        Izquierda: identidad del contrato. Derecha: dinero + acciones.
        ══════════════════════════════════════════════════════════════════
      */}
      <section className={styles.hero}>

        <div className={styles.heroLeft}>
          <Badge label={statusBadge.label} variant={statusBadge.variant} />
          <h1 className={styles.heroTitle}>{contractData.goalName}</h1>
          <p className={styles.heroSubtitle}>Contrato # {contractData.contractNumber}</p>
          <p className={styles.heroFundName}>{contractData.fundName}</p>
        </div>

        <div className={styles.heroRight}>
          <div>
            <p className={styles.heroAmountLabel}>Saldo total en tu contrato</p>
            <p className={`${styles.heroAmountValue} monetary`}>
              {formatCOP(contractData.totalAmount)}
            </p>
          </div>

          <div className={styles.heroStatRow}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatLabel}>
                Rendimiento del último año
                <HelpButton
                  onClick={() => setExplainer('rendimiento')}
                  label="¿Qué es el rendimiento del último año?"
                />
              </span>
              <span className={`${styles.heroStatValue} ${styles.heroStatValuePos}`}>
                {ANNUAL_RETURN_LABEL}
              </span>
            </div>

            <div className={styles.heroStatDivider} aria-hidden="true" />

            <div className={styles.heroStat}>
              <span className={styles.heroStatLabel}>
                Tu mezcla
                <HelpButton onClick={() => setExplainer('mezcla')} label="¿Qué es tu mezcla?" />
              </span>
              {/* Regla Nielsen 3: "Discreta" → "Discreta · Perfil conservador" */}
              <Badge label="Discreta · Perfil conservador" variant="success" />
            </div>
          </div>

          {/* Un solo CTA principal — Aportar lleno, Retirar ghost */}
          <div className={styles.heroActions}>
            <Button variant="Primary" size="Large" label="Aportar" />
            <Button variant="Secondary" size="Large" label="Retirar" />
          </div>
        </div>
      </section>

      {/*
        ══════════════════════════════════════════════════════════════════
        CONTENIDO — dos columnas: main + sidebar persistente
        Main: composición (nivel 2) + historial/rentabilidad/detalles (nivel 3)
        Sidebar: objetivo + movimiento + crecimiento (siempre visibles)
        ══════════════════════════════════════════════════════════════════
      */}
      <div className={styles.contentArea}>

        {/* ── Columna principal ── */}
        <div className={styles.contentMain}>

          {/* Nivel 2: Composición de la mezcla */}
          <div className={styles.compositionSection}>
            <p className={styles.sectionLabel}>Composición de tu mezcla</p>
            <CompositionView />
          </div>

          {/* Nivel 3: acordeones bajo demanda */}
          <div className={styles.level3}>
            <Accordion title="Historial de movimientos">
              <div className={styles.movList}>
                {movements.map((m) => (
                  <MovementRow key={m.id} type={m.type} date={m.date} netValue={m.netValue} />
                ))}
              </div>
            </Accordion>

            <Accordion title="Rentabilidad detallada">
              <div className={styles.chartWrap}>
                <ReturnsChart data={chartData} />
              </div>
              <PortfolioTable
                funds={portfolioFunds}
                prospectusUrl="https://www.skandia.co/portafolios-fondo-voluntario-de-pension-skandia"
              />
            </Accordion>

            <Accordion title="Detalles del contrato">
              <DetallesTab />
            </Accordion>
          </div>
        </div>

        {/* ── Sidebar derecho: contexto + crecimiento ── */}
        <aside className={styles.sidebar} aria-label="Contexto y crecimiento">

          {/* Objetivo + último movimiento */}
          <div className={styles.sideCard}>
            <div className={styles.sideBlock}>
              <div className={styles.sideBlockHead}>
                <p className={styles.sectionLabel}>Progreso al objetivo</p>
                <HelpButton
                  onClick={() => setExplainer('progreso')}
                  label="¿Qué significa el progreso al objetivo?"
                />
              </div>
              <div className={styles.objetivoRow}>
                <span className={styles.objetivoPct}>{GOAL.progressPercent}%</span>
                <span className={styles.objetivoName}>{GOAL.name}</span>
              </div>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuenow={GOAL.progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className={styles.progressFill} style={{ width: `${GOAL.progressPercent}%` }} />
              </div>
              <p className={styles.progressMeta}>{GOAL.progressPercent} de 100 puntos</p>
            </div>

            <div className={styles.sideBlockDivider} aria-hidden="true" />

            <div className={styles.sideBlock}>
              <p className={styles.sectionLabel}>Último movimiento</p>
              <div className={styles.lastMovRow}>
                <div className={styles.lastMovInfo}>
                  <span className={styles.lastMovType}>{MOVEMENT_LABELS[lastMovement.type]}</span>
                  <span className={styles.lastMovMeta}>{relativeDate(lastMovement.date)}</span>
                </div>
                {lastMovement.netValue !== 0 && (
                  <span
                    className={`${styles.lastMovAmount} ${
                      lastMovement.netValue < 0 ? styles.amountNeg : styles.amountPos
                    }`}
                  >
                    {formatAmount(lastMovement.netValue)}
                  </span>
                )}
              </div>
              {lastMovement.type === 'Rebalanceo' && (
                <button
                  type="button"
                  className={styles.contextLink}
                  onClick={() => setExplainer('rebalanceo')}
                >
                  ¿Por qué se ajustó tu mezcla? →
                </button>
              )}
            </div>
          </div>

          {/* Tu crecimiento — integrado en la columna lateral */}
          <div className={styles.growthCard}>
            <div className={styles.growthCardHead}>
              <p className={styles.growthTitle}>🌱 Tu crecimiento</p>
              <div className={styles.growthSubTabs} role="tablist" aria-label="Sección Tu crecimiento">
                {(
                  [
                    { id: 'miNivel',  label: 'Nivel'  },
                    { id: 'misHitos', label: 'Hitos' },
                    { id: 'aprende',  label: 'Aprende' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={activeCrecerSubTab === t.id}
                    className={`${styles.growthSubTab} ${activeCrecerSubTab === t.id ? styles.growthSubTabActive : ''}`}
                    onClick={() => setActiveCrecerSubTab(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.growthCardBody}>
              {activeCrecerSubTab === 'miNivel'  && <NivelSidebar />}
              {activeCrecerSubTab === 'misHitos' && <HitosSidebar />}
              {activeCrecerSubTab === 'aprende'  && <AprendeSidebar />}
            </div>
          </div>
        </aside>
      </div>

      {/* Modales explicativos — Regla Nielsen 4 */}
      <ExplainerModal explainerKey={explainer} onClose={() => setExplainer(null)} />
    </div>
  )
}
