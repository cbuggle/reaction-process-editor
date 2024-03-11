import React, { useContext, useState } from "react";
import Select from "react-select";

import OptionalFormSet from "../../../utilities/OptionalFormSet";

import ActivityInfoDecorator from "../../../../decorators/ActivityInfoDecorator";
import OptionsDecorator from "../../../../decorators/OptionsDecorator";

import { SelectOptions } from "../../../../contexts/SelectOptions";

const ApplyExtraEquipmentFormSet = ({
  activityType,
  actionName,
  workup,
  onWorkupChange,
}) => {
  const [equipment, setEquipment] = useState(workup.EQUIPMENT?.value);

  const selectOptions = useContext(SelectOptions);
  const equipmentOptions = selectOptions.activity_type_equipment[actionName];

  const handleSaveEquipment = () =>
    onWorkupChange({ name: "EQUIPMENT", value: { value: equipment } });

  const handleCancelEquipment = () => setEquipment(workup.equipment);

  return (
    <>
      {equipmentOptions?.length > 0 && (
        <OptionalFormSet
          subFormLabel="Equipment"
          valueSummary={ActivityInfoDecorator.infoLineEquipment(
            workup["EQUIPMENT"],
            equipmentOptions
          )}
          onSave={handleSaveEquipment}
          onCancel={handleCancelEquipment}
          typeColor={activityType}
        >
          <Select
            name="EQUIPMENT"
            className="react-select--overwrite"
            classNamePrefix="react-select"
            isMulti
            isClearable={false}
            options={equipmentOptions}
            value={OptionsDecorator.optionsForKeys(equipment, equipmentOptions)}
            onChange={(selectedOptions) =>
              setEquipment(selectedOptions.map((option) => option.value))
            }
          />
        </OptionalFormSet>
      )}
    </>
  );
};

export default ApplyExtraEquipmentFormSet;
