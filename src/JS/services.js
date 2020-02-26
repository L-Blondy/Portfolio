import { onVisible } from "lb-onvisible"

export function setupServices () {
	if ( "IntersectionObserver" in window ) {
		const services = document.querySelectorAll( ".service" )
		const duration = 700

		if ( window.matchMedia( "(max-width: 577.8px)" ).matches ) {
			onVisible( services[ 0 ], { class: "fadeFromRight", } )
			onVisible( services[ 1 ], { class: "fadeFromLeft", duration } )
			onVisible( services[ 2 ], { class: "fadeFromRight", duration } )
		}
		else if ( window.matchMedia( "(max-width: 599.8px)" ).matches ) {
			onVisible( services[ 0 ], { class: "fadeFromLeft", duration } )
			onVisible( services[ 1 ], { class: "fadeFromRight", duration } )
			onVisible( services[ 2 ], { class: "fadeFromBottom", duration } )
		}
		else if ( window.matchMedia( "(min-width: 600px)" ).matches ) {
			onVisible( services[ 0 ], { class: "fadeFromLeft", duration } )
			onVisible( services[ 1 ], { class: "fadeFromBottom", duration } )
			onVisible( services[ 2 ], { class: "fadeFromRight", duration } )
		}
	}

}