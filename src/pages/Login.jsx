import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../firebase/config";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. useNavigate import kiya

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // 2. Hook initialize kiya

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid Email");
      return;
    }

    if (formData.password.trim() === "") {
      toast.error("Invalid Password");
      return;
    }

    try {
      let response = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (response.user) {
        toast.success(
          `Welcome Back, ${response.user.displayName || "User"}! 🎉`
        );
        
        // 3. Login successful hone ke baad Dashboard par redirect
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000); // 1 sec delay taaki Toast notification sahi se dikh jaye
      }
    } catch (error) {
      console.log("ERROR:", error.code);

      // Login specific errors handle kiye
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        toast.error("Invalid Email or Password");
      } else {
        toast.error(error.message);
      }
    }
  };

  const signInWithGoogleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      let response = await signInWithPopup(auth, provider);

      if (response.user) {
        toast.success("Login successful with Google!");
        navigate("/dashboard"); // Google login par bhi dashboard redirect
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="user@example.com"
              autoComplete="email"
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
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            Login
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
          type="button"
          className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2.5 rounded-lg hover:bg-gray-50 transition"
          onClick={signInWithGoogleHandler}
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
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}