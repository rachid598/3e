import { superscript } from '../engine'

/**
 * Displays the transformation history chain:
 *   4500 = 450 × 10¹ = 45 × 10² = 4,5 × 10³
 */
export default function TransformChain({ steps }) {
  if (!steps || steps.length === 0) return null

  return (
    <div className="mx-auto max-w-sm rounded-xl bg-surface/70 px-4 py-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
        Chaîne de transformation
      </p>
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
        {steps.map((step, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-slate-500">=</span>}
            <span className={i === steps.length - 1 ? 'font-bold text-accent' : 'text-slate-300'}>
              {step.display} × 10{superscript(step.exponent)}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
