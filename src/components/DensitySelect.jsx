import { useFont } from "../theme/FontProvider";

export default function DensitySelect({ className = "" }) {
  const { densityKey, setDensityKey, densityOptions } = useFont();

  return (
    <div className={className} style={{ display:'flex', gap:12, alignItems:'center' }}>
      <label htmlFor="density-select" style={{ fontSize:14, color:'var(--muted)' }}>
        Densidad
      </label>
      <select
        id="density-select"
        className="btn"
        value={densityKey}
        onChange={(e) => setDensityKey(e.target.value)}
        style={{ padding:'8px 10px' }}
      >
        {densityOptions.map(opt => (
          <option key={opt.key} value={opt.key}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
