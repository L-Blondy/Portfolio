export default function fix_HashNav () {
	document.addEventListener( "click", e => {
		const href = e.target.getAttribute( "href" )
		const target = document.querySelector( href )

		if ( href && e.target.getAttribute( "href" )[ 0 ] === "#" ) {
			e.preventDefault()
			target.scrollIntoView(
				{ behavior: "smooth" }
			)
		}
	} )
}
