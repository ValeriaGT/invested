export type MovementType =
  | 'Retiro'
  | 'Aporte Único'
  | 'Aporte programado'
  | 'Traslado'
  | 'Devolución de comisión'
  | 'Rebalanceo'

export interface Movement {
  id: string
  type: MovementType
  date: string
  grossValue: number
  netValue: number
}

export const MOVEMENT_CHIP_STYLES: Record<MovementType, { bg: string; color: string }> = {
  Retiro: { bg: '#fff5f4', color: '#de423e' },
  'Aporte Único': { bg: '#f6fcf2', color: '#00c73d' },
  'Aporte programado': { bg: '#f6fcf2', color: '#7dc400' },
  Traslado: { bg: '#ebf4ff', color: '#0099de' },
  'Devolución de comisión': { bg: '#f7f7f7', color: '#404040' },
  Rebalanceo: { bg: '#eef2ff', color: '#4f46e5' },
}

export const movements: Movement[] = [
  { id: '6', type: 'Rebalanceo', date: '15/03/2026', grossValue: 0, netValue: 0 },
  { id: '1', type: 'Retiro', date: '23/12/2025', grossValue: -15000000, netValue: -16045385.12 },
  {
    id: '2',
    type: 'Aporte Único',
    date: '23/11/2025',
    grossValue: -15000000,
    netValue: -16045385.12,
  },
  {
    id: '3',
    type: 'Aporte programado',
    date: '23/12/2025',
    grossValue: -5000000,
    netValue: -5437795.04,
  },
  { id: '4', type: 'Traslado', date: '23/11/2025', grossValue: 10000000, netValue: 9093500.0 },
  {
    id: '5',
    type: 'Devolución de comisión',
    date: '23/11/2025',
    grossValue: 10000000,
    netValue: 9093500.0,
  },
]
