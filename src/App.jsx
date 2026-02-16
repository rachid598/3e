import { useState } from 'react'
import { usePlayer } from './hooks/usePlayer'
import PlayerModal from './components/PlayerModal'
import Hub from './pages/Hub'
import PuissanceStrike from './modules/puissance-strike/PuissanceStrike'
import Theoremes from './modules/theoremes/Theoremes'

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

  // Hub / home screen
  return (
    <Hub
      player={player}
      onSelectGame={setCurrentGame}
      onLogout={logout}
    />
  )
}
