import React from 'react'

import TooltipButton from './TooltipButton'

import { tooltips } from '../../constants/translations'

const TooltipLabel = ({ label, name, disabled }) => {

	const render = () => {
		return (
			<>
				{label}
				<TooltipButton tooltip={tooltips[name]} size="lg" />
			</>)
	}

	return (
		<>
			{disabled || render()}
		</>
	)
}

export default TooltipLabel
