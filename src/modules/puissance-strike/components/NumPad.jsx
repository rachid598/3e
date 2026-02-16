import { Delete } from 'lucide-react'

/**
 * Custom numeric keypad adapted for powers of 10.
 * Includes: digits 0-9, comma, 10^n key, +/- key, backspace, validate.
 */
export default function NumPad({ onInput, onDelete, onValidate, disabled = false }) {
  const btn = (label, value, extra = '') => (
    <button
      key={value}
      onClick={() => onInput(value)}
      disabled={disabled}
      className={`flex h-12 items-center justify-center rounded-xl font-bold transition active:scale-95 disabled:opacity-30 ${extra || 'bg-surface-light text-white hover:bg-slate-600'}`}
    >
      {label}
    </button>
  )

  return (
    <div className="mx-auto grid w-full max-w-xs grid-cols-4 gap-2">
      {btn('7', '7')}
      {btn('8', '8')}
      {btn('9', '9')}
      <button
        onClick={onDelete}
        disabled={disabled}
        className="flex h-12 items-center justify-center rounded-xl bg-surface-light text-slate-400 transition hover:bg-slate-600 hover:text-white active:scale-95 disabled:opacity-30"
      >
        <Delete className="h-5 w-5" />
      </button>

      {btn('4', '4')}
      {btn('5', '5')}
      {btn('6', '6')}
      {btn('×10', '×10', 'bg-primary-light text-accent hover:bg-primary')}

      {btn('1', '1')}
      {btn('2', '2')}
      {btn('3', '3')}
      {btn('+/−', '+-', 'bg-primary-light text-blue-400 hover:bg-primary')}

      {btn(',', ',')}
      {btn('0', '0')}
      <button
        onClick={onValidate}
        disabled={disabled}
        className="col-span-2 flex h-12 items-center justify-center rounded-xl bg-accent font-bold text-black transition hover:bg-accent-light active:scale-95 disabled:opacity-30"
      >
        Valider
      </button>
    </div>
  )
}
