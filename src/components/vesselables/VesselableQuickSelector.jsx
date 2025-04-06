import React, { useContext, useEffect, useState } from "react";

import { Button, Col, InputGroup, Input } from "reactstrap";

import { VesselOptions } from "../../contexts/VesselOptions";
import Select from "react-select";

const VesselableQuickSelector = ({
  currentVesselable,
  onSelectVesselable,
  typeColor,
}) => {

  useEffect(() => {
    if (currentVesselable && !filteredVesselableOptions.find(v => v.id === currentVesselable.id)) {
      setVesselLabelText('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVesselable])

  const vesselables = useContext(VesselOptions);

  const [vesselLabelText, setVesselLabelText] = useState('');

  const filteredVesselableOptions = vesselables
    .filter(vessel => vessel.short_label?.toLowerCase().match(vesselLabelText?.toLowerCase()))
    .map(vessel => { return { ...vessel, value: vessel.id, label: vessel.short_label } })

  const ambigousVessel = filteredVesselableOptions.length !== 1

  const setSelectedVesselable = () => {
    onSelectVesselable(filteredVesselableOptions[0])
  }

  const handleVesselInputKeyUp = (event) => {
    if (event.key === "Enter") {
      setSelectedVesselable()
    }
  }

  const handleSelectVesselable = (vesselable) => {
    onSelectVesselable(vesselable);
  };

  const renderVesselSelectSubmitButton = () => {
    return (
      <Button onClick={setSelectedVesselable} color={typeColor} disabled={ambigousVessel} >
        {filteredVesselableOptions[0].label}
      </Button >
    )
  }

  const renderVesselSelect = () => {
    return (
      <Select
        key={"filtered-vessels-" + filteredVesselableOptions.length}
        className="react-select--overwrite"
        classNamePrefix="react-select"
        name="filteredVesselableOptions"
        options={filteredVesselableOptions}
        value={filteredVesselableOptions[0]}
        onChange={handleSelectVesselable}
      />
    )

  }

  return (
    <>
      <InputGroup>
        <Col md={5}>
          <Input
            placeholder={'Find Vessel by Label'}
            value={vesselLabelText}
            onChange={(event) => setVesselLabelText(event.target.value)}
            onKeyUp={handleVesselInputKeyUp}
          />
        </Col>
        <Col md={2} className="text-center">
          {'(' + filteredVesselableOptions.length + ')'}
        </Col>
        <Col md={5}>
          {ambigousVessel ? renderVesselSelect() : renderVesselSelectSubmitButton()}
        </Col>
      </InputGroup>
    </>
  );
};

export default VesselableQuickSelector;
