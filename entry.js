import "./src/styles/common.scss"
import "./src/components/navbar.js"
import "lb-onvisible"
import { handle_responsive_CSS_variables, fixHashNav } from "./src/utils"
// import { writeOnVisible, WriteSequence } from "lb-write"

fixHashNav()
handle_responsive_CSS_variables()

function handleResize () {
	handle_responsive_CSS_variables()
}
window.addEventListener( "resize", handleResize )

/*************** VIDEO *****************/
// const weather_tablet_vid = document.querySelector( ".app-video__tablet" )
// const weather_phone_vid = document.querySelector( ".app-video__phone" )

// weather_tablet_vid.play()
// weather_tablet_vid.addEventListener( "ended", () => weather_phone_vid.play() )

/*************** CONTACT FORM *****************/