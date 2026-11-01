export default function SearchInput({ value, onChange }) {
  return (
    <input
      type="search"
      aria-label="Cari judul"
      placeholder="Cari judul..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
