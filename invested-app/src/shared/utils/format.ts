/** Formatea un número como pesos colombianos (COP) */
export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Formatea un porcentaje con N decimales */
export function formatPercent(value: number, decimals = 1): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

/** Formatea una fecha ISO como "15 mar 2026" */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate))
}

/** Formatea una fecha ISO como "15 mar" (sin año) */
export function formatShortDate(isoDate: string): string {
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(isoDate))
}
