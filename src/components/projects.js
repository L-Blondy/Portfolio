let sources = getSources( require( "../assets/video/*.*" ) )

export function handleVideo () {

	const vid_c_all = [].slice.call( document.querySelectorAll( ".app-video" ) )

	vid_c_all.forEach( ( vid_c, i ) => {

		if ( window.matchMedia( "(max-width:576px)" ).matches ) {

			let src = i === 0 ? "weather-pic.jpg" : i === 1 ? "weather-pic.jpg" : "weather-pic.jpg";
			vid_c.innerHTML = `
				<img src="${ sources[ src ] }" alt="weather-app-pic" />`

		}
		else if ( window.matchMedia( "(max-width:991.8px)" ).matches ) {
			let src = i === 0 ? "weather-tablet.mp4" : i === 1 ? "weather-tablet.mp4" : "weather-tablet.mp4";
			vid_c.innerHTML = `
				<video class="app-video__tablet">
					<source src="${ sources[ src ] }" type="video/mp4" alt="video">
				</video>`
		}
		else if ( window.matchMedia( "(min-width:992px)" ).matches ) {
			let src_tablet = i === 0 ? "weather-tablet.mp4" : i === 1 ? "weather-tablet.mp4" : "weather-tablet.mp4";
			let src_phone = i === 0 ? "weather-phone2.mp4" : i === 1 ? "weather-phone2.mp4" : "weather-phone2.mp4";
			vid_c.innerHTML = `
				<video class="app-video__tablet" data-index="${i }" data-type="tablet">
					<source src="${ sources[ src_tablet ] }" type="video/mp4">
				</video>
				<video class="app-video__phone" data-type="phone">
					<source src="${ sources[ src_phone ] }" type="video/mp4"">
				</video>`

			if ( "IntersectionObserver" in window ) {
				const io = new IntersectionObserver( cb, { threshold: 0.01 } )
				const tablets = document.querySelectorAll( ".app-video__tablet" )
				const phones = document.querySelectorAll( ".app-video__phone" )
				const allVids = [ ...tablets, ...phones ]

				allVids.forEach( ( vid ) => {
					vid.style.opacity = 0;
					if ( vid.dataset.type === "tablet" )
						io.observe( vid )
				} )

				function cb ( entries ) {
					entries.forEach( ( entry ) => {
						const i = entry.target.dataset.index
						if ( entry.intersectionRatio > 0 ) {
							console.log( i )
							const newClass = i % 2 == 0 ? "fadeFromLeft" : "fadeFromRight"
							entry.target.classList.add( newClass )
							entry.target.nextElementSibling.classList.add( "fadeFromBottom" )
							io.unobserve( entry.target )
						}
					} )
				}
			}
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