import { User } from "firebase/auth";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { toggleBooleanState } from "../../utils/Toggle";
import AppContext from "./AppContext";

interface AppContextProps {
  children: ReactNode;
}

export default function AppContextProvider({ children }: AppContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function toggleModalOpen(setIsActive?: Dispatch<SetStateAction<boolean>>) {
    if (setIsActive) toggleBooleanState(setIsActive);
    toggleBooleanState(setIsModalOpen);
  }

  function toggleLoading() {
    toggleBooleanState(setIsLoading);
  }

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        setIsLoading,
        isModalOpen,
        toggleModalOpen,
        toggleLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
