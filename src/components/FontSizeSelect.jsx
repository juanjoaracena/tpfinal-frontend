import { useFont } from "../theme/FontProvider";

export default function FontSizeSelect({ className = "" }) {
  const { fontSizeKey, setFontSizeKey, sizeOptions } = useFont();

  return (
    <div className={className} style={{ display:'flex', gap:12, alignItems:'center' }}>
      <label htmlFor="font-size-select" style={{ fontSize:14, color:'var(--muted)' }}>
        Tamaño
      </label>
      <select
        id="font-size-select"
        className="btn"
        value={fontSizeKey}
        onChange={(e) => setFontSizeKey(e.target.value)}
        style={{ padding:'8px 10px' }}
      >
        {sizeOptions.map(opt => (
          <option key={opt.key} value={opt.key}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
