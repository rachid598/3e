import { Zap, Variable, Scissors, Triangle, Brain, Lock, LogOut } from 'lucide-react'

const GAMES = [
  {
    id: 'automatismes',
    title: 'Automatismes',
    description: 'Entraînement rapide multi-domaines — type Brevet',
    icon: Brain,
    color: 'from-cyan-500 to-teal-600',
    active: true,
  },
  {
    id: 'puissance-strike',
    title: 'Puissance-Strike',
    description: 'Puissances de 10 & écriture scientifique',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
    active: true,
  },
  {
    id: 'calcul-litteral',
    title: 'Calcul Littéral',
    description: 'Développer, factoriser, identités remarquables',
    icon: Variable,
    color: 'from-blue-500 to-indigo-600',
    active: false,
  },
  {
    id: 'frac-strike',
    title: 'Frac-Strike',
    description: 'Simplifie les fractions en trouvant le diviseur commun',
    icon: Scissors,
    color: 'from-rose-500 to-pink-600',
    active: true,
  },
  {
    id: 'theoremes',
    title: 'Théorèmes',
    description: 'Pythagore, Thalès et réciproques',
    icon: Triangle,
    color: 'from-purple-500 to-violet-600',
    active: true,
  },
]

export default function Hub({ player, onSelectGame, onLogout }) {
  return (
    <div className="min-h-dvh px-4 pb-8 pt-6">
      {/* Header */}
      <div className="mx-auto mb-6 flex max-w-lg items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Maths <span className="text-accent">3e</span>
          </h1>
          <p className="text-sm text-slate-400">Brevet Ready</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">{player.name}</p>
            <p className="text-xs text-slate-400">{player.classe}</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-surface-light hover:text-white"
            title="Déconnexion"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Game Cards */}
      <div className="mx-auto grid max-w-lg gap-4">
        {GAMES.map((game) => {
          const Icon = game.icon
          return (
            <button
              key={game.id}
              onClick={() => game.active && onSelectGame(game.id)}
              disabled={!game.active}
              className={`group relative flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
                game.active
                  ? 'border-slate-700 bg-surface hover:border-accent hover:shadow-lg hover:shadow-accent/10'
                  : 'cursor-not-allowed border-slate-800 bg-surface/50 opacity-50'
              }`}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${game.color}`}
              >
                {game.active ? (
                  <Icon className="h-7 w-7 text-white" />
                ) : (
                  <Lock className="h-6 w-6 text-white/60" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold">{game.title}</h3>
                <p className="text-sm text-slate-400">{game.description}</p>
              </div>
              {game.active && (
                <span className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-bold text-accent">
                  JOUER
                </span>
              )}
              {!game.active && (
                <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-xs text-slate-400">
                  Bientôt
                </span>
              )}
            </button>
          )
        })}
      </div>

      <p className="mt-8 text-center text-xs text-slate-600">
        Maths-3e v1.0 — Données stockées localement
      </p>
    </div>
  )
}
