export default function handle_responsive_CSS_variables () {
	const vh100 = Math.min( window.innerHeight, document.documentElement.clientHeight )
	document.documentElement.style.setProperty( "--vh100", `${ vh100 }px` )

	if ( window.matchMedia( "(max-width:1200px)" ).matches ) {
		document.documentElement.style.setProperty( "--hex2-height", "5.92rem" )
	}
	else if ( window.matchMedia( "(min-width:1200px)" ).matches ) {
		document.documentElement.style.setProperty( "--hex2-height", "7rem" )
	}
}