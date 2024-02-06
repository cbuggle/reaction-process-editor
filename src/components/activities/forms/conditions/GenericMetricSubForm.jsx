import React, { useContext, useState } from "react";
import { Input, Label, FormGroup, Row, Col } from "reactstrap";
import Select from "react-select";

import MetricsInput from "../../../utilities/MetricsInput";
import OptionalFormSet from "../../../utilities/OptionalFormSet";

import MetricsDecorator from "../../../../decorators/MetricsDecorator";
import { SelectOptions } from "../../../../contexts/SelectOptions";

const GenericMetricSubForm = ({
  metricName,
  valueSummary,
  children,
  findInitialValue,
  onSave,
  onCancel,
  isEqualToPredefinedValue = false,
  typeColor = "condition",
}) => {
  const selectOptions = useContext(SelectOptions);

  const additionalInformationOptions =
    selectOptions.condition_additional_information[metricName];

  const initialAmount = () => {
    return {
      value: findInitialValue(
        "value",
        MetricsDecorator.defaultValueInDefaultUnit(metricName)
      ),
      unit: findInitialValue("unit", MetricsDecorator.defaultUnit(metricName)),
    };
  };

  const initialPowerAmount = () =>
    findInitialValue("power", MetricsDecorator.defaultAmount("POWER"));
  const initialPowerEndAmount = () =>
    findInitialValue("power_end", MetricsDecorator.defaultAmount("POWER_END"));

  const initialPowerRamp = () => findInitialValue("power_is_ramp", false);
  const initialAdditionalInformation = () =>
    findInitialValue("additional_information", "");

  const [amount, setAmount] = useState(initialAmount());
  const [powerAmount, setPowerAmount] = useState(initialPowerAmount());
  const [powerRamp, setPowerRamp] = useState(initialPowerRamp());
  const [powerEndAmount, setPowerEndAmount] = useState(initialPowerEndAmount());
  const [additionalInformation, setAdditionalInformation] = useState(
    initialAdditionalInformation()
  );

  const currentSelectedAdditionalInformationOption =
    additionalInformationOptions.find(
      (option) => option.value === additionalInformation
    );

  const resetFormData = () => {
    setAmount(initialAmount());
    setPowerAmount(initialPowerAmount());
    setPowerRamp(initialPowerRamp());
    setPowerEndAmount(initialPowerEndAmount());
    setAdditionalInformation(initialAdditionalInformation());
  };

  const renderPowerForm = () => {
    return (
      <FormGroup>
        <FormGroup check>
          <Input
            type="checkbox"
            checked={!!powerRamp}
            onChange={(event) => setPowerRamp(event.target.checked)}
          />
          <Label check>{"Power Ramp"}</Label>
        </FormGroup>
        <MetricsInput
          metricName={"POWER_START"}
          amount={powerAmount}
          onChange={setPowerAmount}
        />
        {!!powerRamp && (
          <MetricsInput
            metricName={"POWER_END"}
            amount={powerEndAmount}
            onChange={setPowerEndAmount}
          />
        )}
      </FormGroup>
    );
  };

  const renderAdditionalInformationSelect = () => {
    return (
      <FormGroup>
        <Label>Additional Information</Label>
        <Select
          className="react-select--overwrite"
          classNamePrefix="react-select"
          name="additional_information"
          options={additionalInformationOptions}
          value={currentSelectedAdditionalInformationOption}
          onChange={(selectedOption) =>
            setAdditionalInformation(selectedOption.value)
          }
        />
      </FormGroup>
    );
  };

  const handleSave = () => {
    let condition = {
      value: amount.value,
      unit: amount.unit,
      additional_information: additionalInformation,
    };

    if (metricName === "IRRADIATION") {
      condition.power = powerAmount;
      if (powerRamp) {
        condition.power_is_ramp = powerRamp;
        condition.power_end = powerEndAmount;
      }
    }
    onSave(condition);
  };

  const handleCancel = () => {
    resetFormData();
    onCancel();
  };
  return (
    <OptionalFormSet
      subFormLabel={MetricsDecorator.label(metricName)}
      valueSummary={valueSummary}
      onSave={handleSave}
      onCancel={handleCancel}
      isEqualToPredefinedValue={isEqualToPredefinedValue}
      typeColor={typeColor}
    >
      <Row className="gx-1 mb-3">
        <Col md={8}>
          <MetricsInput
            metricName={metricName}
            amount={amount}
            onChange={setAmount}
            displayMultiLine={true}
          />
        </Col>
      </Row>
      {metricName === "IRRADIATION" && renderPowerForm()}
      {additionalInformationOptions.length > 0 &&
        renderAdditionalInformationSelect()}
      {children}
    </OptionalFormSet>
  );
};

export default GenericMetricSubForm;
