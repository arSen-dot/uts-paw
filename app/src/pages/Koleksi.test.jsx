import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { KoleksiContext } from '../context/KoleksiContext.jsx'
import Koleksi from './Koleksi.jsx'

const contoh = [
  { id: '1', judul: 'Quest Academy', teknologi: 'Next.js', tahun: 2025, tautan: '' },
  { id: '2', judul: 'Tabungan Bersama', teknologi: 'React', tahun: 2025, tautan: '' },
]

function renderKoleksi() {
  render(
    <MemoryRouter>
      <KoleksiContext.Provider
        value={{ items: contoh, loading: false, error: null, addItem: () => {}, removeItem: () => {} }}
      >
        <Koleksi />
      </KoleksiContext.Provider>
    </MemoryRouter>,
  )
}

describe('Halaman Koleksi', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('kolom pencarian memakai input type search dan menyaring berdasarkan judul', async () => {
    const user = userEvent.setup()
    renderKoleksi()
    const cari = screen.getByRole('searchbox')
    expect(cari).toHaveAttribute('type', 'search')
    await user.type(cari, 'quest')
    expect(screen.getByText('Quest Academy')).toBeInTheDocument()
    expect(screen.queryByText('Tabungan Bersama')).not.toBeInTheDocument()
  })

  it('menampilkan semua proyek saat pencarian kosong', () => {
    renderKoleksi()
    expect(screen.getByText('Quest Academy')).toBeInTheDocument()
    expect(screen.getByText('Tabungan Bersama')).toBeInTheDocument()
  })
})
