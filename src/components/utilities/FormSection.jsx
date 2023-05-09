import React from 'react';
const FormSection = ( {children, type = 'preparation'} ) => {
  return (
    <div className={'form-section form-section--' + type}>
      {children}
    </div>
  )
}

export default FormSection
