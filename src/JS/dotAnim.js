import { writeOnVisible, WriteSequence } from "lb-write"

export function setupDotAnim( skills, speed ) {

	skills = [].slice.call( skills )

	if ( "Promise" in window ) {

		let skills_seqs = [];
		skills.forEach( ( skill, i ) => {
			if ( i === 0 ) return
			const skill_seq = new WriteSequence( skill, { speed } )
			skills_seqs = [ ...skills_seqs, skill_seq ]
		} )

		writeOnVisible( skills[ 0 ], { speed } )
			.then( () => handleSkillSeq( skills_seqs, skills ) )
	}
	else {
		skills.forEach( skill => {
			const dot = skill.previousElementSibling
			dot.classList.add( "fadeFromLeft-1" )
		} )
	}
}

function handleSkillSeq( skills_seqs, skills, i = 0 ) {
	const dot = skills[ i + 1 ].previousElementSibling

	dot.classList.add( "fadeFromLeft-1" )
	skills_seqs[ i ].write().then( () => {
		if ( i + 1 < skills_seqs.length )
			handleSkillSeq( skills_seqs, skills, i + 1 )
	} )
}
