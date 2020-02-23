import { setIntroClasses } from "./setIntroClasses"

export function Videos ( sources ) {
	this.sources = sources
	this.containers = [].slice.call( document.querySelectorAll( ".app-media-container" ) )
	this.tablet_src = [ "weather-tablet.mp4", "weather-tablet.mp4", "weather-tablet.mp4" ]
	this.phone_src = [ "weather-phone.mp4", "weather-phone.mp4", "weather-phone.mp4" ]
	this.tablets = ""
	this.phones = ""
}

Videos.prototype.load = function () {
	this.containers.forEach( ( container, i ) => {
		container.innerHTML = `
		<video class="app-video__tablet ${i % 2 == 0 ? "hideLeft" : "hideRight" }" data-index="${ i }" muted="muted" controls="true">
			<source src="${ this.sources[ this.tablet_src[ i ] ] }" type="video/mp4" >
		</video>
		<video class="app-video__phone hideBottom" muted="muted" controls="true">
			<source src="${ this.sources[ this.phone_src[ i ] ] }" type="video/mp4">
		</video>`
	} )
	this.tablets = [].slice.call( document.querySelectorAll( ".app-video__tablet" ) )
	this.phones = [].slice.call( document.querySelectorAll( ".app-video__phone" ) )
	this.setOnVisible()
	this.setPlayPauseObs()
	return this
}

Videos.prototype.setOnVisible = function () {
	const onVisibleObs = new IntersectionObserver( removeClass, { threshold: 0.01 } )
	function removeClass ( entries ) {
		entries.forEach( e => {
			if ( e.intersectionRatio > 0 ) {
				e.target.classList.remove( "hideLeft" )
				e.target.classList.remove( "hideRight" )
				e.target.nextElementSibling.classList.remove( "hideBottom" )
				onVisibleObs.unobserve( e.target )
			}
		} )
	}
	this.tablets.forEach( tablet => {
		onVisibleObs.observe( tablet )
	} )
	setIntroClasses()
}
Videos.prototype.setPlayPauseObs = function () {
	const setPlayPauseObs = new IntersectionObserver( playPause, { threshold: 1 } )
	this.tablets.forEach( tablet => {
		setPlayPauseObs.observe( tablet )
		tablet.addEventListener( "ended", this.switchToPhone, { once: true } )
	} )

	function playPause ( entries ) {
		entries.forEach( e => {
			const state = e.target.parentElement.dataset.playing
			const tablet = e.target
			const phone = e.target.nextElementSibling

			if ( e.intersectionRatio >= 1 ) {
				if ( state === "tablet" ) {
					try { tablet.play() }
					catch ( e ) { tablet.play(); console.log( "try again" ) }
					tablet.playbackRate = 15
					!tablet.classList.contains( "playing-tablet" ) && tablet.classList.add( "playing-tablet" )
					!phone.classList.contains( "hiding-phone" ) && phone.classList.add( "hiding-phone" )
				}
				if ( state === "phone" ) {
					try { phone.play() }
					catch ( e ) { phone.play(); console.log( "try again" ) }
					phone.playbackRate = 15
					!phone.classList.contains( "playing-phone" ) && phone.classList.add( "playing-phone" )
					!tablet.classList.contains( "hideLeft" ) && tablet.classList.add( "hideLeft" )
				}
			}
			else if ( e.intersectionRatio < 1 ) {
				tablet.pause()
				phone.pause()
			}
		} )
	}
}
Videos.prototype.switchToPhone = function ( e ) {
	const tablet = e.target
	const phone = e.target.nextElementSibling

	tablet.classList.remove( "playing-tablet" )
	tablet.classList.add( "hideLeft" )
	phone.classList.remove( "hiding-phone" )
	phone.classList.add( "playing-phone" )
	phone.play()
	phone.playbackRate = 15
	phone.addEventListener( "ended", function () {
		tablet.classList.remove( "hideLeft" )
		phone.classList.remove( "playing-phone" )
	}, { once: true } )
}
