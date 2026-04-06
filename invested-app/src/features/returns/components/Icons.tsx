/**
 * Icon components using Font Awesome 6 Free (Skandia DS standard).
 * fa-regular for default states, fa-solid for active/emphasis.
 * All decorative icons use aria-hidden="true".
 * Interactive icon-only buttons must supply aria-label on the button.
 */

interface IconProps {
  size?: number
  className?: string
}

function faIcon(classes: string, size?: number, className?: string) {
  return (
    <i
      className={[classes, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      style={size ? { fontSize: size } : undefined}
    />
  )
}

export function IconShield({ size, className }: IconProps) {
  return faIcon('fa-solid fa-shield', size, className)
}

export function IconScale({ size, className }: IconProps) {
  return faIcon('fa-solid fa-scale-balanced', size, className)
}

export function IconBolt({ size, className }: IconProps) {
  return faIcon('fa-solid fa-bolt', size, className)
}

export function IconFilePdf({ size, className }: IconProps) {
  return faIcon('fa-regular fa-file-pdf', size, className)
}

export function IconCircleQuestion({ size, className }: IconProps) {
  return faIcon('fa-regular fa-circle-question', size, className)
}

export function IconEdit({ size, className }: IconProps) {
  return faIcon('fa-solid fa-pen', size, className)
}

export function IconArrowLeft({ size, className }: IconProps) {
  return faIcon('fa-solid fa-arrow-left', size, className)
}

export function IconArrowTrendDown({ size, className }: IconProps) {
  return faIcon('fa-solid fa-arrow-trend-down', size, className)
}

export function IconTriangleExclamation({ size, className }: IconProps) {
  return faIcon('fa-solid fa-triangle-exclamation', size, className)
}

export function IconChartMixed({ size, className }: IconProps) {
  // fa-chart-mixed is Pro; use fa-chart-column as Free alternative
  return faIcon('fa-solid fa-chart-column', size, className)
}

export function IconRocket({ size, className }: IconProps) {
  return faIcon('fa-solid fa-rocket', size, className)
}

export function IconRefresh({ size, className }: IconProps) {
  return faIcon('fa-solid fa-arrows-rotate', size, className)
}

export function IconFolderGrid({ size, className }: IconProps) {
  // fa-folder-grid is Pro; use fa-folder-open as Free alternative
  return faIcon('fa-solid fa-folder-open', size, className)
}

export function IconFilter({ size, className }: IconProps) {
  return faIcon('fa-solid fa-filter', size, className)
}

export function IconChevronRight({ size, className }: IconProps) {
  return faIcon('fa-solid fa-chevron-right', size, className)
}

export function IconChevronLeft({ size, className }: IconProps) {
  return faIcon('fa-solid fa-chevron-left', size, className)
}

export function IconSeedling({ size, className }: IconProps) {
  return faIcon('fa-solid fa-seedling', size, className)
}
