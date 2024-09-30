import {describe,it, expect, beforeEach, vi} from 'vitest'
import {cleanup, render, screen} from '@testing-library/react'
import Router from '../router/Router'
import {getCurrentPath} from '../utils'

vi.mock('../utils.ts',()=>({
    getCurrentPath: vi.fn() 
}))
describe('router', () => {
    beforeEach(()=>{
      cleanup() 
      vi.clearAllMocks()
    })
    it('should work', () =>{
        render(<Router />)
        expect(true).toBeTruthy()
    })

    it('should render ',()=>{
        getCurrentPath.mockReturnValue('/cart')

        render(<Router />)
        const linkElement = screen.getByText('FakeStore');
        expect(linkElement.innerHTML).toBe('FakeStore'); 
    })

})