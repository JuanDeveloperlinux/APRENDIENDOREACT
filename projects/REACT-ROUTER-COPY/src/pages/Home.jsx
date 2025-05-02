import { Link } from '../Link.jsx'

export default function HomePage(){
  return (
    <>
      <h1>Home</h1>
      <p>Bienvenido a mi pagina</p>
      <Link to="/about">Ir a sobre nosotros</Link>
    </>
  )
}
