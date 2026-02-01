import { Tarea, CATEGORY_EMOJI, CATEGORY_COLORS } from '@/lib/types';
import { getRelativeTime } from '@/lib/api';

interface TaskCardProps {
  tarea: Tarea;
}

const PRIORITY_INDICATORS = {
  alta: '🔴',
  media: '🟡',
  baja: '🟢'
};

const ORIGIN_LABELS = {
  telegram: '💬 Telegram',
  heartbeat: '💓 Heartbeat',
  automatico: '🤖 Auto',
  manual: '✍️ Manual'
};

export default function TaskCard({ tarea }: TaskCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-3 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-slate-900/50">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white flex-1 leading-tight">
          {tarea.titulo}
        </h3>
        <span className="ml-2 text-lg" title={`Prioridad: ${tarea.prioridad}`}>
          {PRIORITY_INDICATORS[tarea.prioridad]}
        </span>
      </div>
      
      {/* Description */}
      {tarea.descripcion && (
        <p className="text-sm text-slate-400 mb-3 line-clamp-2">
          {tarea.descripcion}
        </p>
      )}
      
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        {/* Category */}
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${CATEGORY_COLORS[tarea.categoria]}`}>
          <span>{CATEGORY_EMOJI[tarea.categoria]}</span>
          <span>{tarea.categoria}</span>
        </span>
        
        {/* Origin */}
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600">
          {ORIGIN_LABELS[tarea.origen]}
        </span>
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {tarea.fecha_ejecucion ? getRelativeTime(tarea.fecha_ejecucion) : getRelativeTime(tarea.fecha_solicitud)}
        </span>
        
        {tarea.costo_usd > 0 && (
          <span className="font-mono text-emerald-400">
            ${tarea.costo_usd.toFixed(2)}
          </span>
        )}
      </div>
      
      {/* Notes */}
      {tarea.notas && (
        <div className="mt-2 pt-2 border-t border-slate-700">
          <p className="text-xs text-slate-500 italic">
            {tarea.notas}
          </p>
        </div>
      )}
    </div>
  );
}
