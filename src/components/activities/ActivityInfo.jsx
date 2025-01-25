import React, { useContext } from "react";

import AddInfo from "./forms/actions/info/AddInfo";
import AnalysisInfo from "./forms/actions/info/AnalysisInfo";
import ConditionInfo from "./forms/actions/info/ConditionInfo";
import PurificationInfo from "./forms/actions/info/PurificationInfo";
import RemoveInfo from "./forms/actions/info/RemoveInfo";
import SaveInfo from "./forms/actions/info/SaveInfo";
import TransferInfo from "./forms/actions/info/TransferInfo";
import WaitInfo from "./forms/actions/info/WaitInfo";

import ActivityInfoDecorator from "../../decorators/ActivityInfoDecorator";

import { SelectOptions } from "../../contexts/SelectOptions";

const ActivityInfo = (props) => {
  const selectOptions = useContext(SelectOptions);

  const activity = props.activity
  const workup = activity.workup;

  const renderActivityInfo = () => {

    let ActivityComponent = {
      'ADD': AddInfo,
      'ANALYSIS': AnalysisInfo,
      'CONDITION': ConditionInfo,
      'PURIFICATION': PurificationInfo,
      'REMOVE': RemoveInfo,
      'SAVE': SaveInfo,
      'TRANSFER': TransferInfo,
      'WAIT': WaitInfo,
    }[activity.activity_name]

    if (ActivityComponent) {
      return (<ActivityComponent {...props} />
      )
    } else {
      return "Error in ActivityInfo. Unknown activity type: " + activity.activity_name
    }
  };

  const renderEquipmentLines = () => {
    return ActivityInfoDecorator.infoLineEquipment(workup.EQUIPMENT, selectOptions.equipment)
  }

  const renderWorkupDescription = () => {
    return workup.description ?
      <p className="activity-info__description">
        {workup.description}
      </p>
      : <></>
  }

  return <>
    <div className="d-flex">
      <div className="activity-info__text-block">
        {renderActivityInfo()}
        {renderEquipmentLines()}
        {renderWorkupDescription()}
      </div>
    </div>
  </>
};

export default ActivityInfo;
