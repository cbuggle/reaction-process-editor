import React, { useState } from "react";
import { Form, FormGroup } from "reactstrap";

import FormButtons from "../utilities/FormButtons";

import VesselableFormSection from "../vesselables/VesselableFormSection";

const VesselPreparationForm = ({ reactionProcessVessel, onSave, onCancel }) => {
  const [currentVessel, setCurrentVessel] = useState(reactionProcessVessel);

  const handleSave = () => {
    onSave(currentVessel);
  };

  const handleCancel = () => {
    setCurrentVessel(reactionProcessVessel);
    onCancel();
  };

  return (
    <Form>
      <VesselableFormSection
        onChange={setCurrentVessel}
        reactionProcessVessel={currentVessel}
      />
      <FormGroup>
        <FormButtons
          onSave={handleSave}
          onCancel={handleCancel}
          type="preparation"
        />
      </FormGroup>
    </Form>
  );
};

export default VesselPreparationForm;
