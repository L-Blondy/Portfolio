export default function handle_responsive_CSS_variables () {
	function recalculate () {
		const vh100 = Math.min( window.innerHeight, document.documentElement.clientHeight )
		document.documentElement.style.setProperty( "--vh100", `${ vh100 }px` )

		if ( window.matchMedia( "(max-width:576px)" ).matches ) {
			document.documentElement.style.setProperty( "--hex2-height", "5rem" )
		}
		else if ( window.matchMedia( "(max-width:767.8px)" ).matches ) {
			document.documentElement.style.setProperty( "--hex2-height", "5rem" )
		}
		else if ( window.matchMedia( "(max-width:1200px)" ).matches ) {
			document.documentElement.style.setProperty( "--hex2-height", "6rem" )
		}
		else if ( window.matchMedia( "(min-width:1200px)" ).matches ) {
			document.documentElement.style.setProperty( "--hex2-height", "7rem" )
		}
	}
	window.addEventListener( "resize", recalculate )
	recalculate()
}