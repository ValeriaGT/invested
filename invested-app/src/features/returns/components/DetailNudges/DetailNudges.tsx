import { useState } from 'react'
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from '@ds/components/Button'
import { Modal } from '@ds/components/Modal'
import { formatCOP } from '@shared/utils/format'
import { contractData, chartData, portfolioFunds } from '../../mockData'
import type { ContractTab, ReturnsSubTab } from '../../types'
import { Breadcrumb } from '../Breadcrumb/Breadcrumb'
import { ContractSummaryCards } from '../ContractSummaryCards/ContractSummaryCards'
import { TabNavigation } from '../TabNavigation/TabNavigation'
import { ReturnsChart } from '../ReturnsChart/ReturnsChart'
import { PortfolioTable } from '../PortfolioTable/PortfolioTable'
import { CompositionView } from '../ObjetivoTab/CompositionView'
import { ObjetivoTab } from '../ObjetivoTab/ObjetivoTab'
import { MovimientosTab } from '../MovimientosTab/MovimientosTab'
import { DetallesTab } from '../DetallesTab/DetallesTab'
import { MiNivel } from '../CrecerTab/MiNivel'
import { MisHitos } from '../CrecerTab/MisHitos'
import { Aprende } from '../CrecerTab/Aprende'
import { IconEdit } from '../Icons'
import { mockInvestorInput } from '@/hooks/useInvestorLevel'
import investedLogo from '../../../../assets/invested.svg'
import styles from './DetailNudges.module.css'

// ─── Configuración de estado de mercado ──────────────────────────────────────
// Cambiar a 'negative' para previsualizar Nudges 2 y 6.
type MarketState = 'positive' | 'negative'
const MARKET_STATE: MarketState = 'positive'

const NEGATIVE_SCENARIO = {
  marketDropPct: 3.2,
  mezclaDropPct: 1.8,
  protectionPct: 1.4,
  mezclaNombre: 'Discreta 📊',
}

// ─── Datos de objetivo ────────────────────────────────────────────────────────
const GOAL = { name: 'Invertir en finca raíz 🏠', progressPercent: 50 }

// ─────────────────────────────────────────────────────────────────────────────
// NUDGE 6: Anticipatory Regret — datos históricos de recuperación (mock ilustrativo)
// ─────────────────────────────────────────────────────────────────────────────
const RECOVERY_HISTORY = [
  { mes: 'Oct', valor: 100 },
  { mes: 'Nov', valor: 97.4 },
  { mes: 'Dic', valor: 95.8 },
  { mes: 'Ene', valor: 98.2 },
  { mes: 'Feb', valor: 101.6 },
  { mes: 'Mar', valor: 103.9 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMonthsActive(activationDate: Date): number {
  const now = new Date()
  return (
    (now.getFullYear() - activationDate.getFullYear()) * 12 +
    (now.getMonth() - activationDate.getMonth())
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NUDGE 4: Temporal Landmark — calcula días hasta el próximo hito relevante
// ─────────────────────────────────────────────────────────────────────────────
function getNextMilestone(
  activationDate: Date,
  monthsActive: number,
): { label: string; daysUntil: number } | null {
  if (monthsActive >= 12) return null
  const firstYear = new Date(
    activationDate.getFullYear() + 1,
    activationDate.getMonth(),
    activationDate.getDate(),
  )
  const daysUntil = Math.max(0, Math.ceil((firstYear.getTime() - Date.now()) / 86_400_000))
  return { label: 'primer año con Invested 🎯', daysUntil }
}

const ANNUAL_RETURN_PCT = (contractData.returns / contractData.contributions) * 100

// ─── Nudge components ─────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// NUDGE 6: Anticipatory Regret (Arrepentimiento anticipatorio)
// Intercepta la intención de retiro mostrando que la cartera se recuperó
// de caídas anteriores. Solo visible cuando MARKET_STATE = 'negative'.
// (Zeelenberg, 1999; Bell, 1982)
// ─────────────────────────────────────────────────────────────────────────────
function AnticipatoryRegretBanner() {
  return (
    <div className={styles.regretBanner} role="complementary" aria-label="Contexto histórico de mercado">
      <span className={styles.regretBannerIcon} aria-hidden="true">💡</span>
      <div className={styles.regretBannerBody}>
        <p className={styles.regretBannerTitle}>
          Retirar ahora significaría vender en el momento más bajo.
        </p>
        <p className={styles.regretBannerSub}>
          Tu mezcla se recuperó de las últimas 3 correcciones en menos de 5 meses. Así fue la más reciente →
        </p>
        <ResponsiveContainer width="100%" height={72}>
          <AreaChart data={RECOVERY_HISTORY} margin={{ top: 4, right: 4, left: -32, bottom: 0 }}>
            <defs>
              <linearGradient id="recoveryGradientV3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00c73d" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#00c73d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#a5a5a5', fontFamily: 'var(--font-family-body)' }} />
            <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
            <ReferenceLine y={100} stroke="#e9e9e9" strokeDasharray="3 3" />
            <Tooltip formatter={(v: number) => [`${v.toFixed(1)}`, 'Base 100']} contentStyle={{ fontSize: 10, borderRadius: 6, border: '1px solid #e9e9e9' }} />
            <Area type="monotone" dataKey="valor" stroke="#00c73d" strokeWidth={2} fill="url(#recoveryGradientV3)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NUDGE 1 (Commitment Device) + NUDGE 3 (Endowment Effect) + NUDGE 4 (Temporal Landmark)
// Tira horizontal sobre las tarjetas de resumen.
// Muestra los 3 nudges de forma compacta sin reemplazar el contenido de Base.
// ─────────────────────────────────────────────────────────────────────────────
function NudgeStrip({
  monthsActive,
  milestone,
}: {
  monthsActive: number
  milestone: { label: string; daysUntil: number } | null
}) {
  return (
    <div className={styles.nudgeStrip} aria-label="Contexto de tu inversión">
      {/*
        NUDGE 3: Endowment Effect — tiempo invertido como activo.
        Las personas valoran más lo que ya construyeron. (Thaler, 1980)
      */}
      <div className={styles.nudgeStripItem}>
        <span className={styles.nudgeStripIcon} aria-hidden="true">🌱</span>
        <span>
          Llevas <strong>{monthsActive} meses</strong> construyendo tu futuro financiero
        </span>
      </div>

      {/*
        NUDGE 1: Commitment Device — progreso hacia la meta como ancla.
        Mostrar el avance activa Commitment & Consistency. (Cialdini, 1984)
      */}
      <div className={styles.nudgeStripDivider} aria-hidden="true" />
      <div className={styles.nudgeStripItem}>
        <span className={styles.nudgeStripIcon} aria-hidden="true">🎯</span>
        <span>
          <strong>{GOAL.progressPercent}%</strong> del camino hacia tu meta "{GOAL.name}"
        </span>
      </div>

      {/*
        NUDGE 4: Temporal Landmark — hitos temporales activan motivación renovada.
        "The fresh start effect" (Dai et al., 2014)
      */}
      {milestone && (
        <>
          <div className={styles.nudgeStripDivider} aria-hidden="true" />
          <div className={styles.nudgeStripItem}>
            <span className={styles.nudgeStripIcon} aria-hidden="true">🗓</span>
            <span>
              En <strong>{milestone.daysUntil} días</strong> alcanzarás tu {milestone.label}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NUDGE 5: Social Proof — prueba social
// En incertidumbre, el comportamiento de pares es señal de acción correcta.
// Cambia de mensaje según el estado del mercado. (Cialdini, 1984)
// ─────────────────────────────────────────────────────────────────────────────
function SocialProofStrip({ marketState }: { marketState: MarketState }) {
  return (
    <div className={styles.socialProofStrip}>
      {marketState === 'positive' ? (
        <p className={styles.socialProofText}>
          🇨🇴 Más de 7.000 inversores en Colombia confían en Invested para su futuro financiero.
        </p>
      ) : (
        <p className={styles.socialProofTextCrisis}>
          📊 El 94% de los clientes Invested con tu perfil mantuvieron su mezcla durante la última corrección del mercado.
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NUDGE 2: Loss Aversion Reframe — en pestaña desempeño
// Reformula la caída como protección relativa, no pérdida absoluta.
// Solo visible cuando MARKET_STATE = 'negative'. (Tversky & Kahneman, 1981)
// ─────────────────────────────────────────────────────────────────────────────
function LossAversionBanner({ onViewDetail }: { onViewDetail: () => void }) {
  const { marketDropPct, mezclaDropPct, protectionPct, mezclaNombre } = NEGATIVE_SCENARIO
  return (
    <div className={styles.reframeCard} role="region" aria-label="Comparación con el mercado">
      <p className={styles.reframeHeadline}>
        El mercado bajó {marketDropPct}%, pero tu mezcla <strong>{mezclaNombre}</strong>{' '}
        bajó solo {mezclaDropPct}% — Invested te protegió {protectionPct}% frente a la caída.
      </p>
      <div className={styles.reframeStats}>
        <div className={styles.reframeStat}>
          <span className={styles.reframeStatLabel}>Mercado</span>
          <span className={`${styles.reframeStatValue} ${styles.reframeStatNeg}`}>−{marketDropPct}%</span>
        </div>
        <div className={styles.reframeStat}>
          <span className={styles.reframeStatLabel}>Tu mezcla</span>
          <span className={`${styles.reframeStatValue} ${styles.reframeStatNeg}`}>−{mezclaDropPct}%</span>
        </div>
        <div className={styles.reframeStat}>
          <span className={styles.reframeStatLabel}>Protección</span>
          <span className={`${styles.reframeStatValue} ${styles.reframeStatProtection}`}>+{protectionPct}%</span>
        </div>
      </div>
      <button type="button" className={styles.viewDetailLink} onClick={onViewDetail}>
        Ver detalle completo →
      </button>
    </div>
  )
}

function NegativeDetailModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { marketDropPct, mezclaDropPct, protectionPct } = NEGATIVE_SCENARIO
  const lossAmount = contractData.totalAmount * (mezclaDropPct / 100)
  return (
    <Modal open={open} onClose={onClose} title="Detalle del período">
      <div className={styles.modalDetailRow}>
        <span className={styles.modalDetailLabel}>Caída del mercado general</span>
        <span className={`${styles.modalDetailValue} ${styles.modalDetailValueNeg}`}>−{marketDropPct}%</span>
      </div>
      <div className={styles.modalDetailRow}>
        <span className={styles.modalDetailLabel}>Caída de tu mezcla</span>
        <span className={`${styles.modalDetailValue} ${styles.modalDetailValueNeg}`}>−{mezclaDropPct}%</span>
      </div>
      <div className={styles.modalDetailRow}>
        <span className={styles.modalDetailLabel}>Valor aproximado del ajuste</span>
        <span className={`${styles.modalDetailValue} ${styles.modalDetailValueNeg}`}>−{formatCOP(lossAmount)}</span>
      </div>
      <div className={styles.modalDetailRow}>
        <span className={styles.modalDetailLabel}>Protección vs. mercado</span>
        <span className={styles.modalDetailValue}>+{protectionPct}%</span>
      </div>
      <p className={styles.modalNote}>
        Las caídas temporales son parte normal de los mercados. Tu mezcla Discreta está diseñada
        para amortiguar este tipo de correcciones. El historial muestra recuperación promedio en 3–5 meses.
      </p>
    </Modal>
  )
}

// ─── Constantes ───────────────────────────────────────────────────────────────

const BREADCRUMB_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'P. Voluntaria', href: '/voluntaria' },
  { label: `#${contractData.contractNumber}`, active: true },
]

// ─── Componente principal ─────────────────────────────────────────────────────

export function DetailNudges() {
  // Estado de tabs (igual que Base)
  const [activeTab, setActiveTab] = useState<ContractTab>('desempeno')
  const [activeSubTab, setActiveSubTab] = useState<ReturnsSubTab>('rendimientos')
  const [activeCrecerSubTab, setActiveCrecerSubTab] = useState<'miNivel' | 'misHitos' | 'aprende'>('miNivel')

  // Estado de nudges
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  // Cálculos de nudges
  const monthsActive = getMonthsActive(mockInvestorInput.activationDate)
  const nextMilestone = getNextMilestone(mockInvestorInput.activationDate, monthsActive)

  return (
    <div className={styles.page}>

      {/* ── Header idéntico a Base ── */}
      <div className={styles.headerArea}>
        <Breadcrumb items={BREADCRUMB_ITEMS} onBack={() => history.back()} />
        <div className={styles.titleArea}>
          <div className={styles.titleRow}>
            <h1 className={styles.pageTitle}>{contractData.goalName}</h1>
            <button className={styles.editButton} aria-label="Editar objetivo">
              <IconEdit size={16} />
            </button>
          </div>
          <div className={styles.fundNameRow}>
            <p className={styles.fundName}>{contractData.fundName}</p>
            <span className={styles.fundNameSeparator} aria-hidden="true" />
            <img src={investedLogo} alt="InvestED" className={styles.fundLogo} />
          </div>
        </div>
      </div>

      {/*
        ─────────────────────────────────────────────────────────────────────
        NUDGE 6: Anticipatory Regret
        Se posiciona antes del contenido principal para interceptar la
        intención de retiro antes de que el usuario procese el saldo negativo.
        Solo visible cuando MARKET_STATE = 'negative'.
        ─────────────────────────────────────────────────────────────────────
      */}
      {MARKET_STATE === 'negative' && <AnticipatoryRegretBanner />}

      {/*
        ─────────────────────────────────────────────────────────────────────
        NUDGE 1 + 3 + 4: Tira de contexto sobre las tarjetas de resumen.
        Ancla al usuario en el progreso, el tiempo invertido y el próximo hito.
        ─────────────────────────────────────────────────────────────────────
      */}
      <NudgeStrip monthsActive={monthsActive} milestone={nextMilestone} />

      {/* ── Tarjetas de resumen (Base — sin modificar) ── */}
      <ContractSummaryCards
        data={contractData}
        onViewComposition={() => {
          setActiveTab('desempeno')
          setActiveSubTab('composicion')
        }}
      />

      {/*
        ─────────────────────────────────────────────────────────────────────
        NUDGE 5: Social Proof
        Mensaje sutil debajo de las tarjetas. Cambia según el estado del mercado.
        ─────────────────────────────────────────────────────────────────────
      */}
      <SocialProofStrip marketState={MARKET_STATE} />

      {/* ── Navegación por pestañas (Base — sin modificar) ── */}
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── Pestaña Desempeño ── */}
      {activeTab === 'desempeno' && (
        <div className={styles.desempenoContent}>

          {/*
            ───────────────────────────────────────────────────────────────
            NUDGE 2: Loss Aversion Reframe
            Aparece sobre los sub-tabs cuando el mercado está en caída.
            El número negativo queda disponible en el modal de detalle.
            ───────────────────────────────────────────────────────────────
          */}
          {MARKET_STATE === 'negative' && (
            <LossAversionBanner onViewDetail={() => setDetailModalOpen(true)} />
          )}

          <div className={styles.subTabsRow}>
            <div className={styles.subTabs} role="tablist" aria-label="Tipo de desempeño">
              <button
                role="tab"
                aria-selected={activeSubTab === 'rendimientos'}
                className={`${styles.subTab} ${activeSubTab === 'rendimientos' ? styles.subTabActive : ''}`}
                onClick={() => setActiveSubTab('rendimientos')}
              >
                {/*
                  NUDGE 2: cuando el período es positivo el label es normal.
                  Cuando es negativo el panel LossAversionBanner ya contextualiza
                  la caída; el sub-tab mantiene su nombre para no suprimir info.
                */}
                {MARKET_STATE === 'positive'
                  ? `Rendimientos (+${ANNUAL_RETURN_PCT.toFixed(1)}%)`
                  : 'Rendimientos'}
              </button>
              <button
                role="tab"
                aria-selected={activeSubTab === 'composicion'}
                className={`${styles.subTab} ${activeSubTab === 'composicion' ? styles.subTabActive : ''}`}
                onClick={() => setActiveSubTab('composicion')}
              >
                Composición
              </button>
            </div>
            <Button variant="Secondary" size="Small" label="Gestionar Portafolios" onClick={() => {}} />
          </div>

          {activeSubTab === 'rendimientos' && (
            <div className={styles.chartsRow}>
              <div className={styles.chartPanel}>
                <ReturnsChart data={chartData} />
              </div>
              <div className={styles.tablePanel}>
                <PortfolioTable
                  funds={portfolioFunds}
                  prospectusUrl="https://www.skandia.co/portafolios-fondo-voluntario-de-pension-skandia"
                />
              </div>
            </div>
          )}

          {activeSubTab === 'composicion' && <CompositionView />}
        </div>
      )}

      {/* ── Pestaña Objetivo (Base — sin modificar) ── */}
      {activeTab === 'objetivo' && (
        <ObjetivoTab
          onNavigateToCrecer={() => {
            setActiveTab('crecer')
            setActiveCrecerSubTab('miNivel')
          }}
        />
      )}

      {/* ── Pestaña Mi InvestED (Base — sin modificar) ── */}
      {activeTab === 'crecer' && (
        <div className={styles.crecerContent}>
          <div className={styles.subTabsRow}>
            <div className={styles.subTabs} role="tablist" aria-label="Sección Mi InvestED">
              {(
                [
                  { id: 'miNivel', label: 'Mi Nivel' },
                  { id: 'misHitos', label: 'Mis Hitos' },
                  { id: 'aprende', label: 'Aprende' },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={activeCrecerSubTab === t.id}
                  className={`${styles.subTab} ${activeCrecerSubTab === t.id ? styles.subTabActive : ''}`}
                  onClick={() => setActiveCrecerSubTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          {activeCrecerSubTab === 'miNivel' && <MiNivel />}
          {activeCrecerSubTab === 'misHitos' && (
            <MisHitos onGoToObjetivo={() => setActiveTab('objetivo')} />
          )}
          {activeCrecerSubTab === 'aprende' && <Aprende />}
        </div>
      )}

      {/* ── Pestaña Movimientos (Base — sin modificar) ── */}
      {activeTab === 'movimientos' && (
        <MovimientosTab
          onNavigateToMiInvested={() => {
            setActiveTab('crecer')
            setActiveCrecerSubTab('aprende')
          }}
        />
      )}

      {/* ── Pestaña Detalles (Base — sin modificar) ── */}
      {activeTab === 'detalles' && <DetallesTab />}

      {/* Modal de detalle real — Nudge 2 */}
      <NegativeDetailModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)} />
    </div>
  )
}
