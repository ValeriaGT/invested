import type { RiskProfile } from '../../types'

export interface CompositionFund {
  id: string
  name: string
  participation: number
  balance: number
  color: string
  riskProfile: RiskProfile
}

export const compositionFunds: CompositionFund[] = [
  {
    id: '1',
    name: 'FPV Especial Vista',
    participation: 31.8,
    balance: 2454565,
    color: '#a1dd70',
    riskProfile: 'prudente',
  },
  {
    id: '2',
    name: 'FPV Aventura Montañosa',
    participation: 35.0,
    balance: 3678910,
    color: '#ff9460',
    riskProfile: 'observador',
  },
  {
    id: '3',
    name: 'FPV Ciudad Vibrante',
    participation: 38.25,
    balance: 4123456,
    color: '#f67e7d',
    riskProfile: 'arriesgado',
  },
  {
    id: '4',
    name: 'FPV Naturaleza Espléndida',
    participation: 41.5,
    balance: 5789012,
    color: '#63aabc',
    riskProfile: 'arriesgado',
  },
  {
    id: '5',
    name: 'FPV Cielo Estrellado',
    participation: 12.54,
    balance: 6345678,
    color: '#95dbb7',
    riskProfile: 'prudente',
  },
  {
    id: '6',
    name: 'FPV Olas Susurrantes',
    participation: 15.75,
    balance: 7890123,
    color: '#de423e',
    riskProfile: 'observador',
  },
  {
    id: '7',
    name: 'FPV Sendero Secreto',
    participation: 18.9,
    balance: 8456789,
    color: '#a1dd70',
    riskProfile: 'prudente',
  },
  {
    id: '8',
    name: 'FPV Amanecer Dorado',
    participation: 21.6,
    balance: 9012345,
    color: '#a1dd70',
    riskProfile: 'prudente',
  },
  {
    id: '9',
    name: 'FPV Rincón Sereno',
    participation: 25.3,
    balance: 10234567,
    color: '#a1dd70',
    riskProfile: 'prudente',
  },
  {
    id: '10',
    name: 'FPV Viento del Norte',
    participation: 28.45,
    balance: 11456789,
    color: '#a1dd70',
    riskProfile: 'prudente',
  },
]
