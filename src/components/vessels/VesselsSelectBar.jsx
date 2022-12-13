
import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card, Navbar, NavbarText } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

import VesselSelectBarItem from './VesselSelectBarItem';
import VesselCreateButton from './VesselCreateButton';

import { useVesselsFetcher } from '../../fetchers/VesselsFetcher';


const VesselsSelectBar = ({ reactionProcess, onChangeVessels}) => {

  const vesselApi = useVesselsFetcher();

  const onCreateVessel = (vessel, saveAsTemplate) => {
    vesselApi.create(vessel, reactionProcess.id, saveAsTemplate).then(() => {
      onChangeVessels()
    })
  }
  const onUpdateVessel = (vessel) => {
    vesselApi.update(vessel).then(() => {
      onChangeVessels()
    })
  }

  const onDeleteVessel = (vessel) => {
    vesselApi.destroy(vessel.id).then(() => {
      onChangeVessels()
    })
  }

  const onAssignVessel = (vesselId) => {
    // ReactionProcessFetcher.assignVessel(reactionProcess.id, vesselId).then(() => {
    //   fetchReactionProcess()
    // })
  }

  const onUnassignVessel = (vesselId) => {
    // ReactionProcessFetcher.unassignVessel(reactionProcess.id, vesselId).then(() => {
    //   fetchReactionProcess()
    // })
  }

  const [showVessels, setShowVessels] = useState(true);
  const toggleVessels = () => setShowVessels(!showVessels);

  const renderVessels = () => {
    return (
      <>
        {reactionProcess.vessels.map((vessel, idx) => (
          <VesselSelectBarItem key={idx} vessel={vessel} reactionProcessId={reactionProcess.id} vesselOptions={reactionProcess.select_options.vessels} onUpdateVessel={onUpdateVessel} onUnassignVessel={onUnassignVessel} />
        ))}
      </>
    )
  }

  const renderToggleIcon = () => {
    return showVessels ? <FontAwesomeIcon icon={faChevronCircleDown} /> :
      <FontAwesomeIcon icon={faChevronCircleRight} />
  }

  return (
    <>
      <Navbar className="navbar-sidebars">
        <Button color="link" onClick={toggleVessels}>{renderToggleIcon()} </Button>
        <NavbarText className="mr-auto">
          Vessels
        </NavbarText>
        <VesselCreateButton onCreate={onCreateVessel} vesselOptions={reactionProcess.select_options.vessels} vesselIndex={reactionProcess.user_vessels} onDeleteVessel={onDeleteVessel} onAssignVessel={onAssignVessel} />
      </Navbar>
      <Collapse isOpen={showVessels}>
        <Card>
          <CardBody>
            {renderVessels()}
          </CardBody>
        </Card>
      </Collapse>
    </>
  )
}

export default VesselsSelectBar
