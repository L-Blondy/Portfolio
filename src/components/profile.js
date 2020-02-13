import { writeOnVisible, WriteSequence } from "lb-write"

export function setupProfile () {

	const skills = document.querySelectorAll( ".profile-content__skills-skill span" )

	let skills_seqs = [];
	[].forEach.call( skills, ( skill, i ) => {
		if ( i === 0 ) return
		const skill_seq = new WriteSequence( skill, { speed: 3 } )
		skills_seqs = [ ...skills_seqs, skill_seq ]
	} )

	writeOnVisible( skills[ 0 ], { speed: 3 } )
		.then( () => handleSkillSeq( skills_seqs, skills ) )
}

function handleSkillSeq ( skills_seqs, skills, i = 0 ) {
	const dot = skills[ i + 1 ].previousElementSibling

	dot.classList.add( "fadeFromLeft-little" )
	skills_seqs[ i ].write().then( () => {
		if ( i + 1 < skills_seqs.length )
			handleSkillSeq( skills_seqs, skills, i + 1 )
	} )
}
