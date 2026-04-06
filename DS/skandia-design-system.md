# Skandia Design System — Contexto para IA
> Usa este archivo como **system prompt** al inicio de cualquier proyecto de desarrollo.
> La IA debe respetar todos los tokens, componentes y reglas aquí definidos **sin inventar ni modificar valores**.

---

## 🧭 Identidad del Sistema

| Propiedad | Valor |
|-----------|-------|
| Nombre del DS | `Skandia UI Kit` |
| Versión | `0.1.0` |
| Marca | Skandia / UXplorers |
| Unidad base de espaciado | `8px` |
| Modo de color | `Light` |

---

## 🎨 1. Colores

### Primary Green — Paleta principal de marca

| Token | HEX | Uso |
|-------|-----|-----|
| `--color-green-d04` | `#006E22` | Verde más oscuro |
| `--color-green-d03` | `#007C26` | |
| `--color-green-d02` | `#009A2F` | |
| `--color-green-d01` | `#03A835` | |
| `--color-green-n00` | `#00C73D` | **Verde base / Brand** |
| `--color-green-l01` | `#1DD64C` | |
| `--color-green-l02` | `#47E264` | |
| `--color-green-l03` | `#5FED73` | |
| `--color-green-l04` | `#CAF9CB` | |
| `--color-green-l05` | `#F6FCF2` | Verde más claro / fondos |

### Primary Grey — Escala de grises

| Token | HEX | Uso |
|-------|-----|-----|
| `--color-grey-d05` | `#000000` | Negro puro |
| `--color-grey-d04` | `#232323` | |
| `--color-grey-d03` | `#2C2C2C` | |
| `--color-grey-d02` | `#323232` | |
| `--color-grey-d01` | `#363636` | |
| `--color-grey-n00` | `#404040` | **Gris base** |
| `--color-grey-l01` | `#444444` | |
| `--color-grey-l02` | `#565656` | |
| `--color-grey-l03` | `#666666` | Texto secundario |
| `--color-grey-l04` | `#878787` | |
| `--color-grey-l05` | `#A5A5A5` | Placeholders |

### Secondary Green Complementary

| Token | HEX |
|-------|-----|
| `--color-sec-green-d04` | `#487000` |
| `--color-sec-green-d03` | `#629A00` |
| `--color-sec-green-d02` | `#6BA800` |
| `--color-sec-green-d01` | `#7DC400` |
| `--color-sec-green-n00` | `#8FE000` |
| `--color-sec-green-l01` | `#A5E633` |
| `--color-sec-green-l02` | `#BBEC65` |
| `--color-sec-green-l03` | `#D2F298` |
| `--color-sec-green-l04` | `#DDF6B1` |
| `--color-sec-green-l05` | `#F3FCE3` |

### Secondary Blue/Teal Complementary

| Token | HEX |
|-------|-----|
| `--color-teal-d04` | `#29806D` |
| `--color-teal-d03` | `#39B398` |
| `--color-teal-d02` | `#42CCAE` |
| `--color-teal-d01` | `#4AE6C3` |
| `--color-teal-n00` | `#52FFD9` |
| `--color-teal-l01` | `#76FEE0` |
| `--color-teal-l02` | `#99FDE7` |
| `--color-teal-l03` | `#BBFDEE` |
| `--color-teal-l04` | `#CCFDF2` |
| `--color-teal-l05` | `#EDFEFA` |

### Reglas de uso de color
- `--color-green-n00` es el **color brand principal**. Úsalo para acciones primarias y CTAs.
- Los tonos `d01`–`d04` se usan en hover, pressed y estados activos.
- Los tonos `l01`–`l05` se usan en fondos, superficies y estados deshabilitados.
- El gris `--color-grey-l03` (`#666666`) es el color de **texto secundario** estándar.
- Nunca usar colores de la paleta teal o sec-green como color de acción primaria.

---

## 🔤 2. Tipografía

> ⚠️ Pendiente de completar con los valores exactos del archivo. Los siguientes son los estilos identificados en el UI Kit:

### Estilos de texto documentados en Figma

| Nombre | Rol |
|--------|-----|
| `Text utilities principales` | Títulos principales / Display |
| `Text utilities secundarios` | Subtítulos / sección headers |
| `Text utilities body` | Cuerpo de texto general |

### Reglas tipográficas
- El texto de botones usa el estilo **label** — texto corto, semibold, centrado.
- Nunca usar texto en italic dentro de botones o componentes interactivos.
- El texto en estados disabled debe mantener la misma tipografía pero con opacidad reducida.

---

## 📐 3. Espaciado y Tamaños de Componentes

### Tamaños del Button (extraídos de Figma)

| Size | Ancho aprox. | Alto | Uso |
|------|-------------|------|-----|
| `Small` | 83px–107px (según ícono) | `30px` | Acciones compactas, toolbars |
| `Large` | 140px (con ícono) / variable | `48px` | CTAs principales, formularios |
| `Icon-only Small` | `30px` | `30px` | Solo ícono, sin texto |
| `Icon-only Large` | `48px` | `48px` | Solo ícono, sin texto |

---

## 🔘 4. Componente: Button

### Variantes (Types)

| Type | Descripción |
|------|-------------|
| `Primary` | Acción principal. Fondo verde brand `#00C73D`. |
| `Secondary` | Acción secundaria. Borde y texto verde, fondo transparente. |
| `Tertiary` | Acción de menor jerarquía. Sin borde visible, solo texto. |

### Tamaños (Sizes)

| Size | Alto | Uso |
|------|------|-----|
| `Small` | `30px` | Acciones compactas |
| `Large` | `48px` | CTAs principales |

### Variantes de ícono (Icon)

| Icon | Descripción |
|------|-------------|
| `None` | Solo texto |
| `Left` | Ícono a la izquierda del texto |
| `Right` | Ícono a la derecha del texto |
| `On` | Solo ícono (icon-only button) |

### Estados (States)

| Estado | Comportamiento |
|--------|----------------|
| `Default` | Estado base |
| `Hover` | Cursor encima — color más oscuro |
| `Pressed` | Click activo — escala o profundidad |
| `Focus` | Foco por teclado — ring visible |
| `Disabled` | Inactivo — opacidad reducida, cursor not-allowed |
| `Disabled hover` | Hover sobre estado disabled — sin cambio visual |

### Props (React / TypeScript)

```typescript
interface ButtonProps {
  type?: 'Primary' | 'Secondary' | 'Tertiary';
  size?: 'Small' | 'Large';
  icon?: 'None' | 'Left' | 'Right' | 'On';
  state?: 'Default' | 'Hover' | 'Pressed' | 'Focus' | 'Disabled';
  label?: string;           // Texto del botón
  iconElement?: ReactNode;  // Elemento ícono (si icon !== 'None')
  onClick?: () => void;
  disabled?: boolean;
}
```

### Código de referencia (React + CSS Variables)

```tsx
// Button.tsx
const Button = ({
  type = 'Primary',
  size = 'Large',
  icon = 'None',
  label,
  iconElement,
  disabled,
  onClick
}) => {
  return (
    <button
      className={`btn btn--${type.toLowerCase()} btn--${size.toLowerCase()} btn--icon-${icon.toLowerCase()}`}
      disabled={disabled}
      onClick={onClick}
    >
      {(icon === 'Left' || icon === 'On') && iconElement}
      {icon !== 'On' && <span className="btn__label">{label}</span>}
      {icon === 'Right' && iconElement}
    </button>
  );
};
```

```css
/* button.css */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 120ms ease, border-color 120ms ease, opacity 120ms ease;
  border: 1.5px solid transparent;
  white-space: nowrap;
}

/* Tamaños */
.btn--small      { height: 30px; padding: 0 12px; font-size: 14px; }
.btn--large      { height: 48px; padding: 0 20px; font-size: 16px; }
.btn--icon-on.btn--small { width: 30px; padding: 0; }
.btn--icon-on.btn--large { width: 48px; padding: 0; }

/* Primary */
.btn--primary {
  background: var(--color-green-n00);     /* #00C73D */
  color: #FFFFFF;
  border-color: var(--color-green-n00);
}
.btn--primary:hover   { background: var(--color-green-d01); border-color: var(--color-green-d01); }
.btn--primary:active  { background: var(--color-green-d02); transform: scale(0.98); }
.btn--primary:focus   { outline: 2px solid var(--color-green-l02); outline-offset: 2px; }

/* Secondary */
.btn--secondary {
  background: transparent;
  color: var(--color-green-n00);
  border-color: var(--color-green-n00);
}
.btn--secondary:hover { background: var(--color-green-l05); }
.btn--secondary:focus { outline: 2px solid var(--color-green-l02); outline-offset: 2px; }

/* Tertiary */
.btn--tertiary {
  background: transparent;
  color: var(--color-grey-n00);
  border-color: transparent;
}
.btn--tertiary:hover  { background: var(--color-green-l05); }
.btn--tertiary:focus  { outline: 2px solid var(--color-green-l02); outline-offset: 2px; }

/* Disabled (aplica a todos los types) */
.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}
```

### Reglas del componente Button
- Máximo **1 botón Primary** por vista o sección principal.
- En agrupaciones, el orden de jerarquía es: Primary → Secondary → Tertiary.
- El botón `icon-only` siempre necesita `aria-label` con descripción de la acción.
- El texto del botón debe ser un **verbo en infinitivo**: "Guardar", "Continuar", "Cancelar".
- Nunca cambiar el ancho mínimo del botón Large por debajo de `140px`.
- En mobile, usar botones `fullWidth` para CTAs principales dentro de formularios.

---

## 🖼️ 5. Logos y Marca

El UI Kit incluye las siguientes variantes de logo Skandia:

| Variante | Nombre en Figma |
|----------|-----------------|
| Logo completo color | `skandia` |
| Logo blanco | `skandia_white` |
| Logo negro | `skandia_black` |
| Logo verde | `skandia_green` |
| Mix | `skandia_mix` |
| Isotipo negro | `isotipo_skandia_black` |
| Isotipo verde | `isotipo_skandia_green` |
| Isotipo blanco | `isotipo_skandia_white` |
| Simplificado verde | `simple_sk_green` |
| Simplificado negro | `simple_sk_black` |
| UXplorers | `isotipo_UxPlorers` / `Uxplorers` |

**Regla:** Nunca distorsionar, recolorear ni recrear los logos. Usar solo los assets originales del DS.

---

## 📏 6. Reglas Globales para la IA

> Estas reglas aplican a **todo el código** generado en este proyecto.

### ✅ Siempre hacer
- Usar los tokens CSS `--color-*` definidos en este documento para todos los colores.
- Mantener los tamaños exactos de componentes (height `30px` / `48px` para botones).
- Incluir todos los estados interactivos: hover, focus, disabled.
- Usar `aria-label` en todos los elementos interactivos sin texto visible.
- El foco visible (`:focus`) es **obligatorio** en todos los componentes — nunca `outline: none`.

### ❌ Nunca hacer
- Hardcodear colores. Siempre usar `var(--color-*)`.
- Crear variantes de componentes no documentadas (ej: botón "danger", "warning") sin consultarlo.
- Cambiar los tamaños de altura de los botones.
- Usar librerías de UI externas (MUI, Chakra, Ant Design) salvo que se indique explícitamente.
- Inventar tokens nuevos que no estén en este documento.
- Usar el verde teal o secondary green como color de botón primary.

### 🧠 Instrucción para generación de código
Cuando generes código para este proyecto:
1. Declara las CSS variables de colores al inicio del archivo o en `:root`.
2. Usa **solo** los tokens y componentes documentados aquí.
3. Respeta los nombres de variantes tal como están en Figma: `Primary`, `Secondary`, `Tertiary`, `Small`, `Large`.
4. Si necesitas un componente no documentado, **pregunta antes** de crearlo.
5. Stack preferido: `React + TypeScript + CSS Modules` o `CSS Variables`.

---

## 📦 7. Componentes Documentados y Pendientes

### ✅ Documentados
- [x] Button (Primary / Secondary / Tertiary, Small / Large, todos los estados)

### 🕐 Identificados en Figma — Pendientes de documentar

- [ ] Alert
- [ ] Breadcrumb
- [ ] Text Link
- [ ] Badge
- [ ] IA Button
- [ ] Avatar
- [ ] Checkbox
- [ ] Chip
- [ ] Input / TextField
- [ ] Select / Dropdown
- [ ] Card
- [ ] Modal / Dialog
- [ ] Toast / Notification
- [ ] Navigation / Header

---

*Última actualización: Marzo 2026 — Versión 0.1.0*
*Fuente: Figma UI Kit — rlrjl6jIlMtNR0o3EVH1jB*
