import "./src/styles/common.scss"
import "./src/components/navbar.js"
import { set_frontEndDev } from "./src/components/set_frontEndDev.js/"
import { handle_responsive_CSS_variables, fixHashNav } from "./src/utils"
// import { writeOnVisible, WriteSequence } from "lb-write"

// START INITIALIZE
fixHashNav()
set_frontEndDev()
handle_responsive_CSS_variables()
// END INITIALIZE

function handleResize () {
	set_frontEndDev()
	handle_responsive_CSS_variables()
}
window.addEventListener( "resize", handleResize )

const weather_tablet_vid = document.querySelector( ".app-video__tablet" )
const weather_phone_vid = document.querySelector( ".app-video__phone" )

weather_tablet_vid.play()
weather_tablet_vid.addEventListener( "ended", () => weather_phone_vid.play() )