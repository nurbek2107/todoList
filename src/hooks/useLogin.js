import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { login } from "../app/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();
  const signInWithEmail = async (email, password) => {
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      dispatch(login(user));
      toast.success("Welcome back");
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setIsPending(false);
    }
  };

  return { signInWithEmail, isPending };
};

export { useLogin };