import KanbanBoard from '@/components/KanbanBoard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Panel de Control — María Mejía</span>
                <span className="text-3xl">💼</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Asistente IA de Comando Construcciones
              </p>
            </div>
            
            <div className="flex gap-3">
              <a
                href="/dashboard"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors border border-slate-700"
              >
                📊 Dashboard
              </a>
              <a
                href="/list"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded font-medium transition-colors border border-slate-700"
              >
                📋 Lista
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <KanbanBoard />
      </div>
      
      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-slate-500 text-sm">
        <p>
          🏗️ <strong>Comando Construcciones</strong> — Tecnología al servicio de la construcción
        </p>
      </footer>
    </main>
  );
}
