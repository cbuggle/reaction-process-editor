import React, { useContext, useState } from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import RemoveConditionsForm from './RemoveConditionsForm'
import OptionalFormSet from '../../formsets/OptionalFormSet'

import ActivityInfoDecorator from '../../../../../decorators/ActivityInfoDecorator'

import { SubFormController } from "../../../../../contexts/SubFormController";

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

	const subFormController = useContext(SubFormController);

	const [conditionsForm, setConditionsForm] = useState(workup || {});

	const summary = ActivityInfoDecorator.infoLineRemoveConditions(conditionsForm)

	label ||= "Limits Step " + (index + 1);

	const handleSave = () => onSave(conditionsForm)

	const handleDelete = () => {
		subFormController.toggleSubForm(label);
		onDelete(index);
	};

	const handleCancel = () => {
		setConditionsForm(workup)
		onCancel()
	}

	return (
		<OptionalFormSet
			subFormLabel={label}
			valueSummary={summary}
			onSave={handleSave}
			onCancel={handleCancel}
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
			<RemoveConditionsForm conditions={conditionsForm} onChange={setConditionsForm} />
		</OptionalFormSet>
	);
};

export default RemoveFromMethodStepForm
