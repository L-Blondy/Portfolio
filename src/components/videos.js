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
	this.playing = ""
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
				<video class="app-video__tablet ${i % 2 == 0 ? "hideLeft" : "hideRight" }" data-index="${ i }" muted="muted" controls="true">
					<source src="${ sources[ tablet_src[ i ] ] }" type="video/mp4" >
				</video>
				<video class="app-video__phone hideBottom" muted="muted" controls="true">
					<source src="${ sources[ phone_src[ i ] ] }" type="video/mp4">
				</video>`
		}
	} )
	if ( "IntersectionObserver" in window ) {
		this.io && this.io.disconnect()
		this.playPause_observer && this.playPause_observer.disconnect()
		this.setupAnimation()
	} else {
		[].slice.call( document.querySelectorAll( ".app-video__tablet" ) ).forEach( tablet => {
			tablet.classList.remove( "hideLeft" )
			tablet.classList.remove( "hideRight" )
		} );
		[].slice.call( document.querySelectorAll( ".app-video__phone" ) ).forEach( phone => {
			phone.classList.remove( "hideBottom" )
		} )
	}
}

Videos.prototype.setupAnimation = function () {

	this.tablets = [ ...document.querySelectorAll( ".app-video__tablet" ) ]
	this.phones = [ ...document.querySelectorAll( ".app-video__phone" ) ]
	this.images = [ ...document.querySelectorAll( ".app-image" ) ];

	if ( this.state === 1 ) {
		this.io = new IntersectionObserver( CSS_animation_cb1, { threshold: 0.001 } );

		this.images.forEach( images => {
			this.io.observe( images )
		} )
	}

	else if ( this.state === 2 ) {
		this.io = new IntersectionObserver( CSS_animation_cb2, { threshold: 0.001 } );
		this.playPause_observer = new IntersectionObserver( playPause_cb, { threshold: 0.8 } );

		this.tablets.forEach( ( tablet, i ) => {
			this.io.observe( tablet )
			this.playPause_observer.observe( tablet )

			tablet.addEventListener( "ended", ( e ) => cb3( e, tablet, i, this ), { once: true } )
		} )
	}
}

const CSS_animation_cb1 = function ( entries ) {

	entries.forEach( entry => {

		if ( entry.intersectionRatio > 0 ) {
			entry.target.classList.add( "fadeFromBottom" )
			entry.target.parentElement.parentElement.classList.add( "fadeFromBottom" )
			this.unobserve( entry.target )
		}
	} )
}

const CSS_animation_cb2 = function ( entries ) {

	entries.forEach( entry => {
		const i = entry.target.dataset.index

		if ( entry.intersectionRatio > 0 ) {
			//ADD ANIMATION FOR TEXT HERE
			entry.target.classList.remove( "hideLeft" )
			entry.target.classList.remove( "hideRight" )
			entry.target.nextElementSibling.classList.remove( "hideBottom" )
			this.unobserve( entry.target )
		}
	} )
}

const cb3 = ( e, tablet, i, that ) => {
	tablet.parentElement.dataset.playing = "phone"
	i % 2 === 0 ? tablet.classList.add( "hideLeft" ) : tablet.classList.add( "hideRight" )
	tablet.classList.remove( "has-focus-tablet" )
	that.phones[ i ].classList.remove( "not-focus-phone" )
	that.phones[ i ].classList.add( "has-focus-phone" )
	that.phones[ i ].play()
	that.phones[ i ].playbackRate = 15
	that.phones[ i ].addEventListener( "ended", ( e ) => {
		that.phones[ i ].parentElement.dataset.playing = "tablet"
		that.phones[ i ].classList.remove( "has-focus-phone" )
		tablet.classList.remove( "hideLeft" )
		tablet.classList.remove( "hideRight" )
		that.io.unobserve( tablet )
		that.playPause_observer.unobserve( tablet )
		that.phones[ i ].parentElement.addEventListener( "click", () => {
			that.io.observe( tablet )
			that.playPause_observer.observe( tablet )
			tablet.addEventListener( "ended", ( e ) => cb3( e, tablet, i, that ), { once: true } )
		}, { once: true } )
	}, { once: true } )
}

const playPause_cb = function ( entries ) {
	entries.forEach( entry => {
		const playing = entry.target.parentElement.dataset.playing
		let video;

		if ( playing === "tablet" ) {
			video = entry.target
		}
		else if ( playing === "phone" ) {
			video = entry.target.nextElementSibling
		}
		if ( entry.intersectionRatio >= 0.8 ) {
			entry.target.classList.add( "has-focus-tablet" )
			entry.target.nextElementSibling.classList.add( "not-focus-phone" )
			this.playing && this.playing.pause()
			this.playing = video
			video.play()
		}
		else if ( entry.intersectionRatio < 0.8 && entry.intersectionRatio > 0.5 ) {
			entry.target.classList.remove( "has-focus-tablet" )
			entry.target.nextElementSibling.classList.remove( "not-focus-phone" )
			entry.target.pause()
		}
		video.playbackRate = 15
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