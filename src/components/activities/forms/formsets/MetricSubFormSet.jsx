import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MetricsInput from "../../../utilities/MetricsInput";
import OptionalFormSet from "../../../utilities/OptionalFormSet";

import MetricsDecorator from "../../../../decorators/MetricsDecorator";

const MetricSubFormSet = ({
  metricName,
  amount,
  label,
  valueSummary,
  onSave,
  typeColor = "action",
  disabled
}) => {

  const [currentAmount, setCurrentAmount] = useState(amount);

  useEffect(() => {
    setCurrentAmount(amount)
  }, [amount])

  const resetFormData = () => setCurrentAmount(amount)

  const handleSave = () => onSave(currentAmount)

  return (
    <OptionalFormSet
      subFormLabel={label || MetricsDecorator.label(metricName)}
      valueSummary={valueSummary || MetricsDecorator.infoLineAmount(amount)}
      onSave={handleSave}
      onCancel={resetFormData}
      typeColor={typeColor}
      disabled={disabled}
    >
      <OptionalFormSet.ExtraButton>
        <Button color="condition" onClick={resetFormData} outline>
          <FontAwesomeIcon icon="undo-alt" /> Reset
        </Button>
      </OptionalFormSet.ExtraButton>
      <Row className="gx-1 mb-3">
        <Col md={8}>
          <MetricsInput
            metricName={metricName}
            amount={currentAmount}
            onChange={setCurrentAmount}
            displayMultiLine={true}
          />
        </Col>
      </Row>
    </OptionalFormSet>
  );
};

export default MetricSubFormSet;
