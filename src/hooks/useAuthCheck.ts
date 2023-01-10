import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "firebaseConfig";
import { useEffect, useState } from "react";

export default function useAuthCheck() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  return { user, setUser, checkingAuth };
}
