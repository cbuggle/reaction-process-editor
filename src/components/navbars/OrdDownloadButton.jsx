import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';

const OrdDownloadButton = ({ reactionId }) => {

  const api = useReactionsFetcher();

  return (
    <div>
      <a id="ord-download-button" href={api.ordLinkTarget(reactionId)} target="_blank" size="sm" className='btn btn-info'>
        <FontAwesomeIcon size="lg" icon='download' />
      </a>
      <UncontrolledTooltip target={"ord-download-button"} >
        Download the reaction in ORD-KIT format (json).
      </UncontrolledTooltip >
    </div>
  )
};

export default OrdDownloadButton;
