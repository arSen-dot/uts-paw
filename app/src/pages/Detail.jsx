import { useNavigate, useParams } from 'react-router-dom'
import { useKoleksiContext } from '../context/KoleksiContext.jsx'

export default function Detail() {
  const { id } = useParams()
  const { items, loading, removeItem } = useKoleksiContext()
  const navigate = useNavigate()

  if (loading) {
    return <p>Memuat...</p>
  }

  const item = items.find((i) => String(i.id) === String(id))

  if (!item) {
    return (
      <section>
        <h1>Detail Proyek</h1>
        <p>Data tidak ditemukan</p>
      </section>
    )
  }

  function handleHapus() {
    if (window.confirm(`Hapus proyek "${item.judul}"?`)) {
      removeItem(item.id)
      navigate('/koleksi')
    }
  }

  return (
    <section>
      <h1>{item.judul}</h1>
      <dl>
        <div>
          <dt>Teknologi</dt>
          <dd>{item.teknologi}</dd>
        </div>
        <div>
          <dt>Tahun</dt>
          <dd>{item.tahun}</dd>
        </div>
        <div>
          <dt>Tautan</dt>
          <dd>
            {item.tautan ? (
              <a href={item.tautan} target="_blank" rel="noreferrer">
                {item.tautan}
              </a>
            ) : (
              '-'
            )}
          </dd>
        </div>
      </dl>
      <button type="button" className="tombol-hapus" onClick={handleHapus}>
        Hapus
      </button>
    </section>
  )
}
