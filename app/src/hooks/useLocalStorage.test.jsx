import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import useLocalStorage from './useLocalStorage.js'

beforeEach(() => {
  window.localStorage.clear()
})

describe('useLocalStorage', () => {
  it('memakai nilai awal saat belum ada yang tersimpan', () => {
    const { result } = renderHook(() => useLocalStorage('tes-kunci', 'awal'))
    expect(result.current[0]).toBe('awal')
  })

  it('membaca nilai yang sudah tersimpan', () => {
    window.localStorage.setItem('tes-kunci', JSON.stringify('tersimpan'))
    const { result } = renderHook(() => useLocalStorage('tes-kunci', 'awal'))
    expect(result.current[0]).toBe('tersimpan')
  })

  it('menyimpan nilai baru ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('tes-kunci', 'awal'))
    act(() => {
      result.current[1]('baru')
    })
    expect(result.current[0]).toBe('baru')
    expect(window.localStorage.getItem('tes-kunci')).toBe(JSON.stringify('baru'))
  })
})
