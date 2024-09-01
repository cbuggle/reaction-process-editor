import React, { useEffect, useState } from 'react';

const withActivitySteps = (WrappedComponent, stepsWorkupKey) => {
  const WithActivitySteps = (props) => {

    const workupActivitySteps = props.workup[stepsWorkupKey]

    const [activitySteps, setActivitySteps] = useState(workupActivitySteps || []);
    const [showNewStepForm, setShowNewStepForm] = useState(false);

    useEffect(() => {
      setActivitySteps(workupActivitySteps || [])
    }, [props.workup, workupActivitySteps])

    const addStep = () => setShowNewStepForm(true);

    const handleSaveStep = (index) => (data) => {
      let updatedSteps = [...activitySteps];
      updatedSteps[index] = data;
      setActivitySteps(updatedSteps);
      setShowNewStepForm(false);

      props.onWorkupChange({ name: stepsWorkupKey, value: updatedSteps });
    };

    const handleCancelStep = (index) => () => {
      setActivitySteps(workupActivitySteps || []);
      setShowNewStepForm(false);
    }

    const handleDeleteStep = (index) => () => {
      const updatedSteps = [...activitySteps];
      updatedSteps.splice(index, 1);
      props.onWorkupChange({ name: stepsWorkupKey, value: updatedSteps });
    };

    return (
      <WrappedComponent
        {...props}
        activitySteps={activitySteps}
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
