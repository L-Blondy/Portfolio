export default function handle_responsive_CSS_variables () {
	const vh100 = Math.min( window.innerHeight, document.documentElement.clientHeight )
	document.documentElement.style.setProperty( "--vh100", `${ vh100 }px` )
}