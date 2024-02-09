import React from 'react';
import {Button, Row, Col} from "reactstrap";
import { actionTypeClusters } from "../../constants/actionTypeClusters";

const TypeSelectionPanel = ({ onSelect }) => {
  const clusters = actionTypeClusters
  return (
    <Row className='type-selection-panel'>
      {clusters.map((cluster, cIndex) => (
        <Col key={cluster.id + cIndex} className='type-selection-panel__cluster col-6'>
          <h5>{cluster.label}</h5>
          {cluster.types.map((type, tIndex) => (
            <Button
              key={type.id + tIndex}
              onClick={onSelect(type.activity)}
              className='col-12 btn-action'
            >
              {type.createLabel}
            </Button>
          ))}
        </Col>
      ))}
    </Row>
  );
};

export default TypeSelectionPanel;
