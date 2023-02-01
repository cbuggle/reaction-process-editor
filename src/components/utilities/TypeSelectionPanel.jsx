import React from 'react';
import {Button, Row, Col} from "reactstrap";
import { actionTypeClusters } from "../../constants/actionTypeClusters";
import { conditionTypeClusters } from '../../constants/conditionTypeClusters';

const TypeSelectionPanel = ({ onSelect, selectionType }) => {
  const clusters = (selectionType === 'action') ? actionTypeClusters : conditionTypeClusters
  const colWidth = (selectionType === 'action') ? 4 : 6
  return (
    <Row className='type-selection-panel'>
      {clusters.map((cluster, cIndex) => (
        <Col key={cluster.id + cIndex} className={'type-selection-panel__cluster col-' +colWidth}>
          <h6>{cluster.label}</h6>
          {cluster.types.map((type, tIndex) => (
            <Button
              key={type.id + tIndex}
              onClick={onSelect(type.action)}
              className={'col-12 btn-' + selectionType}
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
