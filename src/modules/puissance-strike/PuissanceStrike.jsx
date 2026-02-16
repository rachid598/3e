import { useState, useCallback } from 'react'
import { ArrowLeft, Star, RotateCcw, Trophy, ChevronRight } from 'lucide-react'
import { generateQuestion, superscript, LEVEL_LABELS } from './engine'
import DecimalSlider from './components/DecimalSlider'
import TransformChain from './components/TransformChain'
import NumPad from './components/NumPad'
import { fireSuccess, fireBigWin } from '../../utils/confetti'

const QUESTIONS_PER_ROUND = 5

function formatCoeffDisplay(digits, decimalPos) {
  // Build human-readable coefficient from digits + decimal position
  const intPart = digits.slice(0, decimalPos).join('') || '0'
  const fracPart = digits.slice(decimalPos).join('').replace(/0+$/, '')
  if (!fracPart) return intPart
  return `${intPart},${fracPart}`
}

export default function PuissanceStrike({ onBack }) {
  const [level, setLevel] = useState(null) // null = level select
  const [question, setQuestion] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState(null) // { correct: bool, message: string }
  const [chain, setChain] = useState([])
  const [currentDecimalPos, setCurrentDecimalPos] = useState(null)
  const [currentExponent, setCurrentExponent] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [sliderKey, setSliderKey] = useState(0)

  const loadQuestion = useCallback((lvl) => {
    const q = generateQuestion(lvl)
    setSliderKey((k) => k + 1)
    setQuestion(q)
    setFeedback(null)
    setCurrentDecimalPos(q.initialDecimalPos)
    setCurrentExponent(q.exponent)
    setChain([{ display: String(q.coefficient), exponent: q.exponent }])
  }, [])

  const startLevel = useCallback((lvl) => {
    setLevel(lvl)
    setScore(0)
    setQuestionIndex(0)
    setShowResult(false)
    loadQuestion(lvl)
  }, [loadQuestion])

  const handlePositionChange = useCallback(
    (newPos, newExponent) => {
      if (!question) return
      setCurrentDecimalPos(newPos)
      setCurrentExponent(newExponent)

      const display = formatCoeffDisplay(question.digits, newPos)
      setChain((prev) => {
        // Avoid duplicates
        const last = prev[prev.length - 1]
        if (last && last.display === display && last.exponent === newExponent) return prev
        return [...prev, { display, exponent: newExponent }]
      })
    },
    [question]
  )

  const handleValidate = useCallback(() => {
    if (!question || feedback) return

    const isCorrect =
      currentDecimalPos === question.targetDecimalPos &&
      currentExponent === question.targetExponent

    if (isCorrect) {
      fireSuccess()
      setScore((s) => s + 1)
      setFeedback({ correct: true, message: 'Bravo ! Écriture scientifique correcte !' })
    } else {
      const expected = formatCoeffDisplay(question.digits, question.targetDecimalPos)
      setFeedback({
        correct: false,
        message: `La réponse était ${expected} × 10${superscript(question.targetExponent)}`,
      })
    }
  }, [question, feedback, currentDecimalPos, currentExponent])

  const handleNext = useCallback(() => {
    const nextIndex = questionIndex + 1
    if (nextIndex >= QUESTIONS_PER_ROUND) {
      if (score + (feedback?.correct ? 0 : 0) >= 3) fireBigWin()
      setShowResult(true)
      return
    }
    setQuestionIndex(nextIndex)
    loadQuestion(level)
  }, [questionIndex, level, score, feedback, loadQuestion])

  // Level selection screen
  if (level === null) {
    return (
      <div className="min-h-dvh px-4 pb-8 pt-6">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>
        <h2 className="mb-2 text-center text-2xl font-bold">
          Puissance-<span className="text-accent">Strike</span>
        </h2>
        <p className="mb-8 text-center text-sm text-slate-400">
          Déplace la virgule pour trouver l'écriture scientifique
        </p>
        <div className="mx-auto flex max-w-sm flex-col gap-3">
          {Object.entries(LEVEL_LABELS).map(([lvl, info]) => (
            <button
              key={lvl}
              onClick={() => startLevel(Number(lvl))}
              className="flex items-center justify-between rounded-2xl border border-slate-700 bg-surface p-4 transition hover:border-accent"
            >
              <div className="text-left">
                <h3 className={`font-bold ${info.color}`}>{info.name}</h3>
                <p className="text-sm text-slate-400">{info.desc}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-500" />
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Result screen
  if (showResult) {
    const pct = Math.round((score / QUESTIONS_PER_ROUND) * 100)
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center px-4">
        <Trophy className={`mb-4 h-16 w-16 ${pct >= 60 ? 'text-accent' : 'text-slate-500'}`} />
        <h2 className="mb-2 text-2xl font-bold">Résultat</h2>
        <p className="mb-1 text-4xl font-bold text-accent">
          {score}/{QUESTIONS_PER_ROUND}
        </p>
        <p className="mb-6 text-slate-400">
          {pct >= 80
            ? 'Excellent ! Tu maîtrises les puissances !'
            : pct >= 60
              ? 'Bien joué ! Continue comme ça !'
              : 'Continue à t\'entraîner, tu vas progresser !'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => startLevel(level)}
            className="flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-bold text-black transition hover:bg-accent-light"
          >
            <RotateCcw className="h-4 w-4" /> Rejouer
          </button>
          <button
            onClick={() => setLevel(null)}
            className="rounded-xl border border-slate-600 px-5 py-3 font-bold transition hover:border-accent"
          >
            Niveaux
          </button>
        </div>
      </div>
    )
  }

  // Game screen
  return (
    <div className="min-h-dvh px-4 pb-6 pt-4">
      {/* Top bar */}
      <div className="mx-auto mb-4 flex max-w-lg items-center justify-between">
        <button
          onClick={() => setLevel(null)}
          className="flex items-center gap-1 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Niveaux
        </button>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${LEVEL_LABELS[level].color}`}>
            {LEVEL_LABELS[level].name}
          </span>
          <span className="text-sm text-slate-400">
            {questionIndex + 1}/{QUESTIONS_PER_ROUND}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-accent" />
            <span className="text-sm font-bold text-accent">{score}</span>
          </div>
        </div>
      </div>

      {/* Question prompt */}
      {question && (
        <div className="mx-auto max-w-lg">
          <div className="mb-6 rounded-2xl bg-surface p-4 text-center">
            <p className="mb-1 text-sm text-slate-400">Écris en notation scientifique :</p>
            <p className="text-2xl font-bold">
              {question.coefficient}{' '}
              <span className="text-slate-400">×</span>{' '}
              <span>10{superscript(question.exponent)}</span>
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Déplace la virgule pour que le coefficient soit entre 1 et 10
            </p>
          </div>

          {/* Decimal Slider */}
          <div className="mb-4">
            <DecimalSlider
              key={sliderKey}
              digits={question.digits}
              initialDecimalPos={question.initialDecimalPos}
              baseExponent={question.exponent}
              onPositionChange={handlePositionChange}
              locked={!!feedback}
            />
          </div>

          {/* Transformation chain */}
          <div className="mb-4">
            <TransformChain steps={chain} />
          </div>

          {/* Feedback */}
          {feedback && (
            <div
              className={`mb-4 rounded-xl p-3 text-center font-medium ${
                feedback.correct
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {feedback.message}
            </div>
          )}

          {/* Actions */}
          <div className="mx-auto max-w-xs">
            {!feedback ? (
              <button
                onClick={handleValidate}
                className="w-full rounded-xl bg-accent py-3 font-bold text-black transition hover:bg-accent-light active:scale-95"
              >
                Valider ma réponse
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full rounded-xl bg-primary-light py-3 font-bold text-white transition hover:bg-primary active:scale-95"
              >
                {questionIndex + 1 >= QUESTIONS_PER_ROUND ? 'Voir le résultat' : 'Question suivante'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
