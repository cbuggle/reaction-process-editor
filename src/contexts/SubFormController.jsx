import { createContext, useState } from "react";

export const SubFormToggle = () => {
  const nonBlockingSubForms = ['Timing']

  const [openSubFormLabel, setOpenSubFormLabel] = useState(undefined)

  const toggleSubform = (name) => nonBlockingSubForms.includes(name) || setOpenSubFormLabel(name)

  const anySubFormOpen = () => openSubFormLabel !== undefined

  const isBlockedByOther = (name) => anySubFormOpen() && !nonBlockingSubForms.includes(name)

  const isCurrentOpen = (name) => !!name && openSubFormLabel === name

  return {
    openSubFormLabel,
    toggleSubform,
    anySubFormOpen,
    isCurrentOpen,
    isBlockedByOther
  }

}

export const SubFormController = createContext();
