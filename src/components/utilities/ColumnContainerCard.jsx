import React from 'react';
import Dummy from "./Dummy";

const ColumnContainerCard = (props) => {
    return (
        <Dummy
          customClass={'column-container-card column-container-card--' + props.type}
          headerTitleTag={'h3'}
          showMoveYBtn={false}
          {...props}
        />
    )
}

export default ColumnContainerCard
