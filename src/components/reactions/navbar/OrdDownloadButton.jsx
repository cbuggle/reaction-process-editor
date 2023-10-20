import React from 'react';
import { UncontrolledTooltip } from 'reactstrap';

import { useReactionsFetcher } from '../../../fetchers/ReactionsFetcher';
import IconButton from "../../utilities/IconButton";

const OrdDownloadButton = ({ reactionProcessId }) => {

  const api = useReactionsFetcher();

  const downloadOrd = () => {
    api.downloadOrd(reactionProcessId).then((response) => {
      const filename = response.headers.get('Content-Disposition').split("filename*=UTF-8''")[1];
      response.blob()
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        });
    }).catch(console.log("CATCH DOWNLOAD ORD ERROR"))
  }

  return (
    <div>
      <IconButton
        id='ord-download-button'
        icon='download'
        size='lg'
        className='icon-button--positive'
        onClick={downloadOrd}
        target="_blank"
      />
      <UncontrolledTooltip target={"ord-download-button"} >
        Download the reaction in ORD-KIT format (JSON)
      </UncontrolledTooltip >
    </div>
  )
};

export default OrdDownloadButton;
