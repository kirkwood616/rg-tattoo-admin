import { User } from "firebase/auth";
import { createContext, Dispatch, SetStateAction } from "react";

interface ContextModel {
  user: User | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  toggleModalOpen: (setIsActive?: Dispatch<SetStateAction<boolean>>) => void;
  toggleLoading: () => void;
}

const defaultValue: ContextModel = {
  user: null,
  isLoading: false,
  setUser: () => {},
  setIsLoading: () => {},
  isModalOpen: false,
  toggleModalOpen: () => {},
  toggleLoading: () => {},
};

const AppContext = createContext(defaultValue);

export default AppContext;
