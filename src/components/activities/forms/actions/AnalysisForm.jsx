import React, { useContext } from "react";
import { Input } from "reactstrap";
import Select from "react-select";

import SingleLineFormGroup from "../../../utilities/SingleLineFormGroup";
import FormSection from "../../../utilities/FormSection";

import OptionsDecorator from "../../../../decorators/OptionsDecorator";

import { SelectOptions } from "../../../../contexts/SelectOptions";

const AnalysisForm = ({ workup, onWorkupChange }) => {
  const selectOptions = useContext(SelectOptions);

  return (
    <FormSection type="action">
      <SingleLineFormGroup label="Type">
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="analysis_type"
          options={selectOptions.analysis_types}
          value={OptionsDecorator.optionToLabel(
            workup.analysis_type,
            selectOptions.analysis_types
          )}
          onChange={(selectedOption) =>
            onWorkupChange({
              name: "analysis_type",
              value: selectedOption.value,
            })
          }
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label="CHMO ID">
        <Input
          type="textarea"
          value={workup["chmo_id"]}
          placeholder="CHMO Id"
          onChange={(event) =>
            onWorkupChange({ name: "chmo_id", value: event.target.value })
          }
        />
      </SingleLineFormGroup>
      <SingleLineFormGroup label="Number">
        <Input
          type="textarea"
          value={workup["analysis_number"]}
          placeholder="Description"
          onChange={(event) =>
            onWorkupChange({
              name: "analysis_number",
              value: event.target.value,
            })
          }
        />
      </SingleLineFormGroup>
    </FormSection>
  );
};

export default AnalysisForm;
