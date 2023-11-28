import { createContext, useState } from "react";

export const StepLockToggle = ({
        hasLockOn
    }) => {
  
    const [locked, setLocked] = useState(hasLockOn)

    const isLocked = () => locked
  
    return {
      locked,
      isLocked
    }
  }
  
  export const StepLock = createContext();
