import { Link } from 'react-router-dom'

// Tabel koleksi: kolom Teknologi, Tahun, dan Tautan.
// Judul ditampilkan sebagai tautan ke halaman detail.
export default function KoleksiTable({ items }) {
  if (items.length === 0) {
    return <p>Belum ada proyek yang cocok.</p>
  }
  return (
    <table className="tabel-koleksi">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Teknologi</th>
          <th>Tahun</th>
          <th>Tautan</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <Link to={`/koleksi/${item.id}`}>{item.judul}</Link>
            </td>
            <td>{item.teknologi}</td>
            <td>{item.tahun}</td>
            <td>
              {item.tautan ? (
                <a href={item.tautan} target="_blank" rel="noreferrer">
                  {item.tautan}
                </a>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
