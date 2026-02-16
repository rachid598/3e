import { useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { superscript } from '../engine'

/**
 * DecimalSlider — The core pedagogical component.
 *
 * Displays a row of digit cells. The decimal point sits between two cells.
 * The student clicks ← / → arrows (or taps/swipes) to move the decimal point.
 * The exponent updates in real-time to show the invariant:
 *   moving decimal LEFT  → exponent increases by 1
 *   moving decimal RIGHT → exponent decreases by 1
 *
 * This makes the relationship between decimal position and power of 10 tangible.
 */
export default function DecimalSlider({
  digits,
  initialDecimalPos,
  baseExponent,
  onPositionChange,
  locked = false,
}) {
  const [decimalPos, setDecimalPos] = useState(initialDecimalPos)
  const shift = initialDecimalPos - decimalPos
  const currentExponent = baseExponent + shift

  const moveLeft = useCallback(() => {
    if (locked) return
    setDecimalPos((p) => {
      if (p <= 1) return p
      const next = p - 1
      onPositionChange?.(next, baseExponent + (initialDecimalPos - next))
      return next
    })
  }, [locked, baseExponent, initialDecimalPos, onPositionChange])

  const moveRight = useCallback(() => {
    if (locked) return
    setDecimalPos((p) => {
      if (p >= digits.length) return p
      const next = p + 1
      onPositionChange?.(next, baseExponent + (initialDecimalPos - next))
      return next
    })
  }, [locked, digits.length, baseExponent, initialDecimalPos, onPositionChange])

  // Build the display: digits with a comma inserted at decimalPos
  const renderDigits = () => {
    const cells = []
    for (let i = 0; i < digits.length; i++) {
      // Insert decimal indicator before this digit if position matches
      if (i === decimalPos && i > 0 && i < digits.length) {
        cells.push(
          <span
            key={`dec-${i}`}
            className="mx-0.5 text-3xl font-bold text-accent animate-pulse"
          >
            ,
          </span>
        )
      }
      const isBeforeDecimal = i < decimalPos
      const isTrailingZero = i >= decimalPos && digits[i] === '0'
      cells.push(
        <span
          key={`d-${i}`}
          className={`inline-flex h-12 w-10 items-center justify-center rounded-lg text-2xl font-bold transition-all duration-200 ${
            isTrailingZero
              ? 'bg-slate-800 text-slate-500'
              : isBeforeDecimal
                ? 'bg-primary-light text-white'
                : 'bg-surface-light text-white'
          }`}
        >
          {digits[i]}
        </span>
      )
    }
    return cells
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Exponent display */}
      <div className="rounded-xl bg-surface px-5 py-3 text-center">
        <span className="text-sm text-slate-400">Puissance actuelle</span>
        <div className="mt-1 text-3xl font-bold">
          <span className="text-slate-300">× 10</span>
          <span className="text-accent">{superscript(currentExponent)}</span>
        </div>
      </div>

      {/* Digit row */}
      <div className="flex items-center gap-1">{renderDigits()}</div>

      {/* Navigation arrows */}
      <div className="flex items-center gap-6">
        <button
          onClick={moveLeft}
          disabled={locked || decimalPos <= 1}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-white transition active:scale-90 disabled:opacity-30"
          aria-label="Déplacer la virgule à gauche"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <div className="text-center text-xs text-slate-400">
          <p>← virgule à gauche</p>
          <p className="font-bold text-accent">exposant +1</p>
        </div>
        <div className="text-center text-xs text-slate-400">
          <p>virgule à droite →</p>
          <p className="font-bold text-blue-400">exposant −1</p>
        </div>
        <button
          onClick={moveRight}
          disabled={locked || decimalPos >= digits.length}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-white transition active:scale-90 disabled:opacity-30"
          aria-label="Déplacer la virgule à droite"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>
    </div>
  )
}
