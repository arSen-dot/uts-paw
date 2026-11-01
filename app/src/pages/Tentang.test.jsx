import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import NotFound from './NotFound.jsx'
import Tentang from './Tentang.jsx'
import mahasiswa from '../../mahasiswa.json'

describe('Halaman Tentang', () => {
  it('menampilkan nama dan NIM persis seperti di mahasiswa.json', () => {
    render(
      <MemoryRouter>
        <Tentang />
      </MemoryRouter>,
    )
    expect(screen.getByText(new RegExp(mahasiswa.nama))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(mahasiswa.nim))).toBeInTheDocument()
  })
})

describe('Halaman 404', () => {
  it('memuat teks 404', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
