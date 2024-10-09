import { Button, ButtonGroup } from "reactstrap";
import React from "react";
import SingleLineFormGroup from "./SingleLineFormGroup";

const ButtonGroupToggle = ({
  value,
  onChange,
  options,
  activityType = "action",
  label,
}) => {
  const hasLabel = !!label;
  const classNames = "d-flex" + (hasLabel ? "" : " my-1");
  const size = hasLabel ? "sm" : "";

  const renderButtonGroup = () => {
    return (
      <ButtonGroup size={size} className={classNames}>
        {options.map((option, index) => (
          <Button
            key={option.label + index}
            outline
            color={activityType}
            onClick={() => {
              onChange(option.value);
            }}
            active={value === option.value}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    );
  };

  return (
    <>
      {hasLabel ? (
        <SingleLineFormGroup label={label}>
          {renderButtonGroup()}
        </SingleLineFormGroup>
      ) : (
        renderButtonGroup()
      )}
    </>
  );
};

export default ButtonGroupToggle;
