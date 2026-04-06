import type { FPClient, RebalancingEvent } from '@shared/types'
import { apiClient } from './client'

export const fpApi = {
  getClients: (fpId: string) => apiClient.get<FPClient[]>(`/fp/${fpId}/clients`),

  getClientRebalancingHistory: (clientId: string) =>
    apiClient.get<RebalancingEvent[]>(`/fp/clients/${clientId}/rebalancing`),
}
