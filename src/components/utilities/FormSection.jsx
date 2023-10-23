import React from 'react';
import { FormGroup } from "reactstrap";
const FormSection = (
  {
    children,
    name,
    openSubFormLabel,
    type = 'preparation'
  }) => {

  const isCurrentOpenSubForm = !!name && openSubFormLabel === name
  const isOtherSubFormOpen = openSubFormLabel !== undefined

  const classNames = () => {
    let classNames = 'form-section form-section--' + type
    if (isCurrentOpenSubForm) {
      classNames += ' form-section--active'
    } else if (isOtherSubFormOpen) {
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
