import OptionalFormSet from "./OptionalFormSet";
import { Input } from "reactstrap";
import React, { useState } from "react";

const DescriptionFormSet = (
  {
    activityType,
    activity,
    onWorkupChange
  }) => {
  const [description, setDescription] = useState(activity.workup.description)

  const handleSaveDescription = () => {
    onWorkupChange({ name: 'description', value: description })
  }

  const handleCancelDescription = () => {
    setDescription(activity.workup.description)
  }

  return (
    <OptionalFormSet
      subFormLabel='Description'
      valueSummary={activity.workup.description}
      onSave={handleSaveDescription}
      onCancel={handleCancelDescription}
      typeColor={activityType}
    >
      <Input
        type="textarea"
        name="description"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />
    </OptionalFormSet>
  )
}

export default DescriptionFormSet
