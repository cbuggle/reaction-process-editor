import React from 'react';
import {Card, CardBody, CardHeader} from "reactstrap";
import IconButton from "./IconButton";

const Info = () => null
const TypePanel = () => null
const Form = () => null

const Dummy  = (
  {
    title,
    type,
    mode,
    children,
    onEdit,
    onDelete,
    onCancel,
    customClass = '',
    headerTitleTag = 'h5',
    showEditBtn = true,
    showMoveXBtn = true,
    showMoveYBtn = true,
    showDeleteBtn = true,
    showCancelBtn = true,
    displayMode = 'info',
    dragRef
  }) => {

  const childNodes = React.Children.toArray(children);
  const info = childNodes.find(el => el.type === Info)
  const typePanel = childNodes.find(el => el.type === TypePanel)
  const form = childNodes.find(el => el.type === Form)
  const HeaderTitleTag = headerTitleTag
  return (
    <Card className={'procedure-card procedure-card--' + type + ' ' + customClass}>
      <CardHeader className={'d-flex justify-content-between align-items-center bg-' + type}>
        <HeaderTitleTag className='rounded-pill bg-white mb-0 px-3'>{title}</HeaderTitleTag>
        <div>
          {showEditBtn &&
            <IconButton onClick={onEdit} icon='pen' />
          }
          {showMoveXBtn &&
            <IconButton icon='arrows-alt-h' dragRef={dragRef} />
          }
          {showMoveYBtn &&
            <IconButton icon='arrows-alt-v' dragRef={dragRef} />
          }
          {showDeleteBtn &&
            <IconButton onClick={onDelete} icon='trash' />
          }
          {showCancelBtn &&
            <IconButton onClick={onCancel} icon='times' />
          }
        </div>
      </CardHeader>
      <CardBody className={'procedure-card__body procedure-card__body--' + mode}>
        {displayMode === 'info' &&
          <div className='procedure-card--info'>
            {info ? info.props.children : null}
          </div>
        }
        {displayMode === 'type-panel' &&
          <div className='procedure-card--type-panel'>
            {typePanel ? typePanel.props.children : null}
          </div>
        }
        {displayMode === 'form' &&
          <div className='procedure-card--form'>
            {form ? form.props.children : null}
          </div>
        }
      </CardBody>
    </Card>
  )
}

Dummy.Info = Info
Dummy.TypePanel = TypePanel
Dummy.Form = Form

export default Dummy
