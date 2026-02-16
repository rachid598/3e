/**
 * Interactive SVG for Thalès configuration.
 *
 * Shows point A with two secants going to B/C and M/N,
 * with (BM) ∥ (CN) indicated.
 */
export default function ThalesFigure({ config }) {
  // A = top vertex, lines go down-left (to B then C) and down-right (to M then N)
  const A = { x: 150, y: 20 }
  const B = { x: 80, y: 100 }
  const C = { x: 50, y: 170 }
  const M = { x: 210, y: 100 }
  const N = { x: 240, y: 170 }

  const labelStyle = (value) =>
    value === '?' ? 'fill-amber-400 font-bold' : 'fill-slate-300'

  return (
    <svg viewBox="0 0 300 210" className="mx-auto h-48 w-full max-w-xs">
      {/* Secant lines from A */}
      <line x1={A.x} y1={A.y} x2={C.x} y2={C.y} stroke="#6366f1" strokeWidth="1.5" />
      <line x1={A.x} y1={A.y} x2={N.x} y2={N.y} stroke="#6366f1" strokeWidth="1.5" />

      {/* Parallel lines (BM) and (CN) */}
      <line x1={B.x} y1={B.y} x2={M.x} y2={M.y} stroke="#8b5cf6" strokeWidth="2" strokeDasharray="6 3" />
      <line x1={C.x} y1={C.y} x2={N.x} y2={N.y} stroke="#8b5cf6" strokeWidth="2" strokeDasharray="6 3" />

      {/* Parallel markers (small arrows) */}
      <text x={145} y={95} textAnchor="middle" className="fill-purple-400" fontSize="10">
        //
      </text>
      <text x={145} y={168} textAnchor="middle" className="fill-purple-400" fontSize="10">
        //
      </text>

      {/* Points */}
      {[
        { ...A, label: 'A' },
        { ...B, label: 'B' },
        { ...C, label: 'C' },
        { ...M, label: 'M' },
        { ...N, label: 'N' },
      ].map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="3" fill="#8b5cf6" />
          <text
            x={p.x + (p.label === 'A' ? 0 : p.x < 150 ? -14 : 14)}
            y={p.y + (p.label === 'A' ? -8 : 5)}
            textAnchor="middle"
            className="fill-slate-400 font-medium"
            fontSize="13"
          >
            {p.label}
          </text>
        </g>
      ))}

      {/* Segment labels */}
      {/* AB — left upper segment */}
      <text x={B.x - 24} y={(A.y + B.y) / 2 + 8} textAnchor="middle" className={labelStyle(config.AB)} fontSize="11">
        {config.AB === '?' ? '?' : config.AB}
      </text>

      {/* AC — left full segment */}
      <text x={C.x - 20} y={(B.y + C.y) / 2 + 14} textAnchor="middle" className={labelStyle(config.AC)} fontSize="11">
        {config.AC === '?' ? '?' : config.AC}
      </text>

      {/* AM — right upper segment */}
      <text x={M.x + 24} y={(A.y + M.y) / 2 + 8} textAnchor="middle" className={labelStyle(config.AM)} fontSize="11">
        {config.AM === '?' ? '?' : config.AM}
      </text>

      {/* AN — right full segment */}
      <text x={N.x + 20} y={(M.y + N.y) / 2 + 14} textAnchor="middle" className={labelStyle(config.AN)} fontSize="11">
        {config.AN === '?' ? '?' : config.AN}
      </text>
    </svg>
  )
}
