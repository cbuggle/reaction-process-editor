import React from 'react';
import { Card, CardHeader } from "reactstrap";
import IconButton from "../utilities/IconButton";
import ActivityDecorator from '../../decorators/ActivityDecorator';

const ConditionFooter = (
  {
    activity,
    cardWidth,
    dragRef
  }) => {
  return (
    <Card className={'procedure-card procedure-card--condition'} style={{width: cardWidth}}>
      <CardHeader className={'d-flex justify-content-between align-items-center bg-condition'}>
        <h5 className='procedure-card__header-label rounded-pill bg-white mb-0 px-3'>{ActivityDecorator.numberedTitle(activity)}</h5>
        <div>
          <IconButton icon='arrows-alt-v' dragRef={dragRef} />
        </div>
      </CardHeader>
    </Card>
  );
};

export default ConditionFooter;
