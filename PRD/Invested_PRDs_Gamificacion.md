# Invested 3.0 — PRDs: Capa de Progreso, Aprendizaje y Evolución

**Proyecto:** Rediseño de la experiencia Invested — Capa de gamificación, educación e hitos  
**Equipo:** UXplorers — Producto & Diseño  
**Fecha:** Abril 2026  
**Versión:** 1.0  

---

## Contexto y alcance

El foco de este conjunto de PRDs es la **capa de progreso, aprendizaje y evolución** dentro de la experiencia post-activación de Invested. No cubre el flujo de activación ni la comunicación de rebalanceos.

**Pregunta de diseño:**  
¿Cómo mostrarle al usuario que está avanzando con su inversión, que entiende lo que pasa en su portafolio y que por eso vale la pena quedarse, incluso cuando la rentabilidad no es la estrella?

**Comportamiento deseado:**  
El usuario consulta Invested para ver su progreso, reconoce su avance como inversionista y permanece en el producto con mayor confianza, sin depender únicamente de la rentabilidad para sentir valor.

---

## Mapa de PRDs

| ID | Nombre | Prioridad | Hipótesis que valida |
|----|--------|-----------|----------------------|
| PRD-04 | Dashboard de progreso hacia objetivos | 🔴 Alta | H3 |
| PRD-05A | Sistema de hitos — Permanencia y aprendizaje | 🔴 Alta | H2, H3 |
| PRD-05B | Módulos de aprendizaje desbloqueables | 🟡 Media-Alta | H2 |
| PRD-05C | Niveles de sofisticación y evolución de mezcla | 🟡 Media-Alta | H2, H3, H5 |

---

## PRD-04 — Dashboard de progreso hacia objetivos

### Problema
El dashboard actual muestra solo saldo y rentabilidad como número aislado. El usuario no puede responder "¿cómo va mi inversión?" sin llamar al FP. El saldo genera ansiedad cuando cae y no comunica progreso hacia ninguna meta concreta.

### Objetivo
Reemplazar el saldo como único indicador de valor por una experiencia centrada en avance visible hacia el objetivo del usuario, composición comprensible de su mezcla y actividad reciente explicada en lenguaje simple.

### Usuario objetivo
Cliente activo de Invested, adulto 30–55 años, que quiere crecer su patrimonio sin gestión activa y prefiere acompañamiento experto. Accede principalmente desde mobile.

### Requerimientos funcionales

| # | Requerimiento | Prioridad |
|---|---------------|-----------|
| RF-04.1 | Barra de progreso visual hacia el objetivo definido en activación (meta + horizonte de tiempo) | 🔴 Must |
| RF-04.2 | Indicador de distancia al objetivo: monto actual vs. meta, tiempo estimado restante | 🔴 Must |
| RF-04.3 | Visualización de composición de mezcla — donut chart por fondo con nombres legibles | 🔴 Must |
| RF-04.4 | Sección "Actividad reciente" con detalle explicativo de cada rebalanceo en lenguaje simple | 🔴 Must |
| RF-04.5 | Botón "¿Por qué se movió esto?" en cada movimiento registrado | 🔴 Must |
| RF-04.6 | Nivel actual del inversionista visible en el dashboard (Principiante / Observador / Estratega) | 🔴 Must |
| RF-04.7 | Rentabilidad siempre mostrada con benchmark y contexto, nunca como número aislado | 🟡 Should |
| RF-04.8 | Acceso directo a hitos alcanzados desde el dashboard | 🟡 Should |
| RF-04.9 | Vista de rendimiento ajustado al riesgo vs. alternativas — para usuarios nivel Estratega | 🟢 Nice to have |

### Pantallas requeridas

1. **Home dashboard** — Progreso hacia meta + nivel del inversionista + actividad reciente + acceso a hitos
2. **Detalle de movimiento** — Explicación del rebalanceo con contexto de mercado y comparativo "con vs. sin rebalanceo"
3. **Composición de mezcla** — Donut chart expandido con detalle de cada fondo

### Criterio de aceptación
En pruebas de usuario, ≥ 75% de los participantes pueden responder "¿cómo va mi inversión?" sin necesitar al FP, solo con la información del dashboard.

---

## PRD-05A — Sistema de hitos: permanencia y aprendizaje

### Problema
Sin rentabilidad visible, el cliente siente que no avanza y deserta. No hay ningún mecanismo que reconozca la permanencia del usuario ni su esfuerzo por entender el producto. Los hitos generan un sentido de progreso continuo e independiente del mercado.

### Objetivo
Crear un sistema de reconocimiento que haga tangible el progreso del usuario en dos dimensiones: tiempo activo en el producto y conocimiento adquirido sobre su inversión.

### Tipos de hitos

#### Hitos de permanencia
Reconocen la confianza del usuario en mantenerse invertido:

| Hito | Trigger | Insignia |
|------|---------|---------|
| Primer mes activo | 30 días desde activación | 🟢 Semilla |
| Primer rebalanceo vivido | Primer rebalanceo sin retiro | 🔵 Ancla |
| Superar una caída | Caída de mercado ≥ 5% sin retirar | 🟠 Escudo |
| Primer año con Invested | 365 días activo | 🟡 Estrella |
| Dos años consecutivos | 730 días activo | 🏆 Trayectoria |

#### Hitos de aprendizaje
Reconocen comprensión real del producto (se desbloquean al completar módulos del PRD-05B):

| Hito | Trigger | Insignia |
|------|---------|---------|
| Entendiste tu mezcla | Completar módulo "Entiende tu mezcla" | 📊 Brújula |
| Entendiste el riesgo | Completar módulo "Tu perfil de riesgo" | 🛡️ Mapa |
| Entendiste un rebalanceo | Leer "¿Por qué?" de 3 movimientos | 🔄 Engranaje |
| Rentabilidad real vs. nominal | Completar módulo "Rentabilidad en contexto" | 📈 Lupa |
| Conoces tus fondos | Completar módulo "Los fondos de tu mezcla" | 🧩 Piezas |

### Requerimientos funcionales

| # | Requerimiento | Prioridad |
|---|---------------|-----------|
| RF-05A.1 | Pantalla de hitos con categorías: Permanencia y Aprendizaje | 🔴 Must |
| RF-05A.2 | Hitos desbloqueados con fecha y descripción de qué los activó | 🔴 Must |
| RF-05A.3 | Hitos pendientes visibles con condición clara de desbloqueo | 🔴 Must |
| RF-05A.4 | Notificación in-app al desbloquear un hito (micro-celebración) | 🔴 Must |
| RF-05A.5 | Progreso numérico visible: "X de Y hitos de aprendizaje completados" | 🔴 Must |
| RF-05A.6 | Hitos de permanencia se otorgan automáticamente sin acción del usuario | 🔴 Must |
| RF-05A.7 | Resumen de hitos visible en el dashboard principal (no solo en pantalla dedicada) | 🟡 Should |
| RF-05A.8 | Animación de entrada al desbloquear un hito (sin ser intrusiva) | 🟡 Should |
| RF-05A.9 | Compartir hito en redes sociales (opcional, para el usuario) | 🟢 Nice to have |

### Pantallas requeridas

1. **Pantalla de hitos** — Vista completa de hitos desbloqueados y pendientes en dos categorías
2. **Detalle de hito** — Qué significa, cuándo se desbloqueó, cómo contribuye al nivel
3. **Micro-celebración** — Modal o toast animado al desbloquear un hito nuevo

### Criterio de aceptación
Reducción de la tasa de desactivación en períodos de baja rentabilidad comparada con el trimestre anterior. Tasa de apertura de notificaciones de hitos ≥ 60%.

---

## PRD-05B — Módulos de aprendizaje desbloqueables

### Problema
Los clientes que entienden por qué se les asigna una mezcla y qué implica cada decisión desertan menos en volatilidad. Hoy Invested no ofrece ningún contenido educativo integrado en la experiencia del producto.

### Objetivo
Integrar módulos de aprendizaje cortos y contextuales directamente en el producto, que el usuario pueda consumir desde el dashboard y que desbloqueen hitos de aprendizaje al completarse.

### Módulos definidos

| Módulo | Contenido | Desbloquea hito | Disponible desde nivel |
|--------|-----------|-----------------|----------------------|
| **Entiende tu mezcla** | Qué fondos la componen, cómo se distribuye el riesgo, por qué esa y no otra | Brújula | Principiante |
| **Tu perfil de riesgo** | Qué significa Prudente/Observador/Arriesgado, cómo afecta tu mezcla | Mapa | Principiante |
| **Qué es un rebalanceo** | Por qué ocurre, qué protege, cómo funciona automáticamente | Engranaje | Principiante |
| **Rentabilidad en contexto** | Diferencia entre rentabilidad nominal y real, cómo leer un benchmark | Lupa | Observador |
| **Los fondos de tu mezcla** | Qué es cada fondo, en qué invierte, cuál es su riesgo individual | Piezas | Observador |
| **Diversificación y tiempo** | Por qué el horizonte largo protege, cómo funciona el interés compuesto | ⭐ Nuevo hito | Estratega |

### Requerimientos funcionales

| # | Requerimiento | Prioridad |
|---|---------------|-----------|
| RF-05B.1 | Módulos accesibles desde el dashboard y desde la pantalla de hitos | 🔴 Must |
| RF-05B.2 | Cada módulo: máximo 3 pantallas, lenguaje sin jerga financiera | 🔴 Must |
| RF-05B.3 | Al completar el módulo, se otorga el hito correspondiente de forma inmediata | 🔴 Must |
| RF-05B.4 | Módulos de Principiante disponibles desde el primer día de activación | 🔴 Must |
| RF-05B.5 | Módulos de Observador se desbloquean al alcanzar ese nivel | 🟡 Should |
| RF-05B.6 | Módulos de Estratega se desbloquean al alcanzar ese nivel | 🟡 Should |
| RF-05B.7 | Progreso guardado si el usuario abandona a mitad de un módulo | 🟡 Should |
| RF-05B.8 | Notificación mensual sugiriendo el próximo módulo disponible | 🟡 Should |
| RF-05B.9 | Módulos adaptados al contexto del usuario (ej. si tuvo un rebalanceo reciente, sugiere ese módulo primero) | 🟢 Nice to have |

### Pantallas requeridas

1. **Lista de módulos** — Disponibles y bloqueados con condición de desbloqueo visible
2. **Módulo (3 pantallas máx.)** — Contenido + ilustración simple + CTA "Completar"
3. **Confirmación de módulo completado** — Hito desbloqueado + acceso al siguiente módulo sugerido

### Criterio de aceptación
Tasa de finalización de módulos ≥ 50% de los usuarios que los inician. Correlación positiva entre módulos completados y permanencia en el producto (validar a 3 meses).

---

## PRD-05C — Niveles de sofisticación y evolución de mezcla

### Problema
El usuario siente que su inversión es estática. No percibe que esté evolucionando como inversionista ni que Invested pueda crecer con él. Hoy todas las mezclas están disponibles desde el inicio, sin que el usuario tenga contexto suficiente para elegir una mezcla más agresiva de forma informada.

### Objetivo
Crear un sistema de niveles que reconozca el crecimiento del usuario como inversionista, y que al alcanzar ciertos umbrales le permita — previa actualización de perfil — acceder a mezclas de mayor sofisticación.

### Sistema de niveles

| Nivel | Mezclas accesibles | Requisitos para alcanzarlo |
|-------|-------------------|---------------------------|
| **🌱 Principiante** | Cauta, Discreta | Estado inicial al activar Invested |
| **🔭 Observador** | + Paciente, Dinámica | 6 meses activo + 3 hitos de aprendizaje completados + nuevo cuestionario de perfil |
| **🧭 Estratega** | + Decidida, Audaz | 12 meses activo + 6 hitos de aprendizaje completados + nuevo cuestionario de perfil |

### Flujo de evolución de nivel

1. El sistema detecta que el usuario cumplió los requisitos de permanencia y aprendizaje
2. Se muestra una notificación: *"Has completado 3 módulos y llevas 6 meses con Invested. Podrías explorar mezclas más dinámicas"*
3. El usuario accede a una pantalla de "Siguiente nivel" donde ve qué le abre
4. Se lanza un cuestionario corto de actualización de perfil (3 preguntas sobre horizonte y tolerancia a pérdida actualizada)
5. Si el nuevo perfil soporta la mezcla, se habilita el cambio con explicación clara de qué cambia y por qué
6. El cambio queda registrado como un hito nuevo: *"Evolucionaste a nivel Observador — Mezcla Dinámica disponible"*

### Requerimientos funcionales

| # | Requerimiento | Prioridad |
|---|---------------|-----------|
| RF-05C.1 | Nivel visible en el dashboard con progreso hacia el siguiente nivel | 🔴 Must |
| RF-05C.2 | Pantalla "Mi nivel" con hitos de permanencia y aprendizaje requeridos para subir | 🔴 Must |
| RF-05C.3 | Indicador de progreso dual: "X/6 meses" + "X/3 hitos de aprendizaje" | 🔴 Must |
| RF-05C.4 | Notificación al cumplir requisitos invitando a iniciar el proceso de evolución | 🔴 Must |
| RF-05C.5 | Cuestionario de actualización de perfil (máx. 3 preguntas) previo al desbloqueo de mezcla | 🔴 Must (regulatorio) |
| RF-05C.6 | Explicación clara de qué cambia en la mezcla nueva vs. la actual antes de confirmar | 🔴 Must |
| RF-05C.7 | El desbloqueo de mezcla NO bypass el perfil de riesgo regulatorio — siempre requiere nuevo cuestionario | 🔴 Must (regulatorio SFC/AMV) |
| RF-05C.8 | Hito registrado al evolucionar de nivel | 🟡 Should |
| RF-05C.9 | Posibilidad de explorar mezclas del siguiente nivel en modo "vista previa" sin activar | 🟡 Should |
| RF-05C.10 | El usuario puede elegir NO evolucionar y mantener su mezcla actual sin penalización | 🔴 Must |

### Pantallas requeridas

1. **Mi nivel** — Nivel actual, barra de progreso dual (tiempo + hitos), mezclas desbloqueadas y bloqueadas
2. **Vista previa de siguiente nivel** — Qué mezclas abre, qué implica, por qué podría convenirle
3. **Cuestionario de actualización de perfil** — 3 preguntas, diseño limpio, sin ansiedad
4. **Confirmación de evolución** — Nueva mezcla habilitada + hito desbloqueado + explicación de qué cambia

### Criterio de aceptación
- El flujo de evolución de nivel cumple con los requerimientos de perfil de riesgo de SFC y AMV sin excepción
- En pruebas de usuario, ≥ 70% de los participantes entiende qué necesitan hacer para subir de nivel
- La evolución de nivel no genera confusión ni sensación de presión — el usuario la percibe como una oportunidad, no una obligación

---

## Relación entre PRDs

```
PRD-04 (Dashboard)
│
├── Muestra nivel actual del inversionista → PRD-05C
├── Muestra hitos recientes → PRD-05A
└── Acceso a módulos de aprendizaje → PRD-05B
         │
         └── Completar módulos → desbloquea hitos (PRD-05A)
                                    │
                                    └── Acumular hitos + tiempo → sube de nivel (PRD-05C)
                                                                      │
                                                                      └── Nivel nuevo → mezclas desbloqueadas
```

---

## Restricciones críticas

- **Regulatorio:** El desbloqueo de mezclas de mayor riesgo SIEMPRE requiere actualización del cuestionario de perfil de riesgo. No puede ser solo una mecánica de gamificación. Validar con equipo legal y de cumplimiento antes de diseñar el flujo final.
- **Tono:** La gamificación debe sentirse como reconocimiento y crecimiento, nunca como presión o competencia. No hay rankings entre usuarios.
- **Mobile first:** Todos los componentes deben funcionar en pantallas de 375px mínimo.
- **Accesibilidad:** Los hitos y niveles deben ser comprensibles sin depender solo del color.

---

## Métricas de éxito

| Métrica | Meta |
|---------|------|
| Usuarios que responden "¿cómo va mi inversión?" sin FP | ≥ 75% en pruebas |
| Tasa de finalización de módulos de aprendizaje | ≥ 50% de quienes los inician |
| Tasa de apertura de notificaciones de hitos | ≥ 60% |
| Reducción de desactivación en períodos de baja rentabilidad | Reducción medible vs. trimestre anterior |
| Usuarios que evolucionan de nivel en 12 meses | Por definir en baseline |

---

*Documento elaborado por UXplorers — Skandia, Abril 2026*  
*Scope: Capa de gamificación, educación e hitos — Invested 3.0*
