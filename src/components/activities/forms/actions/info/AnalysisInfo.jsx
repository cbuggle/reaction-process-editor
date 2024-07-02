import React, { useContext } from 'react'

import InfoLinesBox from './InfoLinesBox';

import OptionsDecorator from '../../../../../decorators/OptionsDecorator';
import { SelectOptions } from '../../../../../contexts/SelectOptions';

const AnalysisInfo = ({ activity }) => {

	const selectOptions = useContext(SelectOptions)

	let workup = activity.workup
	let infoTitle = OptionsDecorator.optionToLabel(workup.analysis_type, selectOptions.analysis_types);

	return (
		<InfoLinesBox title={infoTitle} />
	)
}

export default AnalysisInfo
