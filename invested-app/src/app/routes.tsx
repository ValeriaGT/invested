import { Route, Routes as RouterRoutes } from 'react-router-dom'
import { ContractDetailPage } from '@features/returns'

// Las rutas se poblarán a medida que se construyan los features
export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<ContractDetailPage />} />
      <Route path="/contrato/:contractNumber" element={<ContractDetailPage />} />
    </RouterRoutes>
  )
}
