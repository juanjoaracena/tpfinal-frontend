import { useTheme } from '../theme/ThemeProvider';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggle}
      className={`btn ${className}`}
      aria-label="Cambiar tema claro/oscuro"
      title="Cambiar tema"
    >
      {isDark ? '🌙 Oscuro' : '☀️ Claro'}
    </button>
  );
}
