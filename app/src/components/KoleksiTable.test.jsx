import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import KoleksiTable from './KoleksiTable.jsx'

const contoh = [
  { id: '1', judul: 'Quest Academy', teknologi: 'Next.js', tahun: 2025, tautan: 'https://example.com/qa' },
  { id: '2', judul: 'Tabungan Bersama', teknologi: 'React', tahun: 2026, tautan: '' },
]

function renderTable(items) {
  render(
    <MemoryRouter>
      <KoleksiTable items={items} />
    </MemoryRouter>,
  )
}

describe('KoleksiTable', () => {
  it('menampilkan kolom Teknologi, Tahun, dan Tautan', () => {
    renderTable(contoh)
    expect(screen.getByRole('columnheader', { name: 'Teknologi' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Tahun' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Tautan' })).toBeInTheDocument()
  })

  it('menampilkan baris data dan tautan ke detail', () => {
    renderTable(contoh)
    expect(screen.getByRole('link', { name: 'Quest Academy' })).toHaveAttribute(
      'href',
      '/koleksi/1',
    )
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'https://example.com/qa' })).toHaveAttribute(
      'href',
      'https://example.com/qa',
    )
  })

  it('menampilkan pesan saat tidak ada data', () => {
    renderTable([])
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })
})
