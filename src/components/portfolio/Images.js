import { onVisible } from "lb-onvisible"
import { setIntroClasses } from "./setIntroClasses"

export function Images ( sources ) {
	this.sources = sources
	this.containers = [].slice.call( document.querySelectorAll( ".app-media-container" ) )
	this.src = [ "weather-desktop.jpg", "weather-desktop.jpg", "weather-desktop.jpg" ]
	this.images = ""
}
Images.prototype.load = function () {
	this.containers.forEach( ( container, i ) => {
		container.innerHTML = `
			<img class="app-image" src="${ this.sources[ this.src[ i ] ] }" alt="weather-app-pic" />`
	} )
	this.images = [].slice.call( document.querySelectorAll( ".app-image" ) )
	this.setOnVisible()
}
Images.prototype.setOnVisible = function () {
	onVisible( this.images, { class: "fadeFromBottom" } )
	setIntroClasses()
}