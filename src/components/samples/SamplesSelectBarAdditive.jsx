import React from 'react'
import { Button, UncontrolledTooltip } from 'reactstrap'

const SamplesSelectBarAdditive = ({ sample }) => {
  return (
    <div className="sidebar-item-additive" id={"add-button-additive-" + sample.value}>
      <Button color="outline-primary" size="sm" className="sidebar-item-additive">
        <div className="additive-button-info">
          {sample.label}
        </div>
      </Button>
      < UncontrolledTooltip placement="left" target={"add-button-additive-" + sample.value} >
        {sample.label}
      </UncontrolledTooltip >
    </div>
  )
}

export default SamplesSelectBarAdditive
