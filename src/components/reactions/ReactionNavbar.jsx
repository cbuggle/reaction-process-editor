import React from 'react'
import { Nav, Navbar, NavbarBrand } from 'reactstrap';

import ProvenanceFormButton from './ProvenanceFormButton';
import OrdDownloadButton from './OrdDownloadButton';

import prettyMilliseconds from 'pretty-ms';

const ReactionNavbar = ({ fetchReactionProcess, reactionProcess }) => {
  return (
    <Navbar className="reaction-navbar" color='info' dark>
      <NavbarBrand>
        Reaction: {reactionProcess.short_label} ({prettyMilliseconds(reactionProcess.duration * 1000)})
      </NavbarBrand>
      <Nav>
        {reactionProcess.id}
      </Nav>
      <Nav>
        <ProvenanceFormButton provenance={reactionProcess.provenance} onChange={fetchReactionProcess} />
        <OrdDownloadButton reactionId={reactionProcess.reaction_id} />
      </Nav>
    </Navbar>
  )
}

export default ReactionNavbar
