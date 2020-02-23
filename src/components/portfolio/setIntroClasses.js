import { onVisible } from "lb-onvisible"

export function setIntroClasses () {
	const app_cards = [].slice.call( document.querySelectorAll( ".app-card" ) )

	const titles = [].slice.call( document.querySelectorAll( ".app-intro__title" ) )
	const desc = [].slice.call( document.querySelectorAll( ".app-intro__description" ) )
	const techs = [].slice.call( document.querySelectorAll( ".app-intro__technologies" ) )
	const buttons = [].slice.call( document.querySelectorAll( ".app-intro__buttons" ) )

	if ( app_cards.length ) {
		onVisible( titles, { class: "fadeFromRight" } )
		onVisible( desc, { class: "fadeFromRight" } )
		techs.forEach( tech => {
			onVisible( tech.children, { class: "fadeFromRight", delay: 200 } )
		} )
		buttons.forEach( btns => {
			onVisible( btns.children, { class: "fadeFromRight", delay: 400 } )
		} )
	}
	else {
		for ( let i = 0; i < 3; i++ ) {
			const side = i % 2 === 0 ? "fadeFromRight" : "fadeFromLeft"

			onVisible( titles[ i ], { class: side } )
			onVisible( desc[ i ], { class: side } )
			onVisible( techs[ i ].children, {
				class: i % 2 === 0 ? "fadeFromRight" : "fadeFromLeft",
				delay: 200,
				reverse: i % 2 === 0 ? false : true
			} )
			onVisible( buttons[ i ].children, {
				class: i % 2 === 0 ? "fadeFromRight" : "fadeFromLeft",
				delay: 400,
			} )

		}
	}
}