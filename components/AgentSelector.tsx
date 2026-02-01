'use client';

import { AGENTS, AgentConfig } from '@/lib/types';

interface AgentSelectorProps {
  currentAgentId: string;
  onAgentChange: (agentId: string) => void;
}

const AGENT_ACCENT: Record<string, string> = {
  blue: 'border-blue-500 bg-blue-500/10 ring-blue-500/50',
  emerald: 'border-emerald-500 bg-emerald-500/10 ring-emerald-500/50',
  purple: 'border-purple-500 bg-purple-500/10 ring-purple-500/50',
  orange: 'border-orange-500 bg-orange-500/10 ring-orange-500/50',
  pink: 'border-pink-500 bg-pink-500/10 ring-pink-500/50',
  cyan: 'border-cyan-500 bg-cyan-500/10 ring-cyan-500/50',
  red: 'border-red-500 bg-red-500/10 ring-red-500/50',
  yellow: 'border-yellow-500 bg-yellow-500/10 ring-yellow-500/50',
};

const AGENT_INACTIVE = 'border-slate-600 bg-slate-800/50 hover:bg-slate-700/50 hover:border-slate-500';

export default function AgentSelector({ currentAgentId, onAgentChange }: AgentSelectorProps) {
  if (AGENTS.length <= 1) return null; // Hide if only one agent

  return (
    <div className="flex items-center gap-2">
      {AGENTS.map((agent: AgentConfig) => {
        const isActive = agent.id === currentAgentId;
        const accent = AGENT_ACCENT[agent.color] || AGENT_ACCENT.blue;

        return (
          <button
            key={agent.id}
            onClick={() => onAgentChange(agent.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
              isActive ? `${accent} ring-2` : AGENT_INACTIVE
            }`}
          >
            <span className="text-xl">{agent.emoji}</span>
            <div className="text-left">
              <div className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                {agent.name}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
