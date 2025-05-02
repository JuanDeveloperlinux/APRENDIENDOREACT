import { lazy, Suspense } from 'react'
import { Router } from './pages/Router.jsx'
import { Route } from './pages/Route.jsx'
const AboutPage = lazy(()=> import('./pages/About.jsx'))
const HomePage = lazy(()=> import('./pages/Home.jsx'))
const SearchPage = lazy(()=> import('./pages/SearchPage.jsx'))


const appRoutes = [
  {
    path: '/search/:query',
    Component:SearchPage
  }
]


function App() {

  return (
    <main>
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Router routes={appRoutes}>
          <Route path='/' Component={HomePage}></Route>
          <Route path='/about' Component={AboutPage}></Route>
        </Router>
      </Suspense>
    </main>
  )
}

export default App
