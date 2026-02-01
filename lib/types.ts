export type Estado = 'backlog' | 'pendiente' | 'en_progreso' | 'completada' | 'bloqueada';
export type Prioridad = 'alta' | 'media' | 'baja';
export type Categoria = 'Administración' | 'Finanzas' | 'Proyectos' | 'Marketing' | 'Tech' | 'Legal/RRHH' | 'Comunicación' | 'Sistema';
export type Origen = 'telegram' | 'heartbeat' | 'automatico' | 'manual';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  estado: Estado;
  prioridad: Prioridad;
  fecha_solicitud: string;
  fecha_ejecucion: string;
  duracion_seg: number;
  costo_usd: number;
  origen: Origen;
  notas: string;
}

export const CATEGORY_EMOJI: Record<Categoria, string> = {
  'Administración': '📅',
  'Finanzas': '💰',
  'Proyectos': '🏗️',
  'Marketing': '📱',
  'Tech': '💻',
  'Legal/RRHH': '📋',
  'Comunicación': '📞',
  'Sistema': '🔧'
};

export const CATEGORY_COLORS: Record<Categoria, string> = {
  'Administración': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
  'Finanzas': 'bg-green-500/20 text-green-300 border-green-500/50',
  'Proyectos': 'bg-orange-500/20 text-orange-300 border-orange-500/50',
  'Marketing': 'bg-pink-500/20 text-pink-300 border-pink-500/50',
  'Tech': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
  'Legal/RRHH': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
  'Comunicación': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50',
  'Sistema': 'bg-red-500/20 text-red-300 border-red-500/50'
};

export const ESTADO_LABELS: Record<Estado, string> = {
  'backlog': 'Backlog',
  'pendiente': 'Pendiente',
  'en_progreso': 'En Progreso',
  'completada': 'Completada',
  'bloqueada': 'Bloqueada'
};
