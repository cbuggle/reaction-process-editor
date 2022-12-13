import { Collapse, Button, Input, InputGroup, Navbar, Label } from 'reactstrap'
import React, { useState } from 'react'

import SamplesSelectBarAdditive from './SamplesSelectBarAdditive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SamplesCollapsible = ({ name, samples }) => {

  const [filteredSampleOptions, setFilteredSampleOptions] = useState(samples)

  const [showSampleBar, setShowSampleBar] = useState(false)

  const setFilter = (value) => {
    const filtered = samples.filter(el => el.label.match(new RegExp(value, "i")))
    setFilteredSampleOptions(filtered)
  }

  const toggleShowSampleBar = () => {
    setShowSampleBar(!showSampleBar)
  }

  const renderToggleIcon = () => {
    return showSampleBar ? <FontAwesomeIcon icon={'chevron-circle-down'} /> :
      <FontAwesomeIcon icon={'chevron-circle-right'} />
  }

  return (
    <>
      <Navbar className="navbar-sidebars">
        {name} ({samples.length})
        <InputGroup>
          <Button size="sm" color="link" onClick={toggleShowSampleBar}>
            {renderToggleIcon()}
          </Button>
          <Input bsSize="sm" type="text" onChange={event => setFilter(event.target.value)} />
          <Label>
            <FontAwesomeIcon icon={'search'} ></FontAwesomeIcon>
            <br />
            {filteredSampleOptions.length}
          </Label>
        </InputGroup>
      </Navbar>
      < Collapse isOpen={showSampleBar} >
        {filteredSampleOptions.map((sample, idx) => (
          <SamplesSelectBarAdditive key={idx} sample={sample} />
        ))}
      </Collapse >
    </>
  )
}

export default SamplesCollapsible


