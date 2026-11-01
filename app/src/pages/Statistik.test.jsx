import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { KoleksiContext } from '../context/KoleksiContext.jsx'
import Statistik from './Statistik.jsx'

const contoh = [
  { id: '1', judul: 'A', kategori: 'Edukasi', teknologi: 'React', tahun: 2025, tautan: '' },
  { id: '2', judul: 'B', kategori: 'Edukasi', teknologi: 'React', tahun: 2025, tautan: '' },
  { id: '3', judul: 'C', kategori: 'Game', teknologi: 'Next.js', tahun: 2026, tautan: '' },
]

describe('Halaman Statistik', () => {
  it('memakai satu elemen table dan menampilkan hitungan', () => {
    render(
      <MemoryRouter>
        <KoleksiContext.Provider
          value={{ items: contoh, loading: false, error: null, addItem: () => {}, removeItem: () => {} }}
        >
          <Statistik />
        </KoleksiContext.Provider>
      </MemoryRouter>,
    )
    // Hanya tabel per kategori yang memakai elemen table; sisanya daftar
    expect(screen.getAllByRole('table')).toHaveLength(1)
    expect(screen.getByText(/Total proyek: 3/)).toBeInTheDocument()
    // React muncul 2 kali, Next.js 1 kali, tahun 2025 2 kali, 2026 1 kali
    expect(screen.getByText('React: 2')).toBeInTheDocument()
    expect(screen.getByText('Next.js: 1')).toBeInTheDocument()
  })

  it('menampilkan tabel jumlah per kategori', () => {
    render(
      <MemoryRouter>
        <KoleksiContext.Provider
          value={{ items: contoh, loading: false, error: null, addItem: () => {}, removeItem: () => {} }}
        >
          <Statistik />
        </KoleksiContext.Provider>
      </MemoryRouter>,
    )
    expect(screen.getByText('Jumlah per Kategori')).toBeInTheDocument()
    expect(screen.getByText('Edukasi')).toBeInTheDocument()
    expect(screen.getByText('Game')).toBeInTheDocument()
  })
})
