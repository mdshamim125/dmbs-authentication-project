import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.config";
import { GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Typewriter } from "react-simple-typewriter";

const Login = () => {
  const { signIn, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();
  const [registerError, setRegisterError] = useState("");
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setRegisterError("");

    // SignIn with Email & password
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        if (user.emailVerified) {
          Swal.fire({
            title: "Congratulations!",
            text: "Logged In Successfully!",
            icon: "success",
          });
          navigate("/");
        } else {
          sendEmailVerification(user)
            .then(() => {
              toast.success(
                "Verification email sent. Please check your inbox."
              );
            })
            .catch((error) => {
              toast.error("Error sending verification email: " + error.message);
            });
        }
      })
      .catch((error) => {
        toast.error("Please enter correct email or passsword.");
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        Swal.fire({
          title: "Congratulations!",
          text: "You Successfully Logged in!",
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    resetPassword(email)
      .then(() => {
        toast.success("Check your email for a password reset link.");
      })
      .catch((error) => {
        toast.error("Please enter correct email or passsword.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
          Welcome Back!
        </h2>
        <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
          <Typewriter
            words={[" Sign in to your account"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring focus:ring-opacity-50 focus:outline-none"
              ref={emailRef}
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <a
                onClick={handleForgetPassword}
                className="text-xs text-blue-500 hover:underline cursor-pointer"
              >
                Forget Password?
              </a>
            </div>

            <input
              type="password"
              name="password"
              required
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg dark:bg-gray-800 dark:text-gray-300 focus:border-blue-500 focus:ring focus:ring-opacity-50 focus:outline-none"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none transition duration-200">
              Sign In
            </button>
          </div>
        </form>

        {registerError && <p className="mt-2 text-red-600">{registerError}</p>}

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
          <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
            or login with
          </span>
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
        </div>

        <div className="flex items-center mt-6 -mx-2">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:bg-blue-500 transition duration-200"
          >
            <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"></path>
            </svg>
            <span className="hidden mx-2 sm:inline">Sign in with Google</span>
          </button>
        </div>

        <p className="mt-8 text-xs text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-500 hover:underline"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

// import { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');
//     try {
//       const response = await axios.post('/login', { email, password });
//       setSuccess(response.data.message);
//       setEmail('');
//       setPassword('');
//     } catch (err) {
//       setError('Login failed. Please check your credentials and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//             required
//           />
//         </div>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
//           disabled={loading}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
