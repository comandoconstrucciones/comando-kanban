# 📋 Panel de Control — María Mejía

Kanban board visual para el seguimiento de tareas de María, la asistente IA de **Comando Construcciones**.

![Status](https://img.shields.io/badge/status-production-green)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🚀 Características

- **📊 Kanban Board Interactivo** — 5 columnas por estado (Backlog, Pendiente, En Progreso, Completada, Bloqueada)
- **📈 Dashboard de Métricas** — Estadísticas en tiempo real sobre productividad y costos
- **📝 Vista de Lista** — Tabla ordenable con todas las tareas
- **🔍 Filtros Avanzados** — Por categoría, prioridad, origen y búsqueda de texto
- **🔄 Auto-refresh** — Actualización automática cada 30 segundos
- **📱 Responsive Design** — Optimizado para móvil (iPhone de Don Claudio)
- **🎨 Dark Mode** — Tema oscuro profesional con colores por categoría

## 🛠️ Stack Tecnológico

- **Frontend:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Base de Datos:** Google Sheets (público, solo lectura)
- **Deploy:** Vercel (auto-deploy on push)
- **Backend:** Sin servidor — frontend puro leyendo CSV público

## 📊 Fuente de Datos

El board lee datos en tiempo real desde un Google Sheet público:

- **Sheet ID:** `1GklUyZ6l7IOL3oL1uPbWVAqSvOB3WyLDHNrvYQrXpqw`
- **Formato:** CSV export
- **Actualización:** María actualiza el sheet via script Python

[Ver el Sheet →](https://docs.google.com/spreadsheets/d/1GklUyZ6l7IOL3oL1uPbWVAqSvOB3WyLDHNrvYQrXpqw)

## 🏃 Desarrollo Local

```bash
# Clonar el repo
git clone https://github.com/comandoconstrucciones/comando-kanban.git
cd comando-kanban

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build
npm start
```

El sitio estará disponible en `http://localhost:3000`

## 📂 Estructura del Proyecto

```
├── app/
│   ├── page.tsx           # Kanban Board (home)
│   ├── dashboard/         # Dashboard con métricas
│   ├── list/              # Vista de lista/tabla
│   └── layout.tsx         # Layout principal
├── components/
│   ├── KanbanBoard.tsx    # Lógica principal del Kanban
│   ├── KanbanColumn.tsx   # Columna por estado
│   └── TaskCard.tsx       # Card individual de tarea
├── lib/
│   ├── types.ts           # Tipos TypeScript
│   └── api.ts             # Fetch y parse de datos
└── public/
```

## 🎨 Categorías y Emojis

| Categoría | Emoji | Color |
|-----------|-------|-------|
| Administración | 📅 | Azul |
| Finanzas | 💰 | Verde |
| Proyectos | 🏗️ | Naranja |
| Marketing | 📱 | Rosa |
| Tech | 💻 | Morado |
| Legal/RRHH | 📋 | Amarillo |
| Comunicación | 📞 | Cyan |
| Sistema | 🔧 | Rojo |

## 🔧 Configuración

El Sheet ID está hardcodeado en `lib/api.ts`. Si necesitas cambiarlo:

```typescript
// lib/api.ts
const SHEET_ID = 'TU_NUEVO_SHEET_ID';
```

No se requieren variables de entorno ni API keys — el Sheet es público.

## 🚢 Deploy en Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/comandoconstrucciones/comando-kanban)

O manual:
1. Conectar repo en [vercel.com](https://vercel.com)
2. Importar proyecto
3. Deploy automático ✅

## 🐍 Script Python Helper

María actualiza el board usando `kanban_update.py`:

```python
from scripts.kanban_update import add_task, complete_task

# Agregar tarea
task_id = add_task(
    titulo="Revisar facturas",
    categoria="Finanzas",
    prioridad="alta",
    origen="telegram"
)

# Completar con métricas
complete_task(task_id, duracion_seg=1200, costo_usd=0.10)
```

Ver documentación completa en `/root/clawd/asistente/memory/kanban-setup.md`

## 📱 Vistas Disponibles

### 1. Kanban Board (`/`)
Vista principal con columnas drag-and-drop style (visual only, no reordenamiento aún).

### 2. Dashboard (`/dashboard`)
Métricas y estadísticas:
- Total de tareas
- Tareas completadas (%)
- Costo y tiempo total
- Distribución por categoría y prioridad

### 3. Lista (`/list`)
Tabla ordenable con todas las tareas y filtros.

## 🎯 Roadmap

- [ ] Drag & drop funcional entre columnas
- [ ] Edición inline de tareas
- [ ] Webhooks para notificaciones
- [ ] Gráficos avanzados (Chart.js)
- [ ] Exportar a PDF/Excel
- [ ] PWA con offline support

## 📄 Licencia

Propiedad de **Comando Construcciones**.  
Uso interno únicamente.

---

**Desarrollado con 💙 por María Mejía**  
*Asistente IA de Comando Construcciones*
