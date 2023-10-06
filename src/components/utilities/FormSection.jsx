import React from 'react';
import { FormGroup } from "reactstrap";
const FormSection = (
  {
    children,
    name,
    openSubFormLabel,
    type = 'preparation'
  }) => {

  const classNames = () => {
    let classNames = 'form-section form-section--' + type
    if (!!name && openSubFormLabel === name) {
      classNames += ' form-section--active'
    } else if (openSubFormLabel !== undefined) {
      classNames += ' form-section--disabled'
    }
    return classNames
  }


  return (
    <FormGroup className={classNames()}>
      {children}
    </FormGroup>
  )
}

export default FormSection
