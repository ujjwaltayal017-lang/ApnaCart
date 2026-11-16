import { useState } from "react";
import googleIcon from "../assets/images-google-logo.png"; // Google icon ka path
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/Firebase.js"
import { UserDataContext } from "../context/UserContext.jsx";

export default function Login() {
  // Har field ke liye ek state (yahan user ka likha hua text save hota hai)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password dikhana hai ya chhupana hai (eye button ke liye)
  const [showPassword, setShowPassword] = useState(false);

  const { serverUrl } = useContext(AuthContext);
  const { getCurrentUser } = useContext(UserDataContext)

  const navigate = useNavigate()

  // Register button dabane par yeh function chalta hai
  const handleLogin = async (e) => {
    e.preventDefault(); // page reload hone se rokta hai

    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });
      getCurrentUser()
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  const googleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const user = response.user;
      const name = user.displayName;
      const email = user.email;
      const idToken = await user.getIdToken(); // Secure token instead of uid as password

      const result = await axios.post(
        `${serverUrl}/api/auth/google-login`,
        { name, email, idToken },
        { withCredentials: true }
      );

      await getCurrentUser();
      navigate("/");
      console.log(result.data);
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        // User closed the popup window before finishing sign-in
        console.info("Sign-in popup closed by user.");
      } else if (err.code === "auth/cancelled-popup-request") {
        // Triggered if the user clicks the button multiple times rapidly
        console.info("Multiple popup requests detected; earlier request cancelled.");
      } else {
        console.error("Authentication error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo aur text ek line mein */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <svg viewBox="0 0 120 120" className="w-12 h-12">
            <rect width="120" height="120" rx="28" fill="#F26B1D" />
            <path
              d="M22 30 H34 L44 74 H94 L102 44 H38"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M38 44 H102 L94 74 H44 Z" fill="#FFFFFF" />
            <path
              d="M70 69 C60 62 60 52 66 52 C68 52 70 54 70 55 C70 54 72 52 74 52 C80 52 80 62 70 69 Z"
              fill="#F26B1D"
            />
            <circle cx="52" cy="92" r="7" fill="#FFFFFF" />
            <circle cx="86" cy="92" r="7" fill="#FFFFFF" />
          </svg>

          <h1 className="text-3xl font-bold text-slate-800">
            Apna<span className="text-orange-500">Cart</span>
          </h1>
          {/* <p className="text-sm text-slate-500">Ghar baithe, sab kuch haath mein</p> */}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-orange-500 mb-4">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-700">Email</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Password (eye button ke saath) */}
            <div>
              <label className="block text-sm text-slate-700">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:border-orange-500"
                />

                {/* Eye button: dabane par password dikhta ya chhup jata hai */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 px-3 text-slate-500 hover:text-orange-500"
                >
                  {showPassword ? (
                    // Eye band (slash ke saath): password abhi dikh raha hai
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    // Eye khula: password abhi chhupa hua hai
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Register button */}
            <button
              type="submit"
              // onClick={() => navigate("/")} // Login hone ke baad home page par le jaayega
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
            >
              Login
            </button>
          </form>

          {/* ------ or ------ */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-sm text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Google button: icon + text ek line mein */}
          <button
            type="button"
            onClick={googleSignIn}
            className="w-full flex items-center justify-center gap-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-lg"
          >
            {/* Google ka official icon yahan aayega (public/google-icon.svg) */}
            <img src={googleIcon} alt="G" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <a href="/register" className="font-semibold text-orange-500 hover:text-orange-600">
              SignUp
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}