import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

import IconButton from "./IconButton";

const Info = () => null;
const TypePanel = () => null;
const Form = () => null;
const Details = () => null;
const ExtraButtons = () => null;

const ProcedureCard = ({
  title,
  type,
  mode,
  children,
  onEdit,
  onDelete,
  onCancel,
  customClass = "",
  headerTitleTag = "h4",
  showEditBtn = true,
  showMoveBtn = true,
  showDeleteBtn = true,
  showCancelBtn = true,
  displayMode = "info",
  dragRef,
}) => {
  const childNodes = React.Children.toArray(children);
  const info = childNodes.find((el) => el.type === Info);
  const typePanel = childNodes.find((el) => el.type === TypePanel);
  const form = childNodes.find((el) => el.type === Form);
  const details = childNodes.find((el) => el.type === Details);
  const extraButtons = childNodes.find((el) => el.type === ExtraButtons);
  const HeaderTitleTag = headerTitleTag;
  return (
    <Card
      className={"procedure-card procedure-card--" + type + " " + customClass}
    >
      <CardHeader className="d-flex justify-content-between align-items-center">
        <HeaderTitleTag className="procedure-card__header-label mb-0">
          {title}
        </HeaderTitleTag>
        <div className="d-flex">
          {extraButtons && <div>{extraButtons.props.children}</div>}
          {showEditBtn && <IconButton onClick={onEdit} icon="pen" />}
          {showMoveBtn && <IconButton icon="arrows-alt" dragRef={dragRef} />}
          {showDeleteBtn && <IconButton onClick={onDelete} icon="trash" />}
          {showCancelBtn && <IconButton onClick={onCancel} icon="times" />}
        </div>
      </CardHeader>
      <CardBody
        className={"procedure-card__body procedure-card__body--" + mode}
      >
        {displayMode === "info" && info && (
          <div className="procedure-card__info">{info.props.children}</div>
        )}
        {displayMode === "type-panel" && typePanel && (
          <div className="procedure-card__type-panel">
            {typePanel.props.children}
          </div>
        )}
        {displayMode === "form" && form && (
          <div className="procedure-card__form">{form.props.children}</div>
        )}
        {details && (
          <div className="procedure-card__details">
            {details.props.children}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

ProcedureCard.Info = Info;
ProcedureCard.TypePanel = TypePanel;
ProcedureCard.Form = Form;
ProcedureCard.Details = Details;
ProcedureCard.ExtraButtons = ExtraButtons;

export default ProcedureCard;
