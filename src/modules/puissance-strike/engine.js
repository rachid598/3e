/**
 * Puissance-Strike question engine.
 *
 * Each question asks the student to rewrite a number × 10^n
 * by moving the decimal point so that the coefficient is in
 * scientific notation (1 ≤ a < 10), or to manipulate powers.
 */

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Build a question object.
 *
 * @returns {{
 *   coefficient: number,     — the starting number (e.g. 45)
 *   exponent: number,        — starting exponent (e.g. 2)
 *   targetCoefficient: number, — scientific coeff (e.g. 4.5)
 *   targetExponent: number,  — scientific exp (e.g. 3)
 *   digits: string[],        — digit chars for display
 *   initialDecimalPos: number, — decimal position from left (index)
 *   targetDecimalPos: number,  — target position
 * }}
 */
function buildQuestion(coefficient, exponent) {
  // Normalize to scientific notation: a × 10^n, 1 ≤ a < 10
  const str = String(coefficient)
  const intDigits = str.length // e.g. 45 → 2 digits
  const shift = intDigits - 1 // how many positions the decimal moves left
  const targetCoefficient = coefficient / Math.pow(10, shift)
  const targetExponent = exponent + shift

  // Represent as digit array with enough room
  // We show digits with trailing zeros if needed
  const digits = str.split('')
  // Ensure we have at least one extra position for the decimal to land
  while (digits.length < 6) digits.push('0')

  return {
    coefficient,
    exponent,
    targetCoefficient: Math.round(targetCoefficient * 1e10) / 1e10,
    targetExponent,
    digits,
    initialDecimalPos: intDigits, // decimal is after all integer digits
    targetDecimalPos: 1, // scientific notation: after first digit
  }
}

export function generateQuestion(level) {
  switch (level) {
    case 1: {
      // N1: Positive powers (10, 100, 1000)
      const coefficients = [25, 45, 125, 360, 72, 58, 340, 150, 4800, 230]
      const exponents = [1, 2, 3]
      const coefficient = pickFrom(coefficients)
      const exponent = pickFrom(exponents)
      return buildQuestion(coefficient, exponent)
    }
    case 2: {
      // N2: Negative powers (0.1, 0.01, 0.001)
      const coefficients = [35, 78, 420, 56, 915, 63, 250, 180, 47, 82]
      const exponents = [-1, -2, -3]
      const coefficient = pickFrom(coefficients)
      const exponent = pickFrom(exponents)
      return buildQuestion(coefficient, exponent)
    }
    case 3: {
      // N3: Full scientific notation — mixed exponents
      const coefficients = [12, 345, 67, 8900, 456, 23, 7050, 1200, 89, 5600]
      const exponent = rand(-5, 8)
      const coefficient = pickFrom(coefficients)
      return buildQuestion(coefficient, exponent)
    }
    default:
      return generateQuestion(1)
  }
}

export function formatPower(exp) {
  return `10${superscript(exp)}`
}

export function superscript(n) {
  const map = { '-': '\u207B', '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3',
    '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079' }
  return String(n).split('').map(c => map[c] || c).join('')
}

export const LEVEL_LABELS = {
  1: { name: 'Niveau 1', desc: 'Puissances positives', color: 'text-emerald-400' },
  2: { name: 'Niveau 2', desc: 'Puissances négatives', color: 'text-blue-400' },
  3: { name: 'Niveau 3', desc: 'Écriture scientifique', color: 'text-purple-400' },
}
