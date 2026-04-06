import { IconCircleQuestion } from '../Icons'
import styles from './DetallesTab.module.css'

interface DetailField {
  label: string
  value?: string
  hasHelp?: boolean
  link?: { text: string; href: string; newTab?: boolean }
}

interface DetailRow {
  left: DetailField
  right?: DetailField
}

const ROWS: DetailRow[] = [
  {
    left: {
      label: 'Producto',
      value: 'Fondo Voluntario de Pensión Skandia Multifund',
      hasHelp: true,
    },
    right: { label: 'Número de Contrato', value: '1234734123' },
  },
  {
    left: { label: 'Tipo de gestión', value: 'Delegada con Invest-ed', hasHelp: true },
    right: { label: 'Nombre de tu asesor', value: 'Carlos Eduardo González' },
  },
  {
    left: { label: 'Tipo de plan vinculado', value: 'Plan de ahorro individual' },
    right: { label: 'Fecha de creación del contrato', value: '04/06/2018 - 08:15 a.m' },
  },
  {
    left: { label: 'Compañía Asociada', value: 'Skandia AFP - ACCAI S.A.' },
    right: { label: 'Perfil del producto', value: 'Observador', hasHelp: true },
  },
  {
    left: { label: 'Nombre del contrato', value: 'Mediano plazo' },
    right: {
      label: 'Cuentas bancarias inscritas',
      link: {
        text: 'Ver información completa',
        href: 'https://www.skandia.co/documents/39464/1368004/Reglamento-Estandarizado-Fondo-Voluntario-Pension-Skandia-Multifund.pdf',
        newTab: true,
      },
    },
  },
  {
    left: {
      label: 'Fichas técnicas y rentabilidades',
      link: {
        text: 'Ver información completa',
        href: 'https://portal.skandia.com.co/om.rentabilidades.pl/oldmutual',
      },
    },
    right: {
      label: 'Reglamento del producto',
      link: {
        text: 'Ver información completa',
        href: 'https://www.skandia.co/documents/39464/1368004/Reglamento-Estandarizado-Fondo-Voluntario-Pension-Skandia-Multifund.pdf',
        newTab: true,
      },
    },
  },
  {
    left: {
      label: 'Lista de cuentas inscritas',
      link: {
        text: 'Inscribir y administrar cuentas',
        href: 'https://www.skandia.co/documents/39464/1410662/Reglamento-FIC+Efectivo.pdf',
        newTab: true,
      },
    },
  },
]

function Field({ field }: { field: DetailField }) {
  return (
    <div className={styles.field}>
      <span className={styles.fieldLabel}>{field.label}</span>
      {field.value && (
        <span className={styles.fieldValue}>
          {field.value}
          {field.hasHelp && (
            <button className={styles.helpBtn} aria-label={`Más información sobre ${field.label}`}>
              <IconCircleQuestion size={18} />
            </button>
          )}
        </span>
      )}
      {field.link && (
        <a
          href={field.link.href}
          className={styles.fieldLink}
          target={field.link.newTab ? '_blank' : undefined}
          rel={field.link.newTab ? 'noopener noreferrer' : undefined}
        >
          {field.link.text}
        </a>
      )}
    </div>
  )
}

export function DetallesTab() {
  return (
    <div className={styles.container}>
      {ROWS.map((row, i) => (
        <div key={i} className={styles.row}>
          <Field field={row.left} />
          {row.right ? <Field field={row.right} /> : <div className={styles.fieldEmpty} />}
        </div>
      ))}
    </div>
  )
}
