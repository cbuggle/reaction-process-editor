import React, { useState } from "react";
import { Form, FormGroup } from "reactstrap";

import FormButtons from "../utilities/FormButtons";

import VesselFormSection from "../vessels/VesselFormSection";

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
      <VesselFormSection
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
