let sources = getSources( require( "../assets/video/*.*" ) )

export function setProjectsClasses ( videoState ) {

	const projects = [].slice.call( document.querySelectorAll( ".portfolio .app" ) )
	if ( videoState === 1 ) {
		projects.forEach( p => {
			if ( p.classList.contains( "app-left" ) ) {
				p.classList.remove( "app-left" )
				p.classList.add( "app-card" )
			}
			else if ( p.classList.contains( "app-right" ) ) {
				p.classList.remove( "app-right" )
				p.classList.add( "app-card" )
			}
		} )
	}
	if ( videoState === 2 ) {
		projects.forEach( ( p, i ) => {
			if ( i % 2 === 0 && !p.classList.contains( "app-left" ) ) {
				p.classList.add( "app-left" )
				p.classList.remove( "app-card" )
			}
			else if ( i % 2 !== 0 && !p.classList.contains( "app-right" ) ) {
				p.classList.add( "app-right" )
				p.classList.remove( "app-card" )
			}
		} )
	}
}

export function Videos () {

	this.containers = [].slice.call( document.querySelectorAll( ".app-video" ) )
	this.prevState = 0
	this.state = 0
	this.src = {}
	this.tablets = []
	this.phones = []
	this.images = []
	this.io = ""
}

Videos.prototype.setState = function () {

	this.prevState = this.state

	if ( window.matchMedia( "(max-width:1199.8px)" ).matches ) {
		this.state = 1
		setProjectsClasses( 1 )
		this.src = [ "weather-desktop.jpg", "weather-desktop.jpg", "weather-desktop.jpg" ]
	}

	else if ( window.matchMedia( "(min-width:1200px)" ).matches ) {
		this.state = 2
		setProjectsClasses( 2 )
		this.src = [
			[ "weather-tablet.mp4", "weather-tablet.mp4", "weather-tablet.mp4" ],
			[ "weather-phone.mp4", "weather-phone.mp4", "weather-phone.mp4" ]
		]
	}

	if ( this.prevState !== this.state ) {
		this.handleStateChange()
	}
	return this
}

Videos.prototype.handleStateChange = function () {

	this.containers.forEach( ( container, i ) => {

		if ( this.state === 1 ) {
			container.innerHTML = `
				<img class="app-image" src="${ sources[ this.src[ i ] ] }" alt="weather-app-pic" />`
		}

		else if ( this.state === 2 ) {
			const tablet_src = this.src[ 0 ]
			const phone_src = this.src[ 1 ]

			container.innerHTML = `
				<video class="app-video__tablet" data-index="${ i }">
					<source src="${ sources[ tablet_src[ i ] ] }" type="video/mp4">
				</video>
				<video class="app-video__phone">
					<source src="${ sources[ phone_src[ i ] ] }" type="video/mp4"">
				</video>`
		}
	} )
	if ( "IntersectionObserver" in window ) {
		this.io && this.io.disconnect()
		this.setupAnimation()
	}
}

Videos.prototype.setupAnimation = function () {

	this.tablets = [ ...document.querySelectorAll( ".app-video__tablet" ) ]
	this.phones = [ ...document.querySelectorAll( ".app-video__phone" ) ]
	this.images = [ ...document.querySelectorAll( ".app-image" ) ];

	[ ...this.tablets, ...this.phones, ...this.images ].forEach( el => {
		el.style.opacity = 0;
	} )

	if ( this.state === 1 ) {
		this.io = new IntersectionObserver( cb1, { threshold: 0.001 } );

		this.images.forEach( images => {
			this.io.observe( images )
		} )
	}

	else if ( this.state === 2 ) {
		this.io = new IntersectionObserver( cb2, { threshold: 0.001 } );

		this.tablets.forEach( tablet => {
			this.io.observe( tablet )
		} )
	}
}

const cb1 = function ( entries ) {

	entries.forEach( entry => {

		if ( entry.intersectionRatio > 0 ) {
			entry.target.classList.add( "fadeFromBottom" )
			entry.target.parentElement.parentElement.classList.add( "fadeFromBottom" )
			this.unobserve( entry.target )
		}
	} )
}

const cb2 = function ( entries ) {

	entries.forEach( entry => {
		const i = entry.target.dataset.index

		if ( entry.intersectionRatio > 0 ) {
			const newClass = i % 2 == 0 ? "fadeFromLeft" : "fadeFromRight"
			entry.target.classList.add( newClass )
			entry.target.nextElementSibling.classList.add( "fadeFromBottom" )
			entry.target.parentElement.nextElementSibling.classList.add( "fadeFromRight" )
			this.unobserve( entry.target )
		}
	} )
}

function getSources ( raw ) {

	let res = {}

	for ( let key in raw ) {
		let ext = Object.keys( raw[ key ] )[ 0 ]
		let name = key + "." + ext
		let source = raw[ key ][ Object.keys( raw[ key ] ) ]
		res = { ...res, [ name ]: source }
	}
	return res
}