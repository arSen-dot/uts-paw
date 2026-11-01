import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Footer from './Footer.jsx'

describe('Footer', () => {
  it('merender elemen footer', () => {
    render(<Footer />)
    expect(screen.getByText('Portofolio Proyek Pribadi Reksa Ariel Saputra-2026').tagName).toBe('P')
    expect(document.querySelector('footer')).toBeInTheDocument()
  })
})
