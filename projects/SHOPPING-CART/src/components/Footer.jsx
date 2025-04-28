import './Footer.css'
import { useFilters } from '../hooks/useFilters.js'
import { IS_DEVELOPMENT } from '../config.js'
import { useCart } from '../hooks/useCart.js'

export function Footer () {

  const {filters}= useFilters()
  const {cart} = useCart()
  return (
    <footer className='footer'>
      {
        /*IS_DEVELOPMENT ?
          JSON.stringify(filters,null,2)
          :*/
        <>
          <h4>
            Prueba técnica de React ⚛️ － <span>@juan.developer01</span>
          </h4>
          <h5>Shopping Cart con useContext & useReducer</h5>
        </>
      }
    </footer>
  )
}