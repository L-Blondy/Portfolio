import { onVisible } from "lb-onvisible"
import { setIntroClasses } from "./setIntroClasses"

export function Images ( sources ) {
	this.sources = sources
	this.containers = [].slice.call( document.querySelectorAll( ".app-media-container" ) )
	this.src = [
		[ "weather-desktop-1", "weather-desktop-2", "weather-desktop-3" ],
		[ "weather-desktop-1", "weather-desktop-2", "weather-desktop-3" ],
		[ "weather-desktop-1", "weather-desktop-2", "weather-desktop-3" ]
	]
	this.images = ""
}
Images.prototype.load = function () {
	this.containers.forEach( ( container, i ) => {

		const slides = this.src[ i ].reduce( ( r, c ) => {
			const realSrc = [ c + "_450w.jpg", c + "_800w.jpg", c + "_1200w.jpg" ].map( src => this.sources[ src ] )
			return [ ...r, ...realSrc ]
		}, [] )

		if ( "IntersectionObserver" in window && "Promise" in window )
			container.innerHTML = `
				<div class="app-slider">
					<div class="app-image active img1">
						<img class="central" data-src="${ slides[ 2 ] }" data-srcset="${ slides[ 0 ] } 450w,${ slides[ 1 ] } 800w, ${ slides[ 2 ] } 1200w" alt="weather-app-pic" />
					</div>
					<div class="app-image img2" >
						<img class="right" data-src="${ slides[ 5 ] }" data-srcset="${ slides[ 3 ] } 450w,${ slides[ 4 ] } 800w, ${ slides[ 5 ] } 1200w"  alt="weather-app-pic" />
					</div>
					<div class="app-image img3">
						<img class="left" data-src="${ slides[ 8 ] }" data-srcset="${ slides[ 6 ] } 450w,${ slides[ 7 ] } 800w, ${ slides[ 8 ] } 1200w"  alt="weather-app-pic" />
					</div>
				</div>`
		else {
			container.innerHTML = `
				<div class="app-slider">
					<div class="app-image active img1">
						<img class="central" src="${ slides[ 2 ] }" srcset="${ slides[ 0 ] } 450w,${ slides[ 1 ] } 800w, ${ slides[ 2 ] } 1200w" alt="weather-app-pic" />
					</div>
					<div class="app-image img2" >
						<img class="right" src="${ slides[ 5 ] }" srcset="${ slides[ 3 ] } 450w,${ slides[ 4 ] } 800w, ${ slides[ 5 ] } 1200w"  alt="weather-app-pic" />
					</div>
					<div class="app-image img3">
						<img class="left" src="${ slides[ 8 ] }" srcset="${ slides[ 6 ] } 450w,${ slides[ 7 ] } 800w, ${ slides[ 8 ] } 1200w"  alt="weather-app-pic" />
					</div>
				</div>`
		}
	} )
	this.imagesCont = [].slice.call( document.querySelectorAll( ".app-image.active" ) )
	if ( "IntersectionObserver" in window ) {
		this.setOnVisible()
		this.setLazyLoad()
	}
}
Images.prototype.setOnVisible = function () {
	const onVisibleObs = new IntersectionObserver( cb, { threshold: 0.01 } )
	function cb ( entries ) {
		entries.forEach( e => {
			if ( e.intersectionRatio > 0 ) {
				e.target.classList.remove( "hideRight" )
				onVisibleObs.unobserve( e.target )
			}
		} )
	}
	this.imagesCont.forEach( img => {
		img.parentElement.classList.add( "hideRight" )
		onVisibleObs.observe( img.parentElement )
		new AutoSlide( img ).setAutoSlideObs()
	} )
	setIntroClasses()
}

Images.prototype.setLazyLoad = function () {
	this.lazyObs = new IntersectionObserver( cb, { threshold: 0.01, rootMargin: "0px 0px 500px 0px" } )
	function cb ( entries ) {
		entries.forEach( e => {
			if ( e.intersectionRatio > 0 ) {
				const promise = new Promise( function ( resolve, reject ) {
					const img = e.target.children[ 0 ]
					img.src = img.dataset.src
					img.srcset = img.dataset.srcset

					img.onload = () => resolve( e.target )
					img.onerror = () => reject( new Error( "Could not load portfolio images" ) )
				} )
				promise.then( img => {
					const next1 = img.nextElementSibling.children[ 0 ]
					const next2 = img.nextElementSibling.nextElementSibling.children[ 0 ]
					next1.src = next1.dataset.src
					next1.srcset = next1.dataset.srcset
					next2.src = next2.dataset.src
					next2.srcset = next2.dataset.srcset
				} )
				this.unobserve( e.target )
			}
		} )
	}
	this.imagesCont.forEach( cont => {
		this.lazyObs.observe( cont )
	} )
}

function AutoSlide ( center ) {
	this.center = center.children[ 0 ]
	this.right = this.center.parentElement.nextElementSibling.children[ 0 ]
	this.left = this.right.parentElement.nextElementSibling.children[ 0 ]
	this.autoSlide = ""
}
AutoSlide.prototype.startAutoSlide = function () {
	this.autoSlide = setInterval( autoSlideCB.bind( this ), 6500 )

	function autoSlideCB () {
		this.center.className = this.right.className = this.left.className = "app-image"
		this.center.classList.add( "left" )
		this.center.parentElement.classList.remove( "active" )
		this.right.classList.add( "center" )
		this.right.parentElement.classList.add( "active" )
		this.left.classList.add( "right" );

		[ this.left, this.center, this.right ] = [ this.center, this.right, this.left ]
	}
}
AutoSlide.prototype.stopAutoSlide = function () {
	clearInterval( this.autoSlide )
}
AutoSlide.prototype.setAutoSlideObs = function () {
	const that = this
	this.obs = new IntersectionObserver( cb, { threshold: 0.9, rootMargin: "0px 500px 0px 500px" } )
	function cb ( entries ) {
		entries.forEach( e => {
			if ( e.intersectionRatio >= 0.9 ) {
				that.startAutoSlide()
			}
			else {
				that.autoSlide && that.stopAutoSlide()
			}
		} )
	}
	this.obs.observe( this.center.parentElement )
}