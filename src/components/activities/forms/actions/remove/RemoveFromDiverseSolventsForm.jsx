import React from 'react'

import RemoveSolventListFormSection from './RemoveSolventListFormSection';

const RemoveFromDiverseSolventsForm = ({ workup, onWorkupChange }) => {
	return (
		<RemoveSolventListFormSection workup={workup} onWorkupChange={onWorkupChange} />
	);
};

export default RemoveFromDiverseSolventsForm
