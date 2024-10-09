const MultiInputFormGroup = ({
  label,
  children,
  typeColor = "preparation",
}) => {
  return (
    <div
      className={"multi-input-form-group multi-input-form-group--" + typeColor}
    >
      <h6 className="mb-2">{label}</h6>
      {children}
    </div>
  );
};

export default MultiInputFormGroup;
