// ─── Mezclas / Perfiles ───────────────────────────────────────────────────────

export type MixId = 'cauta' | 'discreta' | 'paciente' | 'dinamica' | 'decidida' | 'audaz'

export interface FundAllocation {
  name: string
  percentage: number
  color: string
}

export interface Mix {
  id: MixId
  name: string
  riskLevel: 1 | 2 | 3 | 4 | 5 | 6
  description: string
  funds: FundAllocation[]
}

// ─── Rentabilidades ──────────────────────────────────────────────────────────

export interface ReturnDataPoint {
  date: string // ISO 8601
  value: number // porcentaje
}

export interface MixReturns {
  mixId: MixId
  currentEA: number
  cdt: number
  inflation: number
  realReturn: number // currentEA - inflation
  historicalRange: { min: number; max: number }
  returns1y: number
  returns3y: number
  returns5y: number
  historicalData: ReturnDataPoint[]
}

// ─── Portafolio del cliente ──────────────────────────────────────────────────

export interface Portfolio {
  clientId: string
  activeMix: MixId
  totalValue: number
  totalGainSinceStart: number
  activeSince: string // ISO 8601
  goalName: string
  goalTargetAmount: number
  goalTargetDate: string // ISO 8601
  goalProgressPercent: number
}

// ─── Rebalanceos ─────────────────────────────────────────────────────────────

export interface RebalancingEvent {
  id: string
  date: string // ISO 8601
  reason: string // contexto de mercado
  fromAllocation: FundAllocation[]
  toAllocation: FundAllocation[]
  marketContext: string
  protectionExplanation: string
}

// ─── Hitos y gamificación ───────────────────────────────────────────────────

export type MilestoneId =
  | 'first_month'
  | 'first_year'
  | 'first_rebalancing_survived'
  | 'three_periodic_contributions'
  | 'first_market_drop_survived'

export interface Milestone {
  id: MilestoneId
  title: string
  description: string
  achieved: boolean
  achievedAt?: string // ISO 8601
}

// ─── Financial Planner ──────────────────────────────────────────────────────

export interface FPClient {
  clientId: string
  name: string
  activeMix: MixId
  lastRebalancing?: RebalancingEvent
  lastCommunicationSentAt?: string
  goalProgressPercent: number
  deactivationStartedAt?: string
}
