import { useKoleksiContext } from '../context/KoleksiContext.jsx'

function hitung(items, kunci) {
  const hasil = {}
  for (const item of items) {
    const nilai = item[kunci]
    if (nilai === '' || nilai === null || nilai === undefined) {
      continue
    }
    hasil[nilai] = (hasil[nilai] || 0) + 1
  }
  return Object.entries(hasil).sort((a, b) => b[1] - a[1])
}

export default function Statistik() {
  const { items, loading, error } = useKoleksiContext()

  if (loading) {
    return <p>Memuat...</p>
  }
  if (error) {
    return <p role="alert">{error}</p>
  }

  const perTeknologi = hitung(items, 'teknologi')
  const perTahun = hitung(items, 'tahun')
  const perKategori = hitung(items, 'kategori')

  return (
    <section>
      <h1>Statistik</h1>
      <p>Total proyek: {items.length}</p>
      <h2>Jumlah per Kategori</h2>
      <table>
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Jumlah</th>
          </tr>
        </thead>
        <tbody>
          {perKategori.map(([kategori, jumlah]) => (
            <tr key={kategori}>
              <td>{kategori}</td>
              <td>{jumlah}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Jumlah per Teknologi</h2>
      <ul>
        {perTeknologi.map(([teknologi, jumlah]) => (
          <li key={teknologi}>
            {teknologi}: {jumlah}
          </li>
        ))}
      </ul>
      <h2>Jumlah per Tahun</h2>
      <ul>
        {perTahun.map(([tahun, jumlah]) => (
          <li key={tahun}>
            {tahun}: {jumlah}
          </li>
        ))}
      </ul>
    </section>
  )
}
