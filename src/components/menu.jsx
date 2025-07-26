import { useState, useEffect } from 'react'
import { getMenu } from '../api/menu'

export default function Menu () {
  
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuItems, setMenuItems] = useState([])

  function handleResize () {
    // Update open or close menu state when window is resized, based on media query
    window.matchMedia("(min-width: 640px)").matches ? setMenuOpen(true) : setMenuOpen(false)
  }

  useEffect(() => {
    // handle resize on load
    window.addEventListener ("resize", handleResize)

    // get menu items from api
    getMenu().then((menuItems) => {
      setMenuItems(menuItems)
    })
  }, [])


  return (
    <div className="menu sm:mt-8 lg:mt-0">
      
      <nav className="overflow-hidden transition-all duration-500 sm:!h-auto" style={{"height": menuOpen ? "200px" : "0px"}}>
        <ul className="flex flex-col items-center justify-center sm:flex-row">
          {menuItems.map(({text, link, blank}, index) => {
            return (<li key={index}>
              <a 
                href={link} 
                className="py-5 block text-lg text-center text-white opacity-80 uppercase sm:px-5 hover:text-red hover:opacity-100"
                target={blank ? "_blank" : "_self"}
                >{text}</a>
            </li>)
          })}
        </ul>
      </nav>

      <button className="w-20 h-20 mx-auto flex items-center justify-center sm:hidden" onClick={() => {menuOpen ? setMenuOpen(false) : setMenuOpen(true)}}>
        <svg className="w-10 h-10 fill-red" viewBox="0 0 24 24" style={{transform: menuOpen ? "rotateZ(180deg)" : "rotateZ(0)"}}>
          < path d="M24 12c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12zm-18.005-1.568l1.415-1.414 4.59 4.574 4.579-4.574 1.416 1.414-5.995 5.988-6.005-5.988z" />
        </svg>
      </button>

    </div>
  )
}