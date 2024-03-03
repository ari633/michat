import { createContext, useState } from "react";
export const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error");

  const values = {
    alertMessage,
    setAlertMessage,
    alertType,
    setAlertType
  }

  return (
    <AlertContext.Provider value={values}>
      {children}
    </AlertContext.Provider>
  )

}

export default AlertProvider;