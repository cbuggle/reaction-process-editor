import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

import { useReactionsFetcher } from '../../fetchers/ReactionsFetcher';
import IconButton from "../utilities/IconButton";

const OrdDownloadButton = ({ reactionId }) => {

  const api = useReactionsFetcher();

  return (
    <div>
      <IconButton
        id='ord-download-button'
        icon='download'
        size='lg'
        className='icon-button--positive'
        href={api.ordLinkTarget(reactionId)}
        target="_blank"
      />
      <UncontrolledTooltip target={"ord-download-button"} >
        Download the reaction in ORD-KIT format (json).
      </UncontrolledTooltip >
    </div>
  )
};

export default OrdDownloadButton;
