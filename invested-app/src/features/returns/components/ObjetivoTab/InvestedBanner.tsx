import styles from './InvestedBanner.module.css'

export function InvestedBanner() {
  return (
    <div className={styles.banner}>
      <div className={styles.illustration} aria-hidden="true">
        <svg width="142" height="116" viewBox="0 0 142 116" fill="none">
          {/* Simplified invest-ed illustration */}
          <rect x="10" y="30" width="60" height="70" rx="8" fill="#00C73D" fillOpacity="0.15" />
          <rect x="20" y="20" width="60" height="70" rx="8" fill="#8FE000" fillOpacity="0.2" />
          <rect x="30" y="10" width="80" height="90" rx="8" fill="#fff" stroke="#E9E9E9" />
          <rect x="42" y="28" width="56" height="6" rx="3" fill="#00C73D" />
          <rect x="42" y="42" width="40" height="4" rx="2" fill="#E9E9E9" />
          <rect x="42" y="52" width="48" height="4" rx="2" fill="#E9E9E9" />
          <rect x="42" y="62" width="36" height="4" rx="2" fill="#E9E9E9" />
          <circle cx="112" cy="30" r="18" fill="#00C73D" fillOpacity="0.2" />
          <path
            d="M104 30L110 36L120 24"
            stroke="#00C73D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="90" r="12" fill="#8FE000" fillOpacity="0.3" />
          <circle cx="130" cy="80" r="8" fill="#0099DE" fillOpacity="0.2" />
        </svg>
      </div>

      <div className={styles.textContent}>
        <h3 className={styles.title}>Automatiza tus inversiones con Invest-ed</h3>
        <p className={styles.body}>
          Configura aportes periódicos automáticos y deja que tu dinero trabaje por ti sin que
          tengas que hacer nada.
        </p>
      </div>

      <button className={styles.cta}>Hazlo ahora</button>
    </div>
  )
}
