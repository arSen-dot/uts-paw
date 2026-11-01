import { useState } from 'react'

// Form tambah proyek. Validasi ditulis sendiri di JavaScript:
// hanya Judul yang wajib diisi, field lain boleh kosong.
export default function ProyekForm({ onSubmit }) {
  const [judul, setJudul] = useState('')
  const [teknologi, setTeknologi] = useState('')
  const [tahun, setTahun] = useState('')
  const [tautan, setTautan] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (judul.trim() === '') {
      setError('Judul wajib diisi')
      return
    }
    setError('')
    onSubmit({
      judul: judul.trim(),
      teknologi: teknologi.trim(),
      tahun: tahun === '' ? '' : Number(tahun),
      tautan: tautan.trim(),
    })
  }

  return (
    <form className="form-tambah" onSubmit={handleSubmit}>
      {error && <p role="alert">{error}</p>}
      <div>
        <label htmlFor="judul">Judul</label>
        <input
          id="judul"
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="teknologi">Teknologi</label>
        <input
          id="teknologi"
          type="text"
          value={teknologi}
          onChange={(e) => setTeknologi(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tahun">Tahun</label>
        <input
          id="tahun"
          type="number"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="tautan">Tautan</label>
        <input
          id="tautan"
          type="text"
          value={tautan}
          onChange={(e) => setTautan(e.target.value)}
        />
      </div>
      <button type="submit">Simpan</button>
    </form>
  )
}
