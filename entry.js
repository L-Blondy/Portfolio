import "./src/styles/common.scss"
import { setupNavBar } from "./src/components/navbar.js"
import { setupServices } from "./src/components/services.js"
import { setupProfile } from "./src/components/profile.js"
import { fix_VH, fix_HashNav } from "./src/utils"

const { log } = console

setupNavBar()
setupServices()
setupProfile()
fix_HashNav()
fix_VH()

function handleResize () {
	fix_VH()
}
window.addEventListener( "resize", handleResize )















/*************** VIDEO *****************A/
// const weather_tablet_vid = document.querySelector( ".app-video__tablet" )
// const weather_phone_vid = document.querySelector( ".app-video__phone" )

// weather_tablet_vid.play()
// weather_tablet_vid.addEventListener( "ended", () => weather_phone_vid.play() )

/*************** CONTACT FORM *****************/
