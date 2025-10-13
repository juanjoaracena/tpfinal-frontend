import { useFont } from "../theme/FontProvider";

export default function FontSelect({ className = "" }) {
  const { fontKey, setFontKey, options } = useFont();

  return (
    <div className={className} style={{ display:'flex', gap:12, alignItems:'center' }}>
      <label htmlFor="font-select" style={{ fontSize:14, color:'var(--muted)' }}>Fuente</label>
      <select
        id="font-select"
        className="btn" /* reutilizo tu estilo de botón para tener borde/colores del tema */
        value={fontKey}
        onChange={(e) => setFontKey(e.target.value)}
        style={{ padding:'8px 10px' }}
      >
        {options.map(opt => (
          <option key={opt.key} value={opt.key}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
