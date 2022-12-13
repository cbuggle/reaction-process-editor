import React  from 'react'

import { Button, UncontrolledTooltip } from 'reactstrap'

import SamplesDecorator from './SamplesDecorator'

const SamplesSelectBarSample = ({ sample, layout }) => {

  const renderSolvent = () => {
    return (
      <>
        <div className="sidebar-item-sample-label">
          {SamplesDecorator.labelForButtonSolvent(sample)}
        </div>
        <div className="sidebar-item-sample-info">
          {SamplesDecorator.infoForButtonSolvent(sample)}
        </div>
      </>
    )
  }

  const renderStandard = () => {
    return (
      <>
        <div className="sidebar-item-sample-img">
          {SamplesDecorator.sampleSvgFile(sample)}
        </div>
        <div className="sidebar-item-sample-info">
          {SamplesDecorator.infoForButtonStandard(sample)}
        </div>
      </>
    )
  }

  const renderSampleButton = () => {
    switch (layout) {
      case "SOLVENT":
        return renderSolvent()
      default:
        return renderStandard()
    }
  }

  return (
    <div className="sidebar-item-sample" id={"add-button-sample-" + sample.id} >
      <Button color="outline-primary" size="sm" className="sidebar-item-sample">
        {renderSampleButton()}
      </Button>
      < UncontrolledTooltip placement="left" target={"add-button-sample-" + sample.id} >
        {SamplesDecorator.tooltip(sample)}
      </UncontrolledTooltip >
    </div>
  )
}

export default SamplesSelectBarSample
