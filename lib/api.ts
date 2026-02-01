import { Tarea, AgentConfig, AGENTS } from './types';

function getCsvUrl(sheetId: string): string {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
}

export function getAgent(agentId: string): AgentConfig {
  return AGENTS.find(a => a.id === agentId) || AGENTS[0];
}

export function getDefaultAgentId(): string {
  return AGENTS[0].id;
}

export async function fetchTareas(agentId?: string): Promise<Tarea[]> {
  const agent = agentId ? getAgent(agentId) : AGENTS[0];
  const csvUrl = getCsvUrl(agent.sheetId);

  try {
    const response = await fetch(csvUrl, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    const csvText = await response.text();
    const lines = csvText.split('\n');
    
    const dataLines = lines.slice(1).filter(line => line.trim());
    
    const tareas: Tarea[] = dataLines.map(line => {
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      return {
        id: values[0] || '',
        titulo: values[1] || '',
        descripcion: values[2] || '',
        categoria: (values[3] || 'Tech') as Tarea['categoria'],
        estado: (values[4] || 'pendiente') as Tarea['estado'],
        prioridad: (values[5] || 'media') as Tarea['prioridad'],
        fecha_solicitud: values[6] || '',
        fecha_ejecucion: values[7] || '',
        duracion_seg: parseFloat(values[8]) || 0,
        costo_usd: parseFloat(values[9]) || 0,
        origen: (values[10] || 'manual') as Tarea['origen'],
        notas: values[11] || '',
      };
    });
    
    return tareas;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export function getRelativeTime(isoDate: string): string {
  if (!isoDate) return '';
  
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  
  if (diffSec < 60) return 'hace un momento';
  if (diffMin < 60) return `hace ${diffMin}m`;
  if (diffHour < 24) return `hace ${diffHour}h`;
  if (diffDay < 7) return `hace ${diffDay}d`;
  
  return date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
}
