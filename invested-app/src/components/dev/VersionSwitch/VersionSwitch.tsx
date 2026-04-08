import { useEffect, useState } from 'react'
import styles from './VersionSwitch.module.css'

export type DetailVersion = 'base' | 'nielsen' | 'nudges'

export const DETAIL_VERSION_KEY = 'invested_detail_version'
export const DETAIL_VERSION_EVENT = 'invested:version-change'

const VERSIONS: { id: DetailVersion; label: string }[] = [
  { id: 'base', label: 'Base' },
  { id: 'nielsen', label: 'V2' },
  { id: 'nudges', label: 'V3' },
]

function shouldRender(): boolean {
  if (import.meta.env.DEV) return true
  return new URLSearchParams(window.location.search).get('preview') === 'true'
}

export function readStoredVersion(): DetailVersion {
  const stored = localStorage.getItem(DETAIL_VERSION_KEY)
  if (stored === 'base' || stored === 'nielsen' || stored === 'nudges') return stored
  return 'base'
}

/** Escucha cambios del VersionSwitch dentro de la misma pestaña. */
export function useDetailVersion(): DetailVersion {
  const [version, setVersion] = useState<DetailVersion>(readStoredVersion)

  useEffect(() => {
    function handle(e: Event) {
      setVersion((e as CustomEvent<DetailVersion>).detail)
    }
    window.addEventListener(DETAIL_VERSION_EVENT, handle)
    return () => window.removeEventListener(DETAIL_VERSION_EVENT, handle)
  }, [])

  return version
}

export function VersionSwitch() {
  const [version, setVersion] = useState<DetailVersion>(readStoredVersion)

  if (!shouldRender()) return null

  function select(v: DetailVersion) {
    setVersion(v)
    localStorage.setItem(DETAIL_VERSION_KEY, v)
    window.dispatchEvent(new CustomEvent(DETAIL_VERSION_EVENT, { detail: v }))
  }

  return (
    <div className={styles.wrapper} role="group" aria-label="Vista de detalle del contrato">
      <span className={styles.label}>Vista</span>
      <div className={styles.track}>
        {VERSIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`${styles.option} ${version === id ? styles.active : ''}`}
            onClick={() => select(id)}
            aria-pressed={version === id}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
