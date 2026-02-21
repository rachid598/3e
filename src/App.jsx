import { useState } from 'react'
import { usePlayer } from './hooks/usePlayer'
import PlayerModal from './components/PlayerModal'
import Hub from './pages/Hub'
import PuissanceStrike from './modules/puissance-strike/PuissanceStrike'
import Theoremes from './modules/theoremes/Theoremes'
import Automatismes from './modules/automatismes/Automatismes'
import FracStrike from './modules/frac-strike/FracStrike'
import FonctionsInteractives from './modules/FonctionsInteractives/FonctionsInteractives'
import TheoremeArena from './modules/TheoremeArena/TheoremeArena'

export default function App() {
  const { player, register, logout } = usePlayer()
  const [currentGame, setCurrentGame] = useState(null)

  // Show registration modal if no player
  if (!player) {
    return <PlayerModal onRegister={register} />
  }

  // Render current game module
  if (currentGame === 'puissance-strike') {
    return <PuissanceStrike onBack={() => setCurrentGame(null)} />
  }
  if (currentGame === 'theoremes') {
    return <Theoremes onBack={() => setCurrentGame(null)} />
  }
  if (currentGame === 'automatismes') {
    return <Automatismes onBack={() => setCurrentGame(null)} />
  }
  if (currentGame === 'frac-strike') {
    return <FracStrike onBack={() => setCurrentGame(null)} />
  }
  if (currentGame === 'fonctions-interactives') {
    return <FonctionsInteractives onBack={() => setCurrentGame(null)} />
  }
  if (currentGame === 'theoreme-arena') {
    return <TheoremeArena onBack={() => setCurrentGame(null)} />
  }

  // Hub / home screen
  return (
    <Hub
      player={player}
      onSelectGame={setCurrentGame}
      onLogout={logout}
    />
  )
}
