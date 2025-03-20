import React, { useContext } from 'react';

import { FormGroup } from "reactstrap";
import { SubFormController } from '../../contexts/SubFormController';

const FormSection = (
  {
    children,
    name,
    type = 'preparation'
  }) => {

  const subForm = useContext(SubFormController)

  const classNames = () => {
    let classNames = 'form-section form-section--' + type
    if (subForm.isCurrentOpen(name)) {
      classNames += ' form-section--active'
    } else if (subForm.isBlocked(name)) {
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
