import "./src/styles/common.scss"
import { setupNavBar } from "./src/components/navbar.js"
import { setupServices } from "./src/components/services.js"
import { setupProfile } from "./src/components/profile.js"
import { handleVideo } from "./src/components/projects.js"
import { fix_VH, fix_HashNav } from "./src/utils"

setupNavBar()
setupServices()
setupProfile()
fix_HashNav()
fix_VH()
handleVideo()

function handleResize () {
	fix_VH()
	handleVideo()
}
window.addEventListener( "resize", handleResize )















/*************** VIDEO *****************A/
// const weather_tablet_vid = document.querySelector( ".app-video__tablet" )
// const weather_phone_vid = document.querySelector( ".app-video__phone" )

// weather_tablet_vid.play()
// weather_tablet_vid.addEventListener( "ended", () => weather_phone_vid.play() )

/*************** CONTACT FORM *****************/
