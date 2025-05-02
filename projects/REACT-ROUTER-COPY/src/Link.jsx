//hace que la url se vea en el path como una nueva pero no renderiza la pagina
import { EVENTS } from './consts.js'

function navigate(href){
  //este metodo actualiza el path
  window.history.pushState({},'',href)
  //crear un evento personalizado para que react sepa que el path se actualizo y despues cuando se use este evento se pueda recargar la pagina
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  //dispara el evento manualmente para poder captarlo apenas se alla actualizado el path
  window.dispatchEvent(navigationEvent)
}

export function Link({target,to,...props}){
  const handleClick = (event) => {

    const isMainEvent = event.button === 0 //primary click
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
    const isManageableEvent = target === undefined || target === '_self'

    if(isMainEvent && isManageableEvent && !isModifiedEvent){
      event.preventDefault()
      navigate(to)
      window.scrollTo(0,0)
    }

  }

  return <a  onClick={handleClick} href={to} target={target} {...props}/>
}