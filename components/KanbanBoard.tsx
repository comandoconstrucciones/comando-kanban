'use client';

import { useState, useEffect } from 'react';
import { Tarea, Estado, Categoria, Prioridad, Origen } from '@/lib/types';
import { fetchTareas } from '@/lib/api';
import KanbanColumn from './KanbanColumn';

const ESTADOS: Estado[] = ['backlog', 'pendiente', 'en_progreso', 'completada', 'bloqueada'];

interface KanbanBoardProps {
  agentId?: string;
}

export default function KanbanBoard({ agentId }: KanbanBoardProps) {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState<Categoria | ''>('');
  const [filterPrioridad, setFilterPrioridad] = useState<Prioridad | ''>('');
  const [filterOrigen, setFilterOrigen] = useState<Origen | ''>('');
  
  const loadTareas = async () => {
    setLoading(true);
    const data = await fetchTareas(agentId);
    setTareas(data);
    setLastUpdate(new Date());
    setLoading(false);
  };
  
  useEffect(() => {
    loadTareas();
    const interval = setInterval(loadTareas, 30000);
    return () => clearInterval(interval);
  }, [agentId]); // reload when agent changes
  
  const filteredTareas = tareas.filter(tarea => {
    if (searchTerm && !tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !tarea.descripcion.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filterCategoria && tarea.categoria !== filterCategoria) return false;
    if (filterPrioridad && tarea.prioridad !== filterPrioridad) return false;
    if (filterOrigen && tarea.origen !== filterOrigen) return false;
    return true;
  });
  
  return (
    <div>
      {/* Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="🔍 Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] bg-slate-900 text-white border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          
          <select
            value={filterCategoria}
            onChange={(e) => setFilterCategoria(e.target.value as Categoria | '')}
            className="bg-slate-900 text-white border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Todas las categorías</option>
            <option value="Administración">📅 Administración</option>
            <option value="Finanzas">💰 Finanzas</option>
            <option value="Proyectos">🏗️ Proyectos</option>
            <option value="Marketing">📱 Marketing</option>
            <option value="Tech">💻 Tech</option>
            <option value="Legal/RRHH">📋 Legal/RRHH</option>
            <option value="Comunicación">📞 Comunicación</option>
            <option value="Sistema">🔧 Sistema</option>
          </select>
          
          <select
            value={filterPrioridad}
            onChange={(e) => setFilterPrioridad(e.target.value as Prioridad | '')}
            className="bg-slate-900 text-white border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Todas las prioridades</option>
            <option value="alta">🔴 Alta</option>
            <option value="media">🟡 Media</option>
            <option value="baja">🟢 Baja</option>
          </select>
          
          <select
            value={filterOrigen}
            onChange={(e) => setFilterOrigen(e.target.value as Origen | '')}
            className="bg-slate-900 text-white border border-slate-600 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Todos los orígenes</option>
            <option value="telegram">💬 Telegram</option>
            <option value="heartbeat">💓 Heartbeat</option>
            <option value="automatico">🤖 Automático</option>
            <option value="manual">✍️ Manual</option>
          </select>
          
          <button
            onClick={loadTareas}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            {loading ? '⏳' : '🔄'} Actualizar
          </button>
        </div>
        
        <div className="mt-3 text-sm text-slate-400 flex items-center gap-4">
          <span>Total: {filteredTareas.length} tareas</span>
          <span>•</span>
          <span>Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}</span>
        </div>
      </div>
      
      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {ESTADOS.map(estado => (
          <KanbanColumn
            key={estado}
            estado={estado}
            tareas={filteredTareas}
          />
        ))}
      </div>
    </div>
  );
}
