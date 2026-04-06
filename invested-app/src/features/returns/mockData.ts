import type { ContractData, MonthlyChartEntry, PortfolioFund } from './types'

export const contractData: ContractData = {
  contractNumber: '43566743',
  goalName: '¡Dale un objetivo a tu dinero!',
  fundName: 'Fondo Voluntario de Pensión Skandia Multifund',
  totalAmount: 1352732191,
  contributions: 1253054979,
  returns: -99677212,
  evolutionDate: '29 septiembre',
  hasActionNeeded: true,
}

export const chartData: MonthlyChartEntry[] = [
  { month: 'Ene', contributions: 110000000, returns: 12000000, negativeReturns: 0 },
  { month: 'Feb', contributions: 105000000, returns: 9500000, negativeReturns: 0 },
  { month: 'Mar', contributions: 100000000, returns: 0, negativeReturns: -150000 },
  { month: 'Abr', contributions: 115000000, returns: 11000000, negativeReturns: 0 },
  { month: 'May', contributions: 108000000, returns: 8000000, negativeReturns: 0 },
  { month: 'Jun', contributions: 112000000, returns: 13500000, negativeReturns: 0 },
  { month: 'Jul', contributions: 120000000, returns: 18000000, negativeReturns: 0 },
  { month: 'Ago', contributions: 118000000, returns: 15000000, negativeReturns: 0 },
  { month: 'Sep', contributions: 116000000, returns: 10000000, negativeReturns: 0 },
  { month: 'Oct', contributions: 113000000, returns: 7500000, negativeReturns: 0 },
  { month: 'Nov', contributions: 109000000, returns: 6000000, negativeReturns: 0 },
  { month: 'Dic', contributions: 107000000, returns: 5000000, negativeReturns: 0 },
]

export const portfolioFunds: PortfolioFund[] = [
  { id: '1', name: 'FPV Especial Vista', riskProfile: 'prudente', return365: 10 },
  { id: '2', name: 'FPV Aventura Montañosa', riskProfile: 'observador', return365: 10 },
  { id: '3', name: 'FPV Ciudad Vibrante', riskProfile: 'arriesgado', return365: 10 },
  { id: '4', name: 'FPV Naturaleza Espléndida', riskProfile: 'arriesgado', return365: 10 },
  { id: '5', name: 'FPV Cielo Estrellado', riskProfile: 'prudente', return365: 10 },
  { id: '6', name: 'FPV Olas Susurrantes', riskProfile: 'observador', return365: 10 },
  { id: '7', name: 'FPV Sendero Secreto', riskProfile: 'prudente', return365: 10 },
  { id: '8', name: 'FPV Amanecer Dorado', riskProfile: 'prudente', return365: 10 },
  { id: '9', name: 'FPV Rincón Sereno', riskProfile: 'prudente', return365: 10 },
  { id: '10', name: 'FPV Viento del Norte', riskProfile: 'prudente', return365: 10 },
]
