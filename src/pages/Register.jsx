import { useEffect, useState } from "react";
import { Form, useActionData, Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useRegister } from "../hooks/useRegister";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Spline from "@splinetool/react-spline";

// Action function to handle form data
export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let email = formData.get("email");
  let password = formData.get("password");
  let photoUrl = formData.get("photoUrl");

  return { displayName, email, password, photoUrl };
};

function Register() {
  const infoObj = useActionData();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const { registerWithEmail, isPending } = useRegister();

  useEffect(() => {
    const registerUser = async () => {
      if (infoObj) {
        if (infoObj.password.length < 6) {
          setError("Password should be at least 6 characters.");
          return;
        }

        // Simple email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(infoObj.email)) {
          setError("Invalid email format.");
          return;
        }

        const result = await registerWithEmail(
          infoObj.email,
          infoObj.password,
          infoObj.displayName,
          infoObj.photoUrl
        );

        if (result?.error) {
          if (result.error.includes("auth/email-already-in-use")) {
            setError(
              "This email is already registered. Please use a different email."
            );
          } else {
            setError(result.error);
          }
        } else {
          setError(null);
          // Redirect or perform other actions upon successful registration
        }
      }
    };
    registerUser();
  }, [infoObj, registerWithEmail]);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      toast.success("Google sign-in successful");
      // Dispatch login action or navigate to the desired page after login
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex rounded-lg gap-6 justify-center mt-10 overflow-hidden ">
        <div className="hidden lg:block lg:w-1/2 bg-cover">
          <main className="z-0  h-[600px]">
            <Spline
              scene="https://prod.spline.design/HtNn-u7PNdXiAZNv/scene.splinecode"
              options={{ drag: false }}
            />
          </main>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <Form method="post">
            {error && (
              <div className="text-red-500  mb-4">{error}</div>
            )}
            <div className="mt-4">
              <FormInput
                type="text"
                labelText="Display Name:"
                name="displayName"
              />
              <FormInput type="url" labelText="Photo URL:" name="photoUrl" />
            </div>
            <div className="mt-4">
              <FormInput type="email" labelText="Email:" name="email" />
            </div>
            <div className="relative mt-4">
              <FormInput
                type={showPassword ? "text" : "password"}
                name="password"
                labelText="Password:"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-72 top-[50px]"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="w-5 h-5" />
                ) : (
                  <AiOutlineEye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="mt-6">
              {!isPending && (
                <button className="btn btn-active font-bold py-2 px-4 w-80 rounded mt-8">
                  Register
                </button>
              )}
            </div>
            <div className="mt-6">
              {isPending && (
                <button
                  disabled
                  className="btn btn-active font-bold py-2 px-4 w-80 rounded mt-8"
                >
                  Loading...
                </button>
              )}
            </div>
          </Form>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center mt-4 rounded-lg shadow-md btn btn-active w-80"
          >
            <svg className="h-6 w-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
            <span className="px-4 py-3 text-center font-bold">
              Sign up with Google
            </span>
          </button>
          <div className="mt-4 flex items-center justify-between w-80">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to="/login" className="text-xs text-gray-500 uppercase">
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
