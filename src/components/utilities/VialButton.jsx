import React from 'react'
import { Button } from "reactstrap";
import { useDrag } from 'react-dnd'

import { DndItemTypes } from '../../constants/dndItemTypes';
import VialSelectDecorator from '../../decorators/VialSelectDecorator'

const VialButton = (
  {
    vial,
    onClick
  }) => {

  const colorStyle = vial?.id ? VialSelectDecorator.colorFor(vial.groupId) : "transparent"

  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: DndItemTypes.VIALBUTTON,
    item: {
      vial: vial,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      canDrag: monitor.canDrag()
    }),
    canDrag: () => vial?.id,
  }), [vial])

  return (
    <div ref={dragRef} style={{ display: "inline" }}>
      <div ref={previewRef} style={{ display: "inline-block ", opaque: 0 }}>
        <Button className={'circle-button m-1 inline-flow'}
          style={{ backgroundColor: colorStyle }}
          disabled={!vial?.id}
          onClick={onClick}
        >
          {vial?.id}
        </Button >
      </div>
    </div >
  )
}

export default VialButton
