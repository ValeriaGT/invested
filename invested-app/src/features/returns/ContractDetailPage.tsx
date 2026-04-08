import { useDetailVersion } from '@/components/dev/VersionSwitch'
import { DetailBase } from './components/DetailBase/DetailBase'
import { DetailNielsen } from './components/DetailNielsen/DetailNielsen'
import { DetailNudges } from './components/DetailNudges/DetailNudges'

const VIEWS = {
  base: DetailBase,
  nielsen: DetailNielsen,
  nudges: DetailNudges,
}

export function ContractDetailPage() {
  const version = useDetailVersion()
  const View = VIEWS[version]
  // key={version} fuerza remount limpio al cambiar — sin animación, comparación directa
  return <View key={version} />
}
