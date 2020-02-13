import { onVisible } from "lb-onvisible"

export function setupServices () {
	const services = document.querySelectorAll( ".service" )

	if ( window.matchMedia( "(max-width: 581.8px)" ).matches ) {
		onVisible( services[ 0 ], { class: "fadeFromRight", duration: 500 } )
		onVisible( services[ 1 ], { class: "fadeFromLeft", duration: 500 } )
		onVisible( services[ 2 ], { class: "fadeFromRight", duration: 500 } )
	}
	else if ( window.matchMedia( "(max-width: 861.8px)" ).matches ) {
		onVisible( services[ 0 ], { class: "fadeFromLeft", duration: 700 } )
		onVisible( services[ 1 ], { class: "fadeFromRight", duration: 700 } )
		onVisible( services[ 2 ], { class: "fadeFromBottom", duration: 700 } )
	}
	else if ( window.matchMedia( "(min-width: 862px)" ).matches ) {
		onVisible( services[ 0 ], { class: "fadeFromLeft", duration: 700 } )
		onVisible( services[ 1 ], { class: "fadeFromBottom", duration: 700 } )
		onVisible( services[ 2 ], { class: "fadeFromRight", duration: 700 } )
	}

}