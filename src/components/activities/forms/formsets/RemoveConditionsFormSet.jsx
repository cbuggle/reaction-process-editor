import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import RemoveConditionsFormGroup from '../formgroups/RemoveConditionsFormGroup'
import OptionalFormSet from './OptionalFormSet'

import ActivityInfoDecorator from '../../../../decorators/ActivityInfoDecorator'

import { SubFormController } from "../../../../contexts/SubFormController";

const RemoveConditionsFormSet = ({
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

	const [conditionsForm, setConditionsForm] = useState(workup || preconditions);

	useEffect(() => {
		setConditionsForm(workup || preconditions)
	}, [workup, preconditions])

	const summary = ActivityInfoDecorator.infoLineRemoveConditions(workup)

	label ||= index ? "Conditions Step " + (index + 1) : 'Conditions';

	const handleSave = () => onSave(conditionsForm)

	const handleDelete = () => {
		subFormController.toggleSubForm(label);
		onDelete(index);
	};

	const handleCancel = () => {
		setConditionsForm(workup || preconditions)
		onCancel && onCancel()
	}

	const resetForm = () => {
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

			<RemoveConditionsFormGroup
				key={conditionsForm}
				conditions={conditionsForm}
				onChange={setConditionsForm} />
		</OptionalFormSet>
	);
};

export default RemoveConditionsFormSet
