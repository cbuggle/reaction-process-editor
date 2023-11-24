import React, { useState } from 'react';

const withActivitySteps = (WrappedComponent, stepsWorkupKey) => {
  const WithActivitySteps = (props) => {
    const [activitySteps, setActivitySteps] = useState(props.workup[stepsWorkupKey] || []);
    const [showNewStepForm, setShowNewStepForm] = useState(false);

    const addStep = () => setShowNewStepForm(true);

    const handleSaveStep = (stepInfo) => {
      let updatedSteps = [...activitySteps];
      updatedSteps[stepInfo.index] = stepInfo.data;
      setActivitySteps(updatedSteps);
      setShowNewStepForm(false);
      props.onWorkupChange({ name: stepsWorkupKey, value: updatedSteps });
    };

    const handleCancelStep = () => setShowNewStepForm(false);

    const handleDeleteStep = (idx) => {
      const updatedSteps = [...activitySteps];
      updatedSteps.splice(idx, 1);
      setActivitySteps(updatedSteps);
      props.onWorkupChange({ name: stepsWorkupKey, value: updatedSteps });
    };

    return (
      <WrappedComponent
        {...props}
        activitySteps={activitySteps}
        showNewStepForm={showNewStepForm}
        addStep={addStep}
        handleSaveStep={handleSaveStep}
        handleCancelStep={handleCancelStep}
        handleDeleteStep={handleDeleteStep}
      />
    );
  };

  return WithActivitySteps;
};

export default withActivitySteps;