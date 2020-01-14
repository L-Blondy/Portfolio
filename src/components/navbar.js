const burger = document.querySelector( ".burger" );
const navlinks = document.querySelector( ".navlinks" );

const burgerClick = ( e ) => {
	navlinks.classList.toggle( "open" )
	burger.classList.toggle( "cross" )
	burger.classList.toggle( "close" )
}

const navlinkClick = ( e ) => {
	if ( burger.classList.contains( "cross" ) ) {
		burgerClick()
	}
}

burger.addEventListener( "click", burgerClick )
navlinks.addEventListener( "click", navlinkClick )