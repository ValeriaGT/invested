import { useState } from 'react'
import { Button } from '@ds/components/Button'
import { Badge } from '@ds/components/Badge'
import { MixDrawer } from '@/components/crecer/MixDrawer'
import { formatCOP } from '@shared/utils/format'
import type { ContractData } from '../../types'
import { IconArrowTrendUp } from '../Icons'
import styles from './ContractSummaryCards.module.css'

interface ContractSummaryCardsProps {
  data: ContractData
  onContribute?: () => void
  onWithdraw?: () => void
  onContingentDetail?: () => void
  onViewComposition?: () => void
}

export function ContractSummaryCards({
  data,
  onContribute,
  onWithdraw,
  onContingentDetail,
  onViewComposition,
}: ContractSummaryCardsProps) {
  return (
    <div className={styles.row}>
      <ContractTotalCard data={data} onContribute={onContribute} onWithdraw={onWithdraw} />
      <EvolutionCard data={data} onViewComposition={onViewComposition} />
      <ContingentAccountCard onDetail={onContingentDetail} />
    </div>
  )
}

function ContractTotalCard({
  data,
  onContribute,
  onWithdraw,
}: {
  data: ContractData
  onContribute?: () => void
  onWithdraw?: () => void
}) {
  return (
    <div className={styles.totalCard}>
      <div className={styles.totalCardDecorTop} aria-hidden="true" />
      <div className={styles.totalCardDecorBottom} aria-hidden="true" />
      <div className={styles.totalCardContent}>
        <p className={styles.totalLabel}>Dinero total en tu contrato</p>
        <p className={`${styles.totalAmount} monetary`}>{formatCOP(data.totalAmount)}</p>
        <p className={styles.contractNumber}>Contrato # {data.contractNumber}</p>
        <div className={styles.ctaButtons}>
          <Button variant="Primary" size="Small" label="Aportar" onClick={onContribute} />
          <Button variant="Secondary" size="Small" label="Retirar" onClick={onWithdraw} />
        </div>
        <p className={styles.adminNote}>Administrado por Skandia AFP - ACCAI S.A.</p>
      </div>
    </div>
  )
}

function EvolutionCard({
  data,
  onViewComposition,
}: {
  data: ContractData
  onViewComposition?: () => void
}) {
  const [mixDrawerOpen, setMixDrawerOpen] = useState(false)
  const total = data.contributions + data.returns

  return (
    <div className={styles.evolutionCard}>
      <p className={styles.evolutionTitle}>Evolución del contrato al {data.evolutionDate}</p>

      <div className={styles.evolutionMainRow}>
        <div className={styles.evolutionTotalSection}>
          <p className={styles.evolutionTotalLabel}>Total</p>
          <div className={styles.evolutionTotalAmountRow}>
            <p className={`${styles.evolutionTotalAmount} monetary`}>{formatCOP(total)}</p>
            <div className={styles.trendIconWrapper}>
              <IconArrowTrendUp size={12} />
            </div>
          </div>
        </div>
        <div className={styles.evolutionDonut} aria-hidden="true" />
      </div>

      <div className={styles.evolutionBreakdown}>
        <div className={styles.evolutionBreakdownItem}>
          <p className={styles.evolutionBreakdownLabel}>Capital</p>
          <p className={`${styles.evolutionBreakdownValue} monetary`}>{formatCOP(data.contributions)}</p>
        </div>
        <div className={styles.evolutionBreakdownDivider} aria-hidden="true" />
        <div className={styles.evolutionBreakdownItem}>
          <p className={styles.evolutionBreakdownLabel}>Rendimientos</p>
          <p className={`${styles.evolutionBreakdownValue} monetary`}>{formatCOP(data.returns)}</p>
        </div>
      </div>

      {/* ── Sección mezcla ── */}
      <hr className={styles.mixDivider} aria-hidden="true" />

      <div className={styles.mixRow}>
        <span className={styles.mixLabel}>Tu mezcla actual:</span>
        <Badge label="Discreta 📊" variant="success" />
      </div>

      <p className={styles.mixNote}>Gestionada automáticamente por Invested</p>

      <button
        className={styles.mixLink}
        type="button"
        onClick={() => setMixDrawerOpen(true)}
      >
        ¿Qué significa tu mezcla? →
      </button>

      <MixDrawer
        isOpen={mixDrawerOpen}
        onClose={() => setMixDrawerOpen(false)}
        onViewComposition={() => {
          setMixDrawerOpen(false)
          onViewComposition?.()
        }}
      />
    </div>
  )
}

function ContingentAccountCard({ onDetail }: { onDetail?: () => void }) {
  return (
    <div className={styles.contingentCard}>
      <div className={styles.contingentGraphic} aria-hidden="true">
        <div className={styles.contingentCircle} />
      </div>
      <p className={styles.contingentTitle}>Cuenta contingente de tus aportes</p>
      <p className={styles.contingentDesc}>
        Destinado a garantizar el cumplimiento de tus obligaciones tributarias.
      </p>
      <Button variant="Secondary" size="Small" label="Ver detalle" onClick={onDetail} />
    </div>
  )
}
