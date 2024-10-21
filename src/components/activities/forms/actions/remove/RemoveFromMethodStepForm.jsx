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
	preconditions,
	onSave,
	onCancel,
	onDelete,
	canDelete,
	initialShowForm,
	label
}) => {

	const subFormController = useContext(SubFormController);

	const [conditionsForm, setConditionsForm] = useState(workup || preconditions || {});

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

	const resetForm = () => {
		console.log("resetting")
		console.log(preconditions)
		console.log(workup)
		setConditionsForm(preconditions || {})
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
			<OptionalFormSet.ExtraButton>
				{canDelete &&
					<Button color="danger" onClick={handleDelete}>
						<FontAwesomeIcon icon="trash" />
					</Button>
				}
				<Button color="condition" onClick={resetForm} outline>
					<FontAwesomeIcon icon="undo-alt" /> Reset
				</Button>
			</OptionalFormSet.ExtraButton>

			<RemoveConditionsForm
				key={conditionsForm}
				conditions={conditionsForm}
				onChange={setConditionsForm} />
		</OptionalFormSet>
	);
};

export default RemoveFromMethodStepForm
