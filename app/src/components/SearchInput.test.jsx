import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SearchInput from './SearchInput.jsx'

describe('SearchInput', () => {
  it('merender input type search dengan nilai yang diberikan', () => {
    render(<SearchInput value="quest" onChange={() => {}} />)
    const input = screen.getByRole('searchbox')
    expect(input).toHaveAttribute('type', 'search')
    expect(input).toHaveValue('quest')
  })

  it('memanggil onChange dengan teks yang diketik', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchInput value="" onChange={onChange} />)
    await user.type(screen.getByRole('searchbox'), 'a')
    expect(onChange).toHaveBeenCalledWith('a')
  })
})
