'use client';

import { useState, useEffect } from 'react';
import { Tarea, CATEGORY_EMOJI } from '@/lib/types';
import { fetchTareas } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTareas();
      setTareas(data);
      setLoading(false);
    };
    loadData();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    );
  }
  
  // Calculate metrics
  const totalTareas = tareas.length;
  const completadas = tareas.filter(t => t.estado === 'completada').length;
  const enProgreso = tareas.filter(t => t.estado === 'en_progreso').length;
  const pendientes = tareas.filter(t => t.estado === 'pendiente').length;
  const bloqueadas = tareas.filter(t => t.estado === 'bloqueada').length;
  
  const costoTotal = tareas
    .filter(t => t.estado === 'completada')
    .reduce((sum, t) => sum + t.costo_usd, 0);
  
  const duracionTotal = tareas
    .filter(t => t.estado === 'completada')
    .reduce((sum, t) => sum + t.duracion_seg, 0);
  
  // By category
  const byCategoria = tareas.reduce((acc, t) => {
    acc[t.categoria] = (acc[t.categoria] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // By priority
  const byPrioridad = tareas.reduce((acc, t) => {
    acc[t.prioridad] = (acc[t.prioridad] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>📊 Dashboard — María Mejía</span>
              </h1>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors border border-slate-700"
              >
                📋 Kanban
              </Link>
              <Link
                href="/list"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors border border-slate-700"
              >
                📝 Lista
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <div className="text-slate-400 text-sm mb-2">Total Tareas</div>
            <div className="text-4xl font-bold text-white">{totalTareas}</div>
          </div>
          
          <div className="bg-green-900/20 backdrop-blur-sm border border-green-700 rounded-lg p-6">
            <div className="text-green-400 text-sm mb-2">Completadas</div>
            <div className="text-4xl font-bold text-green-300">{completadas}</div>
            <div className="text-green-600 text-sm mt-1">
              {totalTareas > 0 ? Math.round((completadas / totalTareas) * 100) : 0}% del total
            </div>
          </div>
          
          <div className="bg-blue-900/20 backdrop-blur-sm border border-blue-700 rounded-lg p-6">
            <div className="text-blue-400 text-sm mb-2">En Progreso</div>
            <div className="text-4xl font-bold text-blue-300">{enProgreso}</div>
          </div>
          
          <div className="bg-yellow-900/20 backdrop-blur-sm border border-yellow-700 rounded-lg p-6">
            <div className="text-yellow-400 text-sm mb-2">Pendientes</div>
            <div className="text-4xl font-bold text-yellow-300">{pendientes}</div>
            {bloqueadas > 0 && (
              <div className="text-red-400 text-sm mt-1">
                ⚠️ {bloqueadas} bloqueada{bloqueadas > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
        
        {/* Cost and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <div className="text-slate-400 text-sm mb-2">Costo Total (Completadas)</div>
            <div className="text-4xl font-bold text-emerald-400 font-mono">
              ${costoTotal.toFixed(2)}
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <div className="text-slate-400 text-sm mb-2">Tiempo Total (Completadas)</div>
            <div className="text-4xl font-bold text-cyan-400">
              {Math.round(duracionTotal / 3600)}h {Math.round((duracionTotal % 3600) / 60)}m
            </div>
          </div>
        </div>
        
        {/* By Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Por Categoría</h2>
            <div className="space-y-3">
              {Object.entries(byCategoria)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count]) => (
                  <div key={cat} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{CATEGORY_EMOJI[cat as keyof typeof CATEGORY_EMOJI]}</span>
                      <span className="text-slate-300">{cat}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(count / totalTareas) * 100}%` }}
                        />
                      </div>
                      <span className="text-white font-semibold w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          {/* By Priority */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Por Prioridad</h2>
            <div className="space-y-4">
              {[
                { key: 'alta', label: 'Alta', emoji: '🔴', color: 'bg-red-500' },
                { key: 'media', label: 'Media', emoji: '🟡', color: 'bg-yellow-500' },
                { key: 'baja', label: 'Baja', emoji: '🟢', color: 'bg-green-500' },
              ].map(({ key, label, emoji, color }) => {
                const count = byPrioridad[key] || 0;
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{emoji}</span>
                      <span className="text-slate-300">{label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-slate-700 rounded-full h-2">
                        <div
                          className={`${color} h-2 rounded-full`}
                          style={{ width: `${(count / totalTareas) * 100}%` }}
                        />
                      </div>
                      <span className="text-white font-semibold w-8 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
