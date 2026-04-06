import type { Portfolio, MixReturns, RebalancingEvent, Milestone, MixId } from '@shared/types'
import { apiClient } from './client'

export const portfolioApi = {
  getPortfolio: (clientId: string) => apiClient.get<Portfolio>(`/portfolio/${clientId}`),

  getReturns: (mixId: MixId) => apiClient.get<MixReturns>(`/returns/${mixId}`),

  getRebalancingHistory: (clientId: string) =>
    apiClient.get<RebalancingEvent[]>(`/portfolio/${clientId}/rebalancing`),

  getMilestones: (clientId: string) =>
    apiClient.get<Milestone[]>(`/portfolio/${clientId}/milestones`),

  activateInvested: (
    clientId: string,
    payload: { mixId: MixId; goalName: string; goalTargetAmount: number; goalTargetDate: string }
  ) => apiClient.post<{ success: boolean }>(`/portfolio/${clientId}/activate`, payload),

  updateGoal: (
    clientId: string,
    payload: { goalName: string; goalTargetAmount: number; goalTargetDate: string }
  ) => apiClient.patch<Portfolio>(`/portfolio/${clientId}/goal`, payload),
}
