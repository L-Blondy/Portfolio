import "./src/styles/common.scss"
import "./src/components/navbar.js"
import { onVisible } from "lb-onvisible"
import { fix_VH, fix_HashNav } from "./src/utils"

const { log } = console

fix_HashNav()
fix_VH()

function handleResize () {
	fix_VH()
}
window.addEventListener( "resize", handleResize )

/*************** VIDEO *****************/
// const weather_tablet_vid = document.querySelector( ".app-video__tablet" )
// const weather_phone_vid = document.querySelector( ".app-video__phone" )

// weather_tablet_vid.play()
// weather_tablet_vid.addEventListener( "ended", () => weather_phone_vid.play() )

/*************** CONTACT FORM *****************/
