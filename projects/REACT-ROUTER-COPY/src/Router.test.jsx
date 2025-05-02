import {describe,it,expect,beforeEach,vi} from 'vitest'
import { render,screen,cleanup } from '@testing-library/react'
import { Router } from './pages/Router.jsx'
import {getCurrentPath} from './utils.js'

vi.mock('./utils.js',()=>({
  getCurrentPath: vi.fn(()=>'/')
}))

describe('Router', () => {

  beforeEach(()=>{
    cleanup()
    vi.clearAllMocks()
  })

  it('should render', () => {
     render(<Router routes={[]}/>)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no rotes match', () => {
    render(<Router routes={[]} defaultComponent={()=><h1>404</h1>}/>)
    expect(screen.getByText("404")).toBeTruthy()
  })

  it('should render the correct component', () => {
    getCurrentPath.mockReturnValue('/about')

    const routes = [
      {
        path:'/',
        Component:()=><h1>Home</h1>
      },
      {
        path:'/about',
        Component:()=><h1>About</h1>
      }
    ]
    const HomePage = ()=><h1>Home</h1>
    const AboutPage = ()=><h1>About</h1>

    render(<Router routes={routes}/>)
    //expect(screen.getByText("Home")).toBeTruthy()
    expect(screen.getByText("About")).toBeTruthy()
  })
})


