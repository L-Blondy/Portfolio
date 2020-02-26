import "./src/SCSS/common.scss"
import { setupNavBar } from "./src/JS/navbar.js"
import { setupServices } from "./src/JS/services.js"
import { setupDotAnim } from "./src/JS/dotAnim.js"
import { ResizeHandler } from "./src/JS/portfolio/ResizeHandler.js"
import { Videos } from "./src/JS/portfolio/Videos.js"
import { Images } from "./src/JS/portfolio/Images.js"
import { fix_VH, fix_HashNav, getMediaSources } from "./src/utils"

let skills = document.querySelectorAll( ".profile-content__skills-skill span" )
let myData = document.querySelectorAll( ".contact-content__intro--data span" )

setupNavBar()
setupServices()
setupDotAnim( skills, 2 )
setupDotAnim( myData, 1 )
fix_HashNav()

let sources = getMediaSources( require( "./src/assets/portfolio-media/*.*" ) )
const videos = new Videos( sources )
const images = new Images( sources )
const resizeHandler = new ResizeHandler( { "video": () => videos.load(), "image": () => images.load() } )

function handleResize () {
	fix_VH()
	if ( window.matchMedia( "(max-width:1199.8px)" ).matches ) {
		resizeHandler.setState( "image" )
	}
	else if ( window.matchMedia( "(min-width:1200px)" ).matches ) {
		resizeHandler.setState( "video" )
	}
}
handleResize()
window.addEventListener( "resize", handleResize )













/*************** VIDEO *****************A/
// const weather_tablet_vid = document.querySelector( ".app-video__tablet" )
// const weather_phone_vid = document.querySelector( ".app-video__phone" )

// weather_tablet_vid.play()
// weather_tablet_vid.addEventListener( "ended", () => weather_phone_vid.play() )

/*************** CONTACT FORM *****************/
