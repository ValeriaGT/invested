import { useState } from 'react'
import { movements, MOVEMENT_CHIP_STYLES, type Movement } from './movimientosMockData'
import { MovimientoDetalleDrawer } from './MovimientoDetalleDrawer'
import { IconFilter, IconChevronRight, IconChevronLeft } from '../Icons'
import styles from './MovimientosTab.module.css'

function formatValue(value: number): string {
  const formatted = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value))
  return value < 0 ? `$ -${formatted}` : `$ ${formatted}`
}

function MovementCard({ movement, onSelect }: { movement: Movement; onSelect: (m: Movement) => void }) {
  const chip = MOVEMENT_CHIP_STYLES[movement.type]

  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <span className={styles.chip} style={{ backgroundColor: chip.bg, color: chip.color }}>
          {movement.type}
        </span>
        <div className={styles.cardMeta}>
          <span className={styles.metaSeparator} aria-hidden="true" />
          <span className={styles.metaItem}>
            <strong className={styles.metaLabel}>Fecha efectiva</strong>
            <span className={styles.metaValue}>{movement.date}</span>
          </span>
          <span className={styles.metaDivider} aria-hidden="true" />
          <span className={styles.metaItem}>
            <strong className={styles.metaLabel}>Valor bruto</strong>
            <span className={`${styles.metaValue} monetary`}>
              {formatValue(movement.grossValue)}
            </span>
          </span>
        </div>
      </div>

      <div className={styles.cardRight}>
        <span className={styles.netLabel}>Valor neto</span>
        <div className={styles.netBadge}>
          <span className={`${styles.netValue} monetary`}>{formatValue(movement.netValue)}</span>
        </div>
        <button
          className={styles.chevronBtn}
          aria-label={`Ver detalle de ${movement.type}`}
          onClick={() => onSelect(movement)}
        >
          <IconChevronRight size={12} />
        </button>
      </div>
    </div>
  )
}

const TOTAL_PAGES = 6

export function MovimientosTab({ onNavigateToMiInvested }: { onNavigateToMiInvested?: () => void } = {}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null)

  const pageNumbers: (number | '...')[] = [1, 2, '...', TOTAL_PAGES]

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button className={styles.filterBtn}>
          <IconFilter />
          <span>Filtrar</span>
        </button>
      </div>

      <ul className={styles.list}>
        {movements.map((m) => (
          <li key={m.id}>
            <MovementCard movement={m} onSelect={setSelectedMovement} />
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        <button
          className={styles.pageArrow}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          <IconChevronLeft size={12} />
        </button>

        <div className={styles.pageNumbers}>
          {pageNumbers.map((page, i) => (
            <button
              key={i}
              className={`${styles.pageNum} ${page === currentPage ? styles.pageNumActive : ''}`}
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === '...'}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className={styles.pageArrow}
          onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
          disabled={currentPage === TOTAL_PAGES}
          aria-label="Página siguiente"
        >
          <IconChevronRight size={12} />
        </button>
      </div>

      <MovimientoDetalleDrawer
        movement={selectedMovement}
        isOpen={selectedMovement !== null}
        onClose={() => setSelectedMovement(null)}
        onNavigateToMiInvested={onNavigateToMiInvested}
      />
    </div>
  )
}
