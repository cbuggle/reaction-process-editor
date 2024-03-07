import React, { useContext, useState } from "react";
import { FormGroup } from "reactstrap";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import FormSection from "../../../../utilities/FormSection";
import MetricsInput from "../../../../utilities/MetricsInput";
import SolventListForm from "./SolventListForm";
import VesselFormSection from "../../../../vessels/VesselFormSection";

import { SelectOptions } from "../../../../../contexts/SelectOptions";

const ExtractionForm = ({ workup, onWorkupChange }) => {
  const selectOptions = useContext(SelectOptions);
  const solventOptions = selectOptions.materials["SOLVENT"];
  const phaseOptions = selectOptions.purify.extraction.phases;

  const handleChangeReactionProcessVessel = (reactionProcessVessel) => {
    onWorkupChange({ name: "reaction_process_vessel", value: reactionProcessVessel });
  };

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
      <FormGroup>
        <VesselFormSection
          onChange={handleChangeReactionProcessVessel}
          reactionProcessVessel={workup.reaction_process_vessel || {}}
        />
      </FormGroup>
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
