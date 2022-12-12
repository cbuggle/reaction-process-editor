import React from 'react'
import { Label, Nav, Navbar, NavbarBrand } from 'reactstrap';

import ProvenanceButton from './ProvenanceButton';
import OrdDownloadButton from './OrdDownloadButton';

import prettyMilliseconds from 'pretty-ms';

const ReactionNavbar = ({ fetchReactionProcess, reactionProcess }) => {
  return (
    <Navbar fixed="top" id="navbar-reaction" color='info'>
      <NavbarBrand>
        Reaction: {reactionProcess.short_label} ({prettyMilliseconds(reactionProcess.duration * 1000)})
      </NavbarBrand>
      <Nav>
        {reactionProcess.id}
      </Nav>
      <Nav>
        <ProvenanceButton provenance={reactionProcess.provenance} onChange={fetchReactionProcess} />
        <OrdDownloadButton reactionId={reactionProcess.reaction_id} />
      </Nav>
    </Navbar>
  )
}

export default ReactionNavbar
