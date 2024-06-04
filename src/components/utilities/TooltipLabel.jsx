import React from 'react'

import TooltipButton from './TooltipButton'

import { tooltips } from '../../constants/translations'

const TooltipLabel = ({ label, name }) => {

	return (
		<>
			{label}
			<TooltipButton tooltip={tooltips[name]} size="lg" />
		</>
	)
}

export default TooltipLabel
