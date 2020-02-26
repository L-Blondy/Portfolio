export function ResizeHandler ( dictionary ) {
	this.state = 0
	this.prevState = 0
	this.dictionary = dictionary
}
ResizeHandler.prototype.setState = function ( state ) {
	this.state = state
	if ( this.state === this.prevState ) {
		return
	}
	else {
		const callback = this.dictionary[ this.state ]
		this.setCardsClass()
		callback()
		this.prevState = this.state
	}
	return this
}
ResizeHandler.prototype.setCardsClass = function () {
	const apps = [].slice.call( document.querySelectorAll( ".app" ) )
	apps.forEach( ( app, i ) => {
		if ( this.state === "image" ) {
			app.classList.remove( "app-left" )
			app.classList.remove( "app-right" )
			app.classList.add( "app-card" )
		}
		else if ( this.state === "video" ) {
			app.classList.remove( "app-card" )
			i % 2 === 0 ? app.classList.add( "app-left" ) : app.classList.add( "app-right" )
		}
	} )
	return this
}