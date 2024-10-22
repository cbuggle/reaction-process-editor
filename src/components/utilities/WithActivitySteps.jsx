import React, {useState } from 'react';

const withActivitySteps = (WrappedComponent, stepsWorkupKey) => {
  const WithActivitySteps = (props) => {

    const workupActivitySteps = props.workup[stepsWorkupKey] || []

    const [showNewStepForm, setShowNewStepForm] = useState(false);

   const addStep = () => setShowNewStepForm(true);

    const handleSaveStep = (index) => (data) => {
      let updatedSteps = [...workupActivitySteps];
      updatedSteps[index] = data;
      setShowNewStepForm(false);

      props.onWorkupChange({ name: stepsWorkupKey, value: updatedSteps });
    };

    const handleCancelStep = (_index) => () => {
      setShowNewStepForm(false);
    }

    const handleDeleteStep = (index) => () => {
      const updatedSteps = [...workupActivitySteps];
      updatedSteps.splice(index, 1);
      props.onWorkupChange({ name: stepsWorkupKey, value: updatedSteps });
    };

    return (
      <WrappedComponent
        {...props}
        activitySteps={workupActivitySteps}
        showNewStepForm={showNewStepForm}
        addStep={addStep}
        onSaveStep={handleSaveStep}
        onCancelStep={handleCancelStep}
        onDeleteStep={handleDeleteStep}
      />
    );
  };

  return WithActivitySteps;
};

export default withActivitySteps;
