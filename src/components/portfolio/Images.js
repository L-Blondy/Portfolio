import { onVisible } from "lb-onvisible"
import { setIntroClasses } from "./setIntroClasses"

export function Images ( sources ) {
	this.sources = sources
	this.containers = [].slice.call( document.querySelectorAll( ".app-media-container" ) )
	this.src = [
		[ "weather-desktop-1.jpg", "weather-desktop-2.jpg", "weather-desktop-3.jpg" ],
		[ "weather-desktop-1.jpg", "weather-desktop-2.jpg", "weather-desktop-3.jpg" ],
		[ "weather-desktop-1.jpg", "weather-desktop-2.jpg", "weather-desktop-3.jpg" ]
	]
	this.images = ""
}
Images.prototype.load = function () {
	this.containers.forEach( ( container, i ) => {
		const slides = this.src[ i ].reduce( ( r, c ) => [ ...r, this.sources[ c ] ], [] )

		if ( "IntersectionObserver" in window && "Promise" in window )
			container.innerHTML = `
				<div class="app-slider">
					<div class="app-image central">
						<img data-src="${ slides[ 0 ] }" data-srcset="${ slides[ 0 ] }" alt="weather-app-pic" />
					</div>
					<div class="app-image right" >
						<img data-src="${ slides[ 1 ] }" data-srcset="${ slides[ 1 ] }" alt="weather-app-pic" />
					</div>
					<div class="app-image left">
						<img data-src="${ slides[ 2 ] }" data-srcset="${ slides[ 2 ] }" alt="weather-app-pic" />
					</div>
				</div>`
		else {
			container.innerHTML = `
				<div class="app-slider">
					<div>
						<img class="app-image central" src="${ slides[ 0 ] }" srcset="${ slides[ 0 ] }" alt="weather-app-pic" />
					</div>
					<div>
						<img class="app-image right" src="${ slides[ 1 ] }" srcset="${ slides[ 1 ] }" alt="weather-app-pic" />
					</div>
					<div>
						<img class="app-image left" src="${ slides[ 2 ] }" srcset="${ slides[ 2 ] }" alt="weather-app-pic" />
					</div>
				</div>`
		}
	} )
	this.imagesCont = [].slice.call( document.querySelectorAll( ".app-image.central" ) )
	if ( "IntersectionObserver" in window ) {
		this.setOnVisible()
		this.setLazyLoad()
	}
}
Images.prototype.setOnVisible = function () {
	const that = this
	const onVisibleObs = new IntersectionObserver( cb, { threshold: 0.01 } )
	function cb ( entries ) {
		entries.forEach( e => {
			if ( e.intersectionRatio > 0 ) {
				e.target.classList.remove( "hideRight" )
				that.setAutoSlide( e.target )
				onVisibleObs.unobserve( e.target )
			}
		} )
	}
	this.imagesCont.forEach( img => {
		img.classList.add( "hideRight" )
		onVisibleObs.observe( img )
	} )
	setIntroClasses()
}
Images.prototype.setAutoSlide = function ( center ) {
	let cen = center
	let right = cen.nextElementSibling
	let left = right.nextElementSibling
	let temp

	setInterval( () => {
		cen.className = "app-image"
		cen.classList.add( "left" )
		right.className = "app-image"
		right.classList.add( "central" )
		left.className = "app-image"
		left.classList.add( "right" )

		temp = left
		left = cen
		cen = right
		right = temp
	}, 5000 )
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