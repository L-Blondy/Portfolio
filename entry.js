import "./src/styles/common.scss"
import { setupNavBar } from "./src/components/navbar.js"
import { setupServices } from "./src/components/services.js"
import { setupDotAnim } from "./src/components/dotAnim.js"
import { Videos } from "./src/components/projects.js"
import { fix_VH, fix_HashNav } from "./src/utils"

let skills = document.querySelectorAll( ".profile-content__skills-skill span" )
let myData = document.querySelectorAll( ".contact-content__intro--data span" )

setupNavBar()
setupServices()
setupDotAnim( skills, 2 )
setupDotAnim( myData, 1 )
fix_HashNav()
fix_VH()

const videos = new Videos().setState()
console.log( videos )

function handleResize () {
	fix_VH()
	videos.setState()
}
window.addEventListener( "resize", handleResize )



//testasd











/*************** VIDEO *****************A/
// const weather_tablet_vid = document.querySelector( ".app-video__tablet" )
// const weather_phone_vid = document.querySelector( ".app-video__phone" )

// weather_tablet_vid.play()
// weather_tablet_vid.addEventListener( "ended", () => weather_phone_vid.play() )

/*************** CONTACT FORM *****************/
