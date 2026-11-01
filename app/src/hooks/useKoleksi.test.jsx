import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useKoleksi } from './useKoleksi.js'

const contoh = [
  { id: '1', judul: 'Quest Academy', teknologi: 'Next.js', tahun: 2025, tautan: '' },
]

beforeEach(() => {
  window.localStorage.clear()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('useKoleksi', () => {
  it('memuat data awal dari koleksi.json dan mematikan loading', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, json: async () => contoh })),
    )
    const { result } = renderHook(() => useKoleksi())
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.items).toEqual(contoh)
    expect(result.current.error).toBeNull()
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('data/koleksi.json'),
    )
  })

  it('mengisi error saat fetch gagal', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 500 })))
    const { result } = renderHook(() => useKoleksi())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).not.toBeNull()
    expect(result.current.items).toEqual([])
  })

  it('addItem dan removeItem mengubah daftar', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, json: async () => contoh })),
    )
    const { result } = renderHook(() => useKoleksi())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => {
      result.current.addItem({ judul: 'Baru', teknologi: 'Vue', tahun: 2026, tautan: '' })
    })
    expect(result.current.items).toHaveLength(2)
    act(() => {
      result.current.removeItem('1')
    })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].judul).toBe('Baru')
  })

  it('addItem menyimpan item baru ke localStorage', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, json: async () => contoh })),
    )
    const { result } = renderHook(() => useKoleksi())
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => {
      result.current.addItem({ judul: 'Simpan Saya', teknologi: 'Vue', tahun: 2026, tautan: '' })
    })
    const tersimpan = JSON.parse(
      window.localStorage.getItem('portofolio-koleksi-tambahan'),
    )
    expect(tersimpan).toHaveLength(1)
    expect(tersimpan[0].judul).toBe('Simpan Saya')
  })

  it('memuat item tambahan dari localStorage bersama data awal', async () => {
    window.localStorage.setItem(
      'portofolio-koleksi-tambahan',
      JSON.stringify([{ id: '99', judul: 'Dari Local', teknologi: 'Vue', tahun: 2026, tautan: '' }]),
    )
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, json: async () => contoh })),
    )
    const { result } = renderHook(() => useKoleksi())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.items).toHaveLength(2)
    expect(result.current.items[1].judul).toBe('Dari Local')
  })
})
