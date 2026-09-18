import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { updateProfile } from "firebase/auth";

import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { log } from "firebase/firestore/lite/pipelines";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);

    if (formData.name.trim() === "") {
      alert("Name enter karo.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+[^\s@]+$/.test(formData.email)) {
      alert("Valid email enter karo.");
      return;
    }

    if (formData.password.length < 6) {
      alert("please required atleast 8 alp");
      return;
    }

    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      console.log("yeh repsone hai", response);

      if (response.user) {
        await updateProfile(response.user, {
          displayName: formData.name,
        });
        toast.success(`Welcome ${formData.name}! Signup successful 🎉`);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.code);

      if (
        error.message == "Firebase: Error (auth/email-already-in-use)." ||
        error.code == "auth/email-already-in-use"
      ) {
        toast.error("Email already exists");
      }
    }
  };

  const signUpWithGoogleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      let response = await signInWithPopup(auth, provider);

      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="user@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <span className="border-b w-1/5"></span>
          <span className="text-xs text-gray-500 uppercase font-semibold">
            Or
          </span>
          <span className="border-b w-1/5"></span>
        </div>

        <button
          onClick={signUpWithGoogleHandler}
          type="button"
          className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 text-sm font-medium">
            Sign in with Google
          </span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
