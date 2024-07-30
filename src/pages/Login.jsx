//icons
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons for visibility toggle
//rrd
import { Form, Link, useActionData } from "react-router-dom";
//components
import { FormInput } from "../components";
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Ensure you import your Firebase auth instance
import { toast } from "react-toastify"; // Ensure you have toast imported and configured
//hooks
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const [forgetPassword, setForgetPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();

  useEffect(() => {
    if (userData) {
      if (!forgetPassword) {
        if (validatePassword(userData.password)) {
          signInWithEmail(userData.email, userData.password);
        } else {
          setPasswordError(
            "Password must be at least 6 characters long and contain a number."
          );
        }
      } else {
        sendPasswordResetEmail(auth, userData.email.trim())
          .then(() => {
            toast.success("Password reset link sent");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      }
    }
  }, [userData, signInWithEmail, forgetPassword]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("Google sign-in successful");
      // Dispatch login action or navigate to the desired page after login
    } catch (error) {
      toast.error(error.message);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[0-9]).{6,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <Form method="post" className="w-96 p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <FormInput type="email" name="email" labelText="Email:" />
        {!forgetPassword && (
          <div className="relative">
            <FormInput
              type={showPassword ? "text" : "password"}
              name="password"
              labelText="Password:"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-8 top-[52px] "
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="w-5 h-5" />
              ) : (
                <AiOutlineEye className="w-5 h-5" />
              )}
            </button>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>
        )}
        <div className="mt-6">
          {!isPending && (
            <button
              className="btn btn-active font-bold py-2 px-4 w-80 rounded mt-8"
              type="submit"
            >
              {forgetPassword ? "Send Reset Link" : "Login"}
            </button>
          )}
          {isPending && (
            <button disabled className="btn btn-secondary btn-block">
              Loading...
            </button>
          )}
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-block mt-2 px-4 py-3 text-center font-bold"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between w-80">
          <span className="border-b w-1/5 md:w-1/4"></span>
          <Link to="/register" className="text-xs text-gray-500 uppercase">
            or register   
          </Link>
          <span className="border-b w-1/5 md:w-1/4"></span>
        </div>
        <div className="text-center mt-5">
          <Link
            onClick={() => setForgetPassword(!forgetPassword)}
            type="btn"
            className="link link-primary"
          >
            {forgetPassword ? "Back to Login" : "Forgot password?"}
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
