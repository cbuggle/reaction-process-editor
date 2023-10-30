import { createContext, useState } from "react";

export const SubFormToggle = () => {
  const nonBlockingSubForms = ['Timing']
  const nonBlockableSubForms = nonBlockingSubForms

  const [openSubFormLabel, setOpenSubFormLabel] = useState([])

  const toggleSubForm = (toggled) => openSubFormLabel.includes(toggled) ? closeSubForm(toggled) : openSubForm(toggled)

  const openSubForm = (opening) => setOpenSubFormLabel([...new Set([...openSubFormLabel, opening])]);

  const closeSubForm = (closing) => setOpenSubFormLabel(openSubFormLabel.filter(label => closing !== label))

  const closeSubFormArray = (closing) => setOpenSubFormLabel(openSubFormLabel.filter(label => !closing.includes(label)))

  const anySubFormOpen = () => openSubFormLabel.length > 0

  const anyBlockingSubformOpen = () => openSubFormLabel.find(label => !nonBlockingSubForms.includes(label))

  const isBlockedByOther = (label) => !nonBlockableSubForms.includes(label) && anyBlockingSubformOpen()

  const isCurrentOpen = (label) => openSubFormLabel.includes(label)

  const closeAllSubForms = () => setOpenSubFormLabel([])

  return {
    openSubForm,
    closeSubForm,
    closeAllSubForms,
    closeSubFormArray,
    toggleSubForm,
    anySubFormOpen,
    anyBlockingSubformOpen,
    isCurrentOpen,
    isBlockedByOther
  }
}

export const SubFormController = createContext();
