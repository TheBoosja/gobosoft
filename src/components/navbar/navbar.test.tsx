import { describe, expect, it } from 'vitest'
import { render, screen } from '../../test-utils'
import Navbar from '.'

describe('Navbar', () => {
  render(<Navbar />)

  it('contains Home', () => {
    expect(screen.getByText('Home')).toBeDefined()
  })

  it('contains Blog', () => {
    expect(screen.getByText('Blog')).toBeDefined()
  })

  it('contains Sketches', () => {
    expect(screen.getByText('Sketches')).toBeDefined()
  })

  it('contains About', () => {
    expect(screen.getByText('About')).toBeDefined()
  })
})
