import { writeOnVisible } from "lb-write"

export function setup_showPhone () {
	const target = document.querySelector( ".click-to-see" )
	const handleClick = () => {
		target.className = "personal-data"
		target.textContent = "342.517.3316"
		writeOnVisible( target, { speed: 2 } )
		target.removeEventListener( "click", handleClick )
	}
	target.addEventListener( "click", handleClick )
}