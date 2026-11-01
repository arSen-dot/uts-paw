import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { KoleksiContext } from '../context/KoleksiContext.jsx'
import Detail from './Detail.jsx'

const contoh = [
  { id: '1', judul: 'Quest Academy', teknologi: 'Next.js', tahun: 2025, tautan: 'https://example.com/qa' },
]

function renderDetail(idAwal, removeItem) {
  render(
    <MemoryRouter initialEntries={[`/koleksi/${idAwal}`]}>
      <KoleksiContext.Provider
        value={{ items: contoh, loading: false, error: null, addItem: () => {}, removeItem }}
      >
        <Routes>
          <Route path="/koleksi/:id" element={<Detail />} />
          <Route path="/koleksi" element={<p>Halaman Koleksi</p>} />
        </Routes>
      </KoleksiContext.Provider>
    </MemoryRouter>,
  )
}

describe('Halaman Detail', () => {
  it('menampilkan ketiga field tema dengan labelnya', () => {
    renderDetail('1', () => {})
    expect(screen.getByText('Teknologi')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Tahun')).toBeInTheDocument()
    expect(screen.getByText('2025')).toBeInTheDocument()
    expect(screen.getByText('Tautan')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'https://example.com/qa' })).toBeInTheDocument()
  })

  it('id tidak ada menampilkan "tidak ditemukan" tanpa teks 404', () => {
    renderDetail('999', () => {})
    expect(screen.getByText(/tidak ditemukan/i)).toBeInTheDocument()
    expect(screen.queryByText('404')).not.toBeInTheDocument()
  })

  it('tombol Hapus meminta konfirmasi lalu mengarah ke /koleksi', async () => {
    const removeItem = vi.fn()
    const user = userEvent.setup()
    window.confirm = vi.fn(() => true)
    renderDetail('1', removeItem)
    await user.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(window.confirm).toHaveBeenCalled()
    expect(removeItem).toHaveBeenCalledWith('1')
    expect(screen.getByText('Halaman Koleksi')).toBeInTheDocument()
  })

  it('tidak menghapus jika konfirmasi dibatalkan', async () => {
    const removeItem = vi.fn()
    const user = userEvent.setup()
    window.confirm = vi.fn(() => false)
    renderDetail('1', removeItem)
    await user.click(screen.getByRole('button', { name: 'Hapus' }))
    expect(removeItem).not.toHaveBeenCalled()
  })
})
