import React from 'react'

import InfoLinesBox from './InfoLinesBox';
import TimeDecorator from '../../../../../decorators/TimeDecorator';

const WaitInfo = ({ activity }) => {
	return activity.workup.duration ? "" : "Duration undefined"
}

export default WaitInfo
