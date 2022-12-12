import React from 'react';

import ReactionNavbar from '../navbars/ReactionNavbar';

const ReactionProcess = ({ reactionProcess, fetchReactionProcess }) => {
  return (
    <>
      <ReactionNavbar reactionProcess={reactionProcess} fetchReactionProcess={fetchReactionProcess} />
    </>
  )
}

export default ReactionProcess
