export default function getMediaSources ( raw ) {
	let res = {}
	for ( let key in raw ) {
		let ext = Object.keys( raw[ key ] )[ 0 ]
		let name = key + "." + ext
		let source = raw[ key ][ Object.keys( raw[ key ] ) ]
		res = { ...res, [ name ]: source }
	}
	return res
} 