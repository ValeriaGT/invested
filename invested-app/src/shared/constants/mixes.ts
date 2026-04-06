import type { Mix } from '../types'

export const MIXES: Mix[] = [
  {
    id: 'cauta',
    name: 'Cauta',
    riskLevel: 1,
    description: 'Máxima estabilidad. Ideal para horizontes cortos o perfiles muy conservadores.',
    funds: [
      { name: 'Renta Fija', percentage: 70, color: '#00C73D' },
      { name: 'Liquidez', percentage: 20, color: '#47E264' },
      { name: 'RV Nacional', percentage: 10, color: '#CAF9CB' },
    ],
  },
  {
    id: 'discreta',
    name: 'Discreta',
    riskLevel: 2,
    description: 'Bajo riesgo con un poco más de potencial de crecimiento.',
    funds: [
      { name: 'Renta Fija', percentage: 55, color: '#00C73D' },
      { name: 'Liquidez', percentage: 20, color: '#47E264' },
      { name: 'RV Nacional', percentage: 15, color: '#CAF9CB' },
      { name: 'RV Internacional', percentage: 10, color: '#5FED73' },
    ],
  },
  {
    id: 'paciente',
    name: 'Paciente',
    riskLevel: 3,
    description: 'Balance entre estabilidad y crecimiento para horizontes de mediano plazo.',
    funds: [
      { name: 'Renta Fija', percentage: 40, color: '#00C73D' },
      { name: 'RV Nacional', percentage: 25, color: '#CAF9CB' },
      { name: 'RV Internacional', percentage: 20, color: '#5FED73' },
      { name: 'Liquidez', percentage: 15, color: '#47E264' },
    ],
  },
  {
    id: 'dinamica',
    name: 'Dinámica',
    riskLevel: 4,
    description: 'Mayor potencial de crecimiento con tolerancia media al riesgo.',
    funds: [
      { name: 'RV Nacional', percentage: 30, color: '#CAF9CB' },
      { name: 'Renta Fija', percentage: 25, color: '#00C73D' },
      { name: 'RV Internacional', percentage: 25, color: '#5FED73' },
      { name: 'Liquidez', percentage: 10, color: '#47E264' },
      { name: 'Alternativo', percentage: 10, color: '#8FE000' },
    ],
  },
  {
    id: 'decidida',
    name: 'Decidida',
    riskLevel: 5,
    description: 'Alto potencial de crecimiento para quienes toleran la volatilidad.',
    funds: [
      { name: 'RV Internacional', percentage: 35, color: '#5FED73' },
      { name: 'RV Nacional', percentage: 30, color: '#CAF9CB' },
      { name: 'Alternativo', percentage: 20, color: '#8FE000' },
      { name: 'Renta Fija', percentage: 15, color: '#00C73D' },
    ],
  },
  {
    id: 'audaz',
    name: 'Audaz',
    riskLevel: 6,
    description:
      'Máximo potencial de crecimiento. Para inversores de largo plazo con alta tolerancia al riesgo.',
    funds: [
      { name: 'RV Internacional', percentage: 40, color: '#5FED73' },
      { name: 'RV Nacional', percentage: 30, color: '#CAF9CB' },
      { name: 'Alternativo', percentage: 20, color: '#8FE000' },
      { name: 'Renta Fija', percentage: 10, color: '#00C73D' },
    ],
  },
]

export const MIX_BY_ID = Object.fromEntries(MIXES.map((m) => [m.id, m])) as Record<string, Mix>
