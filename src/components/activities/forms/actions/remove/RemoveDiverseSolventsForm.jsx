import React from 'react'

import RemoveSolventListFormSection from './RemoveSolventListFormSection';

const RemoveDiverseSolventsForm = ({ workup, onWorkupChange }) => {
	return (
		<RemoveSolventListFormSection workup={workup} onWorkupChange={onWorkupChange} />
	);
};

export default RemoveDiverseSolventsForm
