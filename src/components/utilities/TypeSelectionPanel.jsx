import React from 'react';
import {Button} from "reactstrap";
import {actionTypeClusters} from "../../constants/actionTypeClusters";
import { conditionTypeClusters } from '../../constants/conditionTypeClusters';

const TypeSelectionPanel = ({onSelect, selectionType}) => {
    const clusters = (selectionType === 'action') ? actionTypeClusters : conditionTypeClusters
    return (
        <div className='type-selection-panel row'>
            {clusters.map((cluster, cIndex) => (
                <div key={cluster.id + cIndex} className='type-selection-panel__cluster col-4'>
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
                </div>
            ))}
        </div>
    );
};

export default TypeSelectionPanel;
