import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@ds/components/Button'
import styles from './LearningDrawer.module.css'

export interface Slide {
  emoji: string
  title: string
  body: string
}

export interface LearningDrawerProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  moduleName: string
  slides: Slide[]
}

export function LearningDrawer({
  isOpen,
  onClose,
  onComplete,
  moduleName,
  slides,
}: LearningDrawerProps) {
  const [current, setCurrent] = useState(0)

  const isFirst = current === 0
  const isLast = current === slides.length - 1

  useEffect(() => {
    if (isOpen) setCurrent(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!slides.length) return null

  const slide = slides[current]

  return createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="presentation"
    >
      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={moduleName}
      >
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.moduleName}>{moduleName}</p>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Segment bar */}
        <div
          className={styles.segmentBar}
          role="progressbar"
          aria-valuenow={current + 1}
          aria-valuemax={slides.length}
          aria-label={`Paso ${current + 1} de ${slides.length}`}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              className={`${styles.segment} ${i <= current ? styles.segmentActive : ''}`}
            />
          ))}
        </div>

        {/* Slide content */}
        <div className={styles.slideContent}>
          <span className={styles.slideEmoji} aria-hidden="true">
            {slide.emoji}
          </span>
          <h3 className={styles.slideTitle}>{slide.title}</h3>
          <p className={styles.slideBody}>{slide.body}</p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            variant="Secondary"
            size="Small"
            label="Anterior"
            disabled={isFirst}
            onClick={() => setCurrent((c) => c - 1)}
          />
          <span className={styles.slideIndicator}>
            {current + 1} de {slides.length}
          </span>
          {isLast ? (
            <Button
              variant="Primary"
              size="Small"
              label="Completar módulo ✓"
              onClick={onComplete}
            />
          ) : (
            <Button
              variant="Primary"
              size="Small"
              label="Siguiente"
              onClick={() => setCurrent((c) => c + 1)}
            />
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
