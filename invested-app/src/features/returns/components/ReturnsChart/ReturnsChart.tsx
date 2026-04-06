import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MonthlyChartEntry } from '../../types'
import { IconCircleQuestion } from '../Icons'
import styles from './ReturnsChart.module.css'

interface ReturnsChartProps {
  data: MonthlyChartEntry[]
}

const Y_TICKS = [50000000, 30000000, 20000000, 10000000, 5000000, 0, -150000]

function formatYAxis(value: number): string {
  if (value === 0) return '0'
  const abs = Math.abs(value)
  if (abs >= 1000000) return `${abs / 1000000}M`
  if (abs >= 1000) return `${abs / 1000}K`
  return String(value)
}

function formatTooltipValue(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1000000) return `$${(abs / 1000000).toFixed(1)}M`
  if (abs >= 1000) return `$${(abs / 1000).toFixed(0)}K`
  return `$${abs}`
}

export function ReturnsChart({ data }: ReturnsChartProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>Rendimientos de tu contrato:</h3>
          <span className={styles.subtitle}>Últimos 365 días</span>
          <button className={styles.helpButton} aria-label="Más información sobre rendimientos">
            <IconCircleQuestion size={16} />
          </button>
        </div>
        <div className={styles.legend}>
          <LegendItem color="#E9E9E9" label="Lo que has aportado" />
          <LegendItem color="#0099DE" label="Rendimiento" />
          <LegendItem color="#FFAE08" label="Rendimiento Negativo" />
        </div>
      </div>

      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            barCategoryGap="20%"
          >
            <CartesianGrid vertical={false} stroke="#F3F3F3" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontFamily: 'var(--font-family-body)', fontSize: 11, fill: '#878787' }}
            />
            <YAxis
              ticks={Y_TICKS}
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
              tick={{ fontFamily: 'var(--font-family-body)', fontSize: 11, fill: '#878787' }}
              width={36}
            />
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any, name: any) => {
                const labels: Record<string, string> = {
                  contributions: 'Aportado',
                  returns: 'Rendimiento',
                  negativeReturns: 'Rend. Negativo',
                }
                return [
                  formatTooltipValue(Number(value ?? 0)),
                  labels[String(name)] ?? String(name),
                ]
              }}
              contentStyle={{
                fontFamily: 'var(--font-family-body)',
                fontSize: 12,
                borderRadius: 8,
                border: '1px solid #E9E9E9',
              }}
            />
            <Bar dataKey="contributions" stackId="positive" fill="#E9E9E9" radius={[0, 0, 0, 0]} />
            <Bar dataKey="returns" stackId="positive" fill="#0099DE" radius={[4, 4, 0, 0]} />
            <Bar dataKey="negativeReturns" fill="#FFAE08" radius={[0, 0, 4, 4]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className={styles.scaleNote}>K: Miles &nbsp;&nbsp; M: Millones</p>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className={styles.legendItem}>
      <span className={styles.legendDot} style={{ backgroundColor: color }} />
      <span className={styles.legendLabel}>{label}</span>
    </div>
  )
}
