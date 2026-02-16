/**
 * Automatismes Brevet — Engine
 *
 * Generates quick-fire questions covering all Brevet Part 1 topics:
 * - Calcul numérique (fractions, puissances, racines)
 * - Calcul littéral (développer, factoriser, résoudre)
 * - Proportionnalité / pourcentages / vitesse
 * - Probabilités / statistiques
 * - Géométrie (angles, aires, volumes, trigonométrie)
 * - Programmes de calcul / fonctions
 *
 * 3 formats: QCM, Vrai/Faux, Réponse directe
 */

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Question banks by category ─────────────────────────

function calculNumerique() {
  const generators = [
    // Fractions
    () => {
      const a = rand(1, 9), b = rand(2, 9), c = rand(1, 9), d = rand(2, 9)
      const num = a * d + c * b, den = b * d
      const g = gcd(num, den)
      return {
        category: 'Calcul',
        format: 'qcm',
        question: `Combien vaut  ${a}/${b} + ${c}/${d} ?`,
        choices: shuffle([
          { text: `${num / g}/${den / g}`, correct: true },
          { text: `${a + c}/${b + d}`, correct: false },
          { text: `${num}/${den}`, correct: false },
          { text: `${a + c}/${b * d}`, correct: false },
        ]),
      }
    },
    // Puissance de 10
    () => {
      const exp = rand(2, 6)
      const val = Math.pow(10, exp)
      return {
        category: 'Calcul',
        format: 'input',
        question: `Combien vaut 10${superChar(exp)} ?`,
        answer: String(val),
        acceptedAnswers: [String(val)],
      }
    },
    // Carré parfait
    () => {
      const n = rand(2, 15)
      const sq = n * n
      return {
        category: 'Calcul',
        format: 'input',
        question: `Combien vaut √${sq} ?`,
        answer: String(n),
        acceptedAnswers: [String(n)],
      }
    },
    // Priorité opérations
    () => {
      const a = rand(2, 8), b = rand(2, 5), c = rand(1, 9)
      const result = a + b * c
      return {
        category: 'Calcul',
        format: 'qcm',
        question: `Combien vaut  ${a} + ${b} × ${c} ?`,
        choices: shuffle([
          { text: `${result}`, correct: true },
          { text: `${(a + b) * c}`, correct: false },
          { text: `${a * b + c}`, correct: false },
          { text: `${a + b + c}`, correct: false },
        ]),
      }
    },
    // Opposé / inverse
    () => {
      const n = rand(2, 12)
      const isOppose = Math.random() < 0.5
      if (isOppose) {
        return {
          category: 'Calcul',
          format: 'input',
          question: `Quel est l'opposé de ${n} ?`,
          answer: String(-n),
          acceptedAnswers: [String(-n), `−${n}`],
        }
      }
      return {
        category: 'Calcul',
        format: 'qcm',
        question: `Quel est l'inverse de ${n} ?`,
        choices: shuffle([
          { text: `1/${n}`, correct: true },
          { text: `−${n}`, correct: false },
          { text: `${n}/1`, correct: false },
          { text: `−1/${n}`, correct: false },
        ]),
      }
    },
    // Puissance négative
    () => {
      const base = rand(2, 5)
      return {
        category: 'Calcul',
        format: 'qcm',
        question: `Combien vaut  ${base}${superChar(-1)} ?`,
        choices: shuffle([
          { text: `1/${base}`, correct: true },
          { text: `−${base}`, correct: false },
          { text: `−1/${base}`, correct: false },
          { text: `${base}`, correct: false },
        ]),
      }
    },
  ]
  return pickFrom(generators)()
}

function calculLitteral() {
  const generators = [
    // Développer
    () => {
      const a = rand(2, 6), b = rand(1, 9)
      return {
        category: 'Algèbre',
        format: 'qcm',
        question: `Développer :  ${a}(x + ${b})`,
        choices: shuffle([
          { text: `${a}x + ${a * b}`, correct: true },
          { text: `${a}x + ${b}`, correct: false },
          { text: `${a + b}x`, correct: false },
          { text: `x + ${a * b}`, correct: false },
        ]),
      }
    },
    // Résoudre équation simple
    () => {
      const sol = rand(-8, 8)
      const a = rand(2, 7)
      const b = a * sol
      return {
        category: 'Algèbre',
        format: 'input',
        question: `Résoudre :  ${a}x = ${b}`,
        answer: String(sol),
        acceptedAnswers: [String(sol)],
      }
    },
    // Identité remarquable (a+b)²
    () => {
      const a = rand(1, 5), b = rand(1, 5)
      return {
        category: 'Algèbre',
        format: 'qcm',
        question: `Développer :  (${a}x + ${b})²`,
        choices: shuffle([
          { text: `${a * a}x² + ${2 * a * b}x + ${b * b}`, correct: true },
          { text: `${a * a}x² + ${b * b}`, correct: false },
          { text: `${a * a}x² + ${a * b}x + ${b * b}`, correct: false },
          { text: `${a * a}x² − ${2 * a * b}x + ${b * b}`, correct: false },
        ]),
      }
    },
    // Factoriser avec facteur commun
    () => {
      const k = rand(2, 6), a = rand(1, 9), b = rand(1, 9)
      return {
        category: 'Algèbre',
        format: 'qcm',
        question: `Factoriser :  ${k * a}x + ${k * b}`,
        choices: shuffle([
          { text: `${k}(${a}x + ${b})`, correct: true },
          { text: `${a}(${k}x + ${b})`, correct: false },
          { text: `${k * a}(x + ${b})`, correct: false },
          { text: `x(${k * a} + ${k * b})`, correct: false },
        ]),
      }
    },
  ]
  return pickFrom(generators)()
}

function proportionnalite() {
  const generators = [
    // Pourcentage
    () => {
      const pct = pickFrom([10, 15, 20, 25, 30, 50])
      const base = pickFrom([40, 60, 80, 100, 120, 200, 300])
      const result = (pct * base) / 100
      return {
        category: 'Proportions',
        format: 'input',
        question: `Combien font ${pct} % de ${base} ?`,
        answer: String(result),
        acceptedAnswers: [String(result)],
      }
    },
    // Vitesse / distance / temps
    () => {
      const v = pickFrom([30, 40, 50, 60, 80, 100])
      const t = pickFrom([2, 3, 4, 5])
      const d = v * t
      const variant = rand(0, 2)
      if (variant === 0) {
        return {
          category: 'Proportions',
          format: 'input',
          question: `Un véhicule roule à ${v} km/h pendant ${t} h.\nQuelle distance parcourt-il (en km) ?`,
          answer: String(d),
          acceptedAnswers: [String(d)],
        }
      } else if (variant === 1) {
        return {
          category: 'Proportions',
          format: 'input',
          question: `Un véhicule parcourt ${d} km en ${t} h.\nQuelle est sa vitesse (en km/h) ?`,
          answer: String(v),
          acceptedAnswers: [String(v)],
        }
      }
      return {
        category: 'Proportions',
        format: 'input',
        question: `Un véhicule roule à ${v} km/h.\nCombien de temps (en h) pour parcourir ${d} km ?`,
        answer: String(t),
        acceptedAnswers: [String(t)],
      }
    },
    // Échelle
    () => {
      const echelle = pickFrom([100, 200, 500, 1000, 2000])
      const plan = rand(2, 15)
      const reel = plan * echelle
      return {
        category: 'Proportions',
        format: 'input',
        question: `Sur un plan à l'échelle 1/${echelle}, un segment mesure ${plan} cm.\nQuelle est la longueur réelle (en cm) ?`,
        answer: String(reel),
        acceptedAnswers: [String(reel)],
      }
    },
  ]
  return pickFrom(generators)()
}

function probabilitesStats() {
  const generators = [
    // Probabilité simple
    () => {
      const total = pickFrom([6, 8, 10, 12, 20])
      const favorable = rand(1, total - 1)
      const g = gcd(favorable, total)
      return {
        category: 'Probas',
        format: 'qcm',
        question: `Un sac contient ${total} boules. ${favorable} sont rouges.\nQuelle est la probabilité de tirer une boule rouge ?`,
        choices: shuffle([
          { text: `${favorable / g}/${total / g}`, correct: true },
          { text: `${total - favorable}/${total}`, correct: false },
          { text: `${favorable}/${total + favorable}`, correct: false },
          { text: `1/${total}`, correct: false },
        ]),
      }
    },
    // Moyenne
    () => {
      const n = rand(3, 5)
      const values = Array.from({ length: n }, () => rand(5, 18))
      const sum = values.reduce((a, b) => a + b, 0)
      const mean = sum / n
      if (mean !== Math.floor(mean)) return probabilitesStats() // retry for clean answer
      return {
        category: 'Probas',
        format: 'input',
        question: `Quelle est la moyenne de : ${values.join(' ; ')} ?`,
        answer: String(mean),
        acceptedAnswers: [String(mean)],
      }
    },
    // Événement contraire
    () => {
      const pNum = rand(1, 9)
      const pDen = 10
      const g = gcd(pNum, pDen)
      const cNum = pDen - pNum
      const gc = gcd(cNum, pDen)
      return {
        category: 'Probas',
        format: 'qcm',
        question: `La probabilité d'un événement A est ${pNum / g}/${pDen / g}.\nQuelle est la probabilité de l'événement contraire ?`,
        choices: shuffle([
          { text: `${cNum / gc}/${pDen / gc}`, correct: true },
          { text: `${pNum / g}/${pDen / g}`, correct: false },
          { text: `1/${pDen / g}`, correct: false },
          { text: `${pDen / g}/${cNum / gc}`, correct: false },
        ]),
      }
    },
  ]
  return pickFrom(generators)()
}

function geometrie() {
  const generators = [
    // Aire rectangle
    () => {
      const l = rand(3, 12), w = rand(2, 10)
      return {
        category: 'Géométrie',
        format: 'input',
        question: `Aire d'un rectangle de longueur ${l} cm et largeur ${w} cm (en cm²) ?`,
        answer: String(l * w),
        acceptedAnswers: [String(l * w)],
      }
    },
    // Périmètre cercle
    () => {
      const r = rand(2, 10)
      const d = 2 * r
      return {
        category: 'Géométrie',
        format: 'qcm',
        question: `Quel est le périmètre d'un cercle de rayon ${r} cm ?`,
        choices: shuffle([
          { text: `${d}π cm`, correct: true },
          { text: `${r}π cm`, correct: false },
          { text: `${r * r}π cm`, correct: false },
          { text: `${d + d} cm`, correct: false },
        ]),
      }
    },
    // Volume cube
    () => {
      const c = rand(2, 8)
      return {
        category: 'Géométrie',
        format: 'input',
        question: `Volume d'un cube d'arête ${c} cm (en cm³) ?`,
        answer: String(c ** 3),
        acceptedAnswers: [String(c ** 3)],
      }
    },
    // Angles d'un triangle
    () => {
      const a = rand(30, 80), b = rand(20, 150 - a)
      const c = 180 - a - b
      return {
        category: 'Géométrie',
        format: 'input',
        question: `Un triangle a deux angles de ${a}° et ${b}°.\nQuel est le troisième angle (en °) ?`,
        answer: String(c),
        acceptedAnswers: [String(c)],
      }
    },
    // Aire triangle
    () => {
      const base = pickFrom([4, 6, 8, 10, 12])
      const h = pickFrom([3, 5, 6, 7, 8])
      const aire = (base * h) / 2
      return {
        category: 'Géométrie',
        format: 'input',
        question: `Aire d'un triangle de base ${base} cm et hauteur ${h} cm (en cm²) ?`,
        answer: String(aire),
        acceptedAnswers: [String(aire)],
      }
    },
    // Angles alternes-internes / correspondants
    () => {
      const angle = rand(30, 150)
      return {
        category: 'Géométrie',
        format: 'vraifaux',
        question: `Deux droites parallèles sont coupées par une sécante.\nSi un angle vaut ${angle}°, l'angle alterne-interne vaut aussi ${angle}°.`,
        answer: true,
      }
    },
  ]
  return pickFrom(generators)()
}

function fonctions() {
  const generators = [
    // Image par une fonction
    () => {
      const a = rand(2, 6), b = rand(-8, 8)
      const x = rand(-5, 5)
      const y = a * x + b
      const bSign = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`
      return {
        category: 'Fonctions',
        format: 'input',
        question: `f(x) = ${a}x ${bSign}\nCalculer f(${x}).`,
        answer: String(y),
        acceptedAnswers: [String(y)],
      }
    },
    // Antécédent
    () => {
      const a = rand(2, 5), b = rand(-5, 5)
      const x = rand(-4, 6)
      const y = a * x + b
      const bSign = b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`
      return {
        category: 'Fonctions',
        format: 'input',
        question: `f(x) = ${a}x ${bSign}\nTrouver x tel que f(x) = ${y}.`,
        answer: String(x),
        acceptedAnswers: [String(x)],
      }
    },
    // Lecture graphique coefficient directeur
    () => {
      const a = pickFrom([1, 2, 3, -1, -2, -3])
      const nature = a > 0 ? 'croissante' : 'décroissante'
      return {
        category: 'Fonctions',
        format: 'vraifaux',
        question: `La fonction f(x) = ${a}x + 1 est ${nature}.`,
        answer: true,
      }
    },
  ]
  return pickFrom(generators)()
}

// ─── Utilities ──────────────────────────────────────────

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b)
  while (b) { [a, b] = [b, a % b] }
  return a
}

function superChar(n) {
  const map = { '-': '\u207B', '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3',
    '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079' }
  return String(n).split('').map(c => map[c] || c).join('')
}

// ─── Public API ─────────────────────────────────────────

const CATEGORIES = [
  calculNumerique,
  calculLitteral,
  proportionnalite,
  probabilitesStats,
  geometrie,
  fonctions,
]

/**
 * Generate a full session of N questions, balanced across categories.
 */
export function generateSession(count = 10) {
  const questions = []
  for (let i = 0; i < count; i++) {
    const gen = CATEGORIES[i % CATEGORIES.length]
    questions.push(gen())
  }
  return shuffle(questions)
}

/**
 * Check if a user answer matches the expected answer.
 */
export function checkAnswer(question, userAnswer) {
  const clean = userAnswer.trim().replace(',', '.').replace(/\s/g, '')

  if (question.format === 'qcm') {
    return question.choices.find((c) => c.correct)?.text === userAnswer
  }

  if (question.format === 'vraifaux') {
    const asBool = clean === 'vrai' || clean === 'true' || clean === 'oui'
    return asBool === question.answer
  }

  // Input format
  if (question.acceptedAnswers) {
    return question.acceptedAnswers.some((a) => {
      const expected = a.replace(',', '.').replace(/\s/g, '')
      return clean === expected
    })
  }

  return clean === String(question.answer).replace(',', '.')
}

export const CATEGORY_COLORS = {
  Calcul: 'bg-amber-500/20 text-amber-400',
  Algèbre: 'bg-blue-500/20 text-blue-400',
  Proportions: 'bg-emerald-500/20 text-emerald-400',
  Probas: 'bg-pink-500/20 text-pink-400',
  Géométrie: 'bg-purple-500/20 text-purple-400',
  Fonctions: 'bg-cyan-500/20 text-cyan-400',
}
