import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../firebase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- GOOGLE LOGIN ---------------- */

  const googleLogin = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  /* ---------------- EMAIL LOGIN ---------------- */

  const login = async (email, password) => {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  /* ---------------- REGISTER ---------------- */

  const register = async (email, password) => {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  /* ---------------- FORGOT PASSWORD ---------------- */

  const forgotPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  /* ---------------- LOGOUT ---------------- */

  const logout = async () => {

  /* CLEAR OLD PORTFOLIO */

  localStorage.removeItem(
    "portfolioStocks"
  );

  localStorage.removeItem(
    "portfolioResult"
  );

  localStorage.removeItem(
    "totalAmount"
  );

  localStorage.removeItem(
    "pf_username"
  );

  await signOut(auth);
};

  /* ---------------- AUTH PERSISTENCE ---------------- */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
  value={{
    user,
    loading,
    login,
    register,
    googleLogin,
    forgotPassword,
    logout,
  }}
>
      {!loading && children}
    </AuthContext.Provider>
  );
}