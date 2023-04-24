const MultiInputFormGroup = ({label, children, type = 'preparation'}) => {
  return (
    <div className={'multi-input-form-group multi-input-form-group--' + type}>
      <h6 className='mb-2'>{ label }</h6>
      {children}
    </div>
  )
}

export default MultiInputFormGroup
