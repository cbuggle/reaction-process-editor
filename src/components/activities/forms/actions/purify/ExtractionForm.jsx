import React, { useContext, useState } from "react";
import { FormGroup } from "reactstrap";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import FormSection from "../../../../utilities/FormSection";
import MetricsInput from "../../../../utilities/MetricsInput";
import SolventListForm from "./SolventListForm";
import VesselFormSection from "../../../../vessels/VesselFormSection";
import VesselDecorator from "../../../../../decorators/VesselDecorator";

import { SelectOptions } from "../../../../../contexts/SelectOptions";
import { VesselOptions } from "../../../../../contexts/VesselOptions";

const ExtractionForm = ({ workup, onWorkupChange }) => {
  const selectOptions = useContext(SelectOptions);
  const solventOptions = selectOptions.materials["SOLVENT"];
  const phaseOptions = selectOptions.purify.extraction.phases;
  const vessels = useContext(VesselOptions);

  const assignVessel = (vesselId) => {
    setCurrentVessel(VesselDecorator.getVesselById(vesselId, vessels));
    onWorkupChange({ name: "vessel_id", value: vesselId });
  };

  const [currentVessel, setCurrentVessel] = useState(
    VesselDecorator.getVesselById(workup.vessel_id, vessels)
  );

  const solvents = workup.solvents || [];
  const amount = workup.amount || { value: 0, unit: "ml" };

  const handleWorkupChange = (workupKey) => (value) =>
    onWorkupChange({ name: workupKey, value: value });

  return (
    <>
      <ButtonGroupToggle
        value={workup.automation}
        options={selectOptions.automation_modes}
        onChange={(selectedValue) =>
          onWorkupChange({ name: "automation", value: selectedValue })
        }
        label="Automation"
      />

      {workup.automation === "AUTOMATED" && (
        <ButtonGroupToggle
          value={workup.phase}
          options={phaseOptions}
          onChange={(selectedValue) =>
            onWorkupChange({ name: "phase", value: selectedValue })
          }
          label="Phase"
        />
      )}
      <VesselFormSection
        currentVessel={currentVessel}
        onSelectVessel={assignVessel}
        typeColor="action"
        buttonLabel={!!currentVessel ? "Change" : "Set"}
        scope={"Sample" + (workup.name ? ' "' + workup.name + '"' : "")}
      />
      <FormSection type="action">
        <FormGroup>
          <SolventListForm
            solvents={solvents}
            solventOptions={solventOptions}
            setSolvents={handleWorkupChange("solvents")}
          />
        </FormGroup>
        <FormGroup>
          <MetricsInput
            metricName={"VOLUME"}
            amount={amount}
            onChange={handleWorkupChange("amount")}
          />
        </FormGroup>
      </FormSection>
    </>
  );
};

export default ExtractionForm;
