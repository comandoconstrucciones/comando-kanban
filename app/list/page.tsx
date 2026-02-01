'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tarea, CATEGORY_EMOJI, CATEGORY_COLORS, ESTADO_LABELS } from '@/lib/types';
import { fetchTareas, getRelativeTime, getAgent, getDefaultAgentId } from '@/lib/api';
import Link from 'next/link';
import AgentSelector from '@/components/AgentSelector';

function ListViewInner() {
  const searchParams = useSearchParams();
  const [agentId, setAgentId] = useState(searchParams.get('agent') || getDefaultAgentId());
  const agent = getAgent(agentId);
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<keyof Tarea>('fecha_solicitud');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchTareas(agentId);
      setTareas(data);
      setLoading(false);
    };
    loadData();
  }, [agentId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }
  
  const sortedTareas = [...tareas].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });
  
  const handleSort = (field: keyof Tarea) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>📝 Lista — {agent.name}</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <AgentSelector currentAgentId={agentId} onAgentChange={setAgentId} />
              <div className="flex gap-2">
                <Link
                  href={`/?agent=${agentId}`}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors border border-slate-700"
                >
                  📋 Kanban
                </Link>
                <Link
                  href={`/dashboard?agent=${agentId}`}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors border border-slate-700"
                >
                  📊 Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/80 text-slate-300 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => handleSort('titulo')} className="hover:text-white">
                      Título {sortBy === 'titulo' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => handleSort('categoria')} className="hover:text-white">
                      Categoría {sortBy === 'categoria' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => handleSort('estado')} className="hover:text-white">
                      Estado {sortBy === 'estado' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => handleSort('prioridad')} className="hover:text-white">
                      Pri {sortBy === 'prioridad' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <button onClick={() => handleSort('costo_usd')} className="hover:text-white">
                      Costo {sortBy === 'costo_usd' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button onClick={() => handleSort('fecha_solicitud')} className="hover:text-white">
                      Fecha {sortBy === 'fecha_solicitud' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {sortedTareas.map((tarea) => (
                  <tr key={tarea.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-white font-medium">{tarea.titulo}</div>
                      {tarea.descripcion && (
                        <div className="text-slate-400 text-sm mt-1 line-clamp-1">{tarea.descripcion}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${CATEGORY_COLORS[tarea.categoria]}`}>
                        <span>{CATEGORY_EMOJI[tarea.categoria]}</span>
                        <span>{tarea.categoria}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                        tarea.estado === 'completada' ? 'bg-green-900/30 text-green-300 border border-green-700' :
                        tarea.estado === 'en_progreso' ? 'bg-blue-900/30 text-blue-300 border border-blue-700' :
                        tarea.estado === 'pendiente' ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700' :
                        tarea.estado === 'bloqueada' ? 'bg-red-900/30 text-red-300 border border-red-700' :
                        'bg-slate-700 text-slate-300 border border-slate-600'
                      }`}>
                        {ESTADO_LABELS[tarea.estado]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-lg">
                        {tarea.prioridad === 'alta' ? '🔴' : tarea.prioridad === 'media' ? '🟡' : '🟢'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {tarea.costo_usd > 0 ? (
                        <span className="font-mono text-emerald-400">${tarea.costo_usd.toFixed(2)}</span>
                      ) : (
                        <span className="text-slate-600">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {getRelativeTime(tarea.fecha_ejecucion || tarea.fecha_solicitud)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-slate-900/50 px-4 py-3 border-t border-slate-700">
            <div className="text-sm text-slate-400">
              Total: {tareas.length} tareas
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ListView() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Cargando...</div>}>
      <ListViewInner />
    </Suspense>
  );
}
