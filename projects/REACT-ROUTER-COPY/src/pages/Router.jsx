import { Children, useEffect, useState } from 'react'
import { EVENTS } from '../consts.js'
import { match } from 'path-to-regexp'
import { getCurrentPath } from '../utils.js'

export function Router ({children,routes = [], defaultComponent:DefaultComponent = ( )=><h1>404</h1>}){
  //tiene el path de la pagina
  const [currentPath,setCurrentPath] = useState(getCurrentPath())

  //se ejecuta la primera vez que se monta el componente
  useEffect(() => {

    //metodo que actualiza el estado con el path que tenga en ese momento el navegador y se rerenderiza la pagina
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    //escucha el evento personalizado de cuando se cambio el path de la pagina con nuestra function navigate que esta en el componetnte link y cuando lo detecta dispara el metodo
    window.addEventListener(EVENTS.PUSHSTATE,onLocationChange)
    //esto si es del navegador que escucha cuando se presionan las flechas de atras y adelante y dispara el metodo
    window.addEventListener(EVENTS.POPSTATE,onLocationChange)

    //esto solo lo ejecuta cuando se desmonta el componente para que los eventos no generen problemas
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE,onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE,onLocationChange)
    }

  }, [])

  //añadir rutas del children routecomponent

  const routesFromChildren = Children.map(children,({props,type}) =>{
    const {name} = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  let routeParams = {}

  const Page = routesToUse.find(({path})=> {
    if (path === currentPath) return true

    //usamos dependencia de path-to-regexp para detectar rutas dinamicas por ejjemplo /search/:query
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    //guardar los parametros de la ruta que eran dinamicos
    routeParams = matched.params //{query:''javascrip'} //search/javascript
    return true

  })?.Component

  return Page ?  <Page routeParams ={routeParams}/>: <DefaultComponent  routeParams ={routeParams}/>
}
