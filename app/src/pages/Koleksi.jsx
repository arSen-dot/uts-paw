import KoleksiTable from '../components/KoleksiTable.jsx'
import SearchInput from '../components/SearchInput.jsx'
import { useKoleksiContext } from '../context/KoleksiContext.jsx'
import useLocalStorage from '../hooks/useLocalStorage.js'

export default function Koleksi() {
  const { items, loading, error } = useKoleksiContext()
  const [cari, setCari] = useLocalStorage('portofolio-cari', '')

  if (loading) {
    return <p>Memuat...</p>
  }
  if (error) {
    return <p role="alert">{error}</p>
  }

  const tersaring = items.filter((item) =>
    item.judul.toLowerCase().includes(cari.toLowerCase()),
  )

  return (
    <section>
      <h1 id="judul-koleksi">Koleksi Proyek</h1>
      <SearchInput value={cari} onChange={setCari} />
      <KoleksiTable items={tersaring} />
    </section>
  )
}
