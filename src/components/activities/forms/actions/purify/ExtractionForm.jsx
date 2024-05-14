import React, { useContext } from "react";
import { FormGroup } from "reactstrap";

import ButtonGroupToggle from "../../../../utilities/ButtonGroupToggle";
import FormSection from "../../../../utilities/FormSection";
import MetricsInput from "../../../../utilities/MetricsInput";
import SolventListForm from "./SolventListForm";
import VesselFormSection from "../../../../vessels/VesselFormSection";

import { SelectOptions } from "../../../../../contexts/SelectOptions";

const ExtractionForm = ({ workup, onWorkupChange, reactionProcessVessel, onChangeVessel }) => {
  const selectOptions = useContext(SelectOptions);
  const solventOptions = selectOptions.materials["SOLVENT"];
  const phaseOptions = selectOptions.purify.extraction.phases;

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
      <ButtonGroupToggle
        value={workup.phase}
        options={phaseOptions}
        onChange={(selectedValue) =>
          onWorkupChange({ name: "phase", value: selectedValue })
        }
        label="Keep phase"
      />
      <FormGroup>
        <VesselFormSection
          onChange={onChangeVessel}
          reactionProcessVessel={reactionProcessVessel || {}}
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
