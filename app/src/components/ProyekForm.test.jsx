import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ProyekForm from './ProyekForm.jsx'

describe('ProyekForm', () => {
  it('label Judul terhubung ke input dan tombol bertuliskan Simpan', () => {
    render(<ProyekForm onSubmit={() => {}} />)
    expect(screen.getByLabelText('Judul')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Simpan' })).toBeInTheDocument()
  })

  it('menampilkan error role=alert dan tidak submit saat judul kosong', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ProyekForm onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: 'Simpan' }))
    expect(screen.getByRole('alert')).toHaveTextContent('Judul wajib diisi')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('memanggil onSubmit dan mengizinkan field lain kosong', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ProyekForm onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText('Judul'), 'Proyek Baru')
    await user.click(screen.getByRole('button', { name: 'Simpan' }))
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ judul: 'Proyek Baru' }),
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('mengirim ketiga field tema dengan label yang sama', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<ProyekForm onSubmit={onSubmit} />)
    await user.type(screen.getByLabelText('Judul'), 'Proyek X')
    await user.type(screen.getByLabelText('Teknologi'), 'Vue')
    await user.type(screen.getByLabelText('Tahun'), '2026')
    await user.type(screen.getByLabelText('Tautan'), 'https://example.com/x')
    await user.click(screen.getByRole('button', { name: 'Simpan' }))
    expect(onSubmit).toHaveBeenCalledWith({
      judul: 'Proyek X',
      teknologi: 'Vue',
      tahun: 2026,
      tautan: 'https://example.com/x',
    })
  })
})
