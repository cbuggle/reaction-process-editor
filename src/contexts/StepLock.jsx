import { createContext, useState } from "react";

export const StepLockToggle = ({
        hasLockOn
    }) => {
  
    const [locked, setLocked] = useState(hasLockOn)

    const toggleLock = () => {
        setLocked(!locked)
    }

    const isLocked = () => locked
  
    return {
      locked,
      toggleLock,
      isLocked
    }
  }
  
  export const StepLock = createContext();
