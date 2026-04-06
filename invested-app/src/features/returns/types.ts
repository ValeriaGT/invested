export type RiskProfile = 'prudente' | 'observador' | 'arriesgado'

export type ContractTab = 'desempeno' | 'objetivo' | 'movimientos' | 'detalles'

export type ReturnsSubTab = 'rendimientos' | 'composicion'

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

export interface ContractData {
  contractNumber: string
  goalName: string
  fundName: string
  totalAmount: number
  contributions: number
  returns: number
  evolutionDate: string
  hasActionNeeded: boolean
}

export interface PortfolioFund {
  id: string
  name: string
  riskProfile: RiskProfile
  return365: number
}

export interface MonthlyChartEntry {
  month: string
  contributions: number
  returns: number
  negativeReturns: number
}
