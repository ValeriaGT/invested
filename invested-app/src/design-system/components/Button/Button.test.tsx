import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renderiza el label', () => {
    render(<Button label="Continuar" />)
    expect(screen.getByText('Continuar')).toBeInTheDocument()
  })

  it('llama onClick al hacer click', async () => {
    const handleClick = vi.fn()
    render(<Button label="Guardar" onClick={handleClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('no dispara onClick cuando está disabled', async () => {
    const handleClick = vi.fn()
    render(<Button label="Guardar" disabled onClick={handleClick} />)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('icon-only requiere aria-label', () => {
    render(<Button icon="On" aria-label="Cerrar" iconElement={<span>×</span>} />)
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument()
  })

  it('aplica variant Secondary', () => {
    render(<Button label="Cancelar" variant="Secondary" />)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/secondary/)
  })

  it('aplica size Small', () => {
    render(<Button label="Ver" size="Small" />)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/small/)
  })

  it('aplica fullWidth', () => {
    render(<Button label="Activar" fullWidth />)
    const btn = screen.getByRole('button')
    expect(btn.className).toMatch(/fullWidth/)
  })
})
