export default function fix_VH () {
	const vh100 = Math.min( window.innerHeight, document.documentElement.clientHeight )
	document.documentElement.style.setProperty( "--vh100", `${ vh100 }px` )
}