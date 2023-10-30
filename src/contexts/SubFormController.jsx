import { createContext, useState } from "react";

export const SubFormToggle = () => {
  const nonBlockingSubForms = ['Timing']
  const nonBlockableSubForms = nonBlockingSubForms

  const [openSubFormLabel, setOpenSubFormLabel] = useState([])

  const toggleSubform = (toggled) => openSubFormLabel.includes(toggled) ?
    setOpenSubFormLabel(openSubFormLabel.filter(label => toggled !== label))
    :
    setOpenSubFormLabel(openSubFormLabel.concat(toggled))


  const anySubFormOpen = () => openSubFormLabel.length > 0

  const anyBlockingSubformOpen = () => openSubFormLabel.find(label => !nonBlockingSubForms.includes(label))

  const isBlockedByOther = (label) => !nonBlockableSubForms.includes(label) && anyBlockingSubformOpen()

  const isCurrentOpen = (label) => openSubFormLabel.includes(label)

  return {
    openSubFormLabel,
    toggleSubform,
    anySubFormOpen,
    anyBlockingSubformOpen,
    isCurrentOpen,
    isBlockedByOther
  }
}

export const SubFormController = createContext();
