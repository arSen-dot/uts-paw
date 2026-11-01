import { useEffect, useState } from 'react'

// Custom hook: memuat koleksi dari data statis dan mengelola tambah/hapus.
// Item yang ditambahkan pengguna disimpan ke localStorage, sehingga tetap
// muncul di /koleksi setelah halaman dimuat ulang.
const KUNCI_TAMBAHAN = 'portofolio-koleksi-tambahan'

function bacaTambahan() {
  try {
    const mentah = window.localStorage.getItem(KUNCI_TAMBAHAN)
    const data = mentah ? JSON.parse(mentah) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function simpanTambahan(tambahan) {
  try {
    window.localStorage.setItem(KUNCI_TAMBAHAN, JSON.stringify(tambahan))
  } catch {
    // Abaikan jika localStorage tidak tersedia.
  }
}

export function useKoleksi() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let dibatalkan = false
    async function muat() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!res.ok) {
          throw new Error(`Gagal memuat data (status ${res.status})`)
        }
        const data = await res.json()
        if (!dibatalkan) {
          setItems([...data, ...bacaTambahan()])
        }
      } catch (e) {
        if (!dibatalkan) {
          setError(e.message)
        }
      } finally {
        if (!dibatalkan) {
          setLoading(false)
        }
      }
    }
    muat()
    return () => {
      dibatalkan = true
    }
  }, [])

  function addItem(item) {
    const id =
      items.length > 0
        ? String(Math.max(...items.map((i) => Number(i.id) || 0)) + 1)
        : '1'
    const baru = { ...item, id }
    setItems((prev) => [...prev, baru])
    simpanTambahan([...bacaTambahan(), baru])
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => String(i.id) !== String(id)))
    simpanTambahan(
      bacaTambahan().filter((i) => String(i.id) !== String(id)),
    )
  }

  return { items, loading, error, addItem, removeItem }
}
