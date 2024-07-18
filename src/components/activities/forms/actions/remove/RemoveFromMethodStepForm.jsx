import React, { useState } from 'react'

import { Button } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import RemoveConditionsForm from './RemoveConditionsForm'
import ActivityInfoDecorator from '../../../../../decorators/ActivityInfoDecorator'

import OptionalFormSet from '../../../../utilities/OptionalFormSet'

const RemoveFromMethodStepForm = ({
	index,
	workup,
	onSave,
	onCancel,
	onDelete,
	canDelete,
	initialShowForm,
	label
}) => {

	const [conditionsForm, setConditionsForm] = useState(workup || {});

	const summary = ActivityInfoDecorator.infoLineRemoveConditions(conditionsForm)

	label ||= "Limits Step " + (index + 1);

	const changeCondition = (name) => (value) => { setConditionsForm({ ...conditionsForm, [name]: value }) }

	const handleSave = () => { onSave({ index, data: conditionsForm }) }

	const handleDelete = () => { onDelete(index); };

	return (
		<OptionalFormSet
			subFormLabel={label}
			valueSummary={summary}
			onSave={handleSave}
			onCancel={onCancel}
			typeColor="action"
			initialShowForm={initialShowForm}
		>
			{canDelete && (
				<OptionalFormSet.ExtraButton>
					<Button color="danger" onClick={handleDelete}>
						<FontAwesomeIcon icon="trash" />
					</Button>
				</OptionalFormSet.ExtraButton>
			)}
			<RemoveConditionsForm workup={conditionsForm} onWorkupChange={changeCondition} />
		</OptionalFormSet>
	);
};

export default RemoveFromMethodStepForm



