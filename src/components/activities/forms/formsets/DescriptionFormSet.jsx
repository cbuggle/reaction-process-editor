import React, { useState } from "react";
import { Input } from "reactstrap";

import OptionalFormSet from "./OptionalFormSet";

const DescriptionFormSet = (
  {
    activityType,
    workup,
    onWorkupChange
  }) => {
  const [description, setDescription] = useState(workup?.description)

  const handleSaveDescription = () => {
    onWorkupChange({ name: 'description', value: description })
  }

  const handleCancelDescription = () => {
    setDescription(workup.description)
  }

  return (
    <OptionalFormSet
      subFormLabel='Description'
      valueSummary={workup?.description}
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
