import { Tarea, Estado, ESTADO_LABELS } from '@/lib/types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  estado: Estado;
  tareas: Tarea[];
}

const ESTADO_COLORS: Record<Estado, string> = {
  backlog: 'bg-slate-700 text-slate-300',
  pendiente: 'bg-yellow-600 text-yellow-100',
  en_progreso: 'bg-blue-600 text-blue-100',
  completada: 'bg-green-600 text-green-100',
  bloqueada: 'bg-red-600 text-red-100'
};

export default function KanbanColumn({ estado, tareas }: KanbanColumnProps) {
  const tareasEnEstado = tareas.filter(t => t.estado === estado);
  
  return (
    <div className="flex-shrink-0 w-80">
      {/* Column Header */}
      <div className={`${ESTADO_COLORS[estado]} rounded-lg px-4 py-3 mb-4 shadow-lg`}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">
            {ESTADO_LABELS[estado]}
          </h2>
          <span className="bg-white/20 rounded-full px-2.5 py-0.5 text-sm font-semibold">
            {tareasEnEstado.length}
          </span>
        </div>
      </div>
      
      {/* Tasks */}
      <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {tareasEnEstado.length === 0 ? (
          <div className="text-center text-slate-600 italic py-8">
            Sin tareas
          </div>
        ) : (
          tareasEnEstado.map(tarea => (
            <TaskCard key={tarea.id} tarea={tarea} />
          ))
        )}
      </div>
    </div>
  );
}
