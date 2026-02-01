'use client';

import { useState } from 'react';
import { AGENTS } from '@/lib/types';
import { getAgent, getDefaultAgentId } from '@/lib/api';
import KanbanBoard from '@/components/KanbanBoard';
import AgentSelector from '@/components/AgentSelector';

export default function Home() {
  const [agentId, setAgentId] = useState(getDefaultAgentId());
  const agent = getAgent(agentId);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Panel de Control — {agent.name}</span>
                <span className="text-3xl">{agent.emoji}</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">{agent.subtitle}</p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <AgentSelector currentAgentId={agentId} onAgentChange={setAgentId} />
              <div className="flex gap-2">
                <a
                  href={`/dashboard?agent=${agentId}`}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors border border-slate-700"
                >
                  📊 Dashboard
                </a>
                <a
                  href={`/list?agent=${agentId}`}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors border border-slate-700"
                >
                  📋 Lista
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <KanbanBoard agentId={agentId} />
      </div>
      
      <footer className="mt-12 py-6 text-center text-slate-500 text-sm">
        <p>
          🏗️ <strong>Comando Construcciones</strong> — Tecnología al servicio de la construcción
        </p>
      </footer>
    </main>
  );
}
