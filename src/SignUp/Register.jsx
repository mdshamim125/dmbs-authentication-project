import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendEmailVerification } from "firebase/auth";
import auth from "../firebase.config";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { Typewriter } from "react-simple-typewriter";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, name, photo, password } = data;
    setRegisterError("");

    // Password validation
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should have at least one uppercase character."
      );
      return;
    } else if (!/[!@#$%^&*]/.test(password)) {
      setRegisterError(
        "Your password should have at least one special character."
      );
      return;
    } else if (!/\d/.test(password)) {
      setRegisterError(
        "Your password should have at least one numeric character."
      );
      return;
    }

    // Image upload to imgBB
    const formData = new FormData();
    formData.append("image", photo[0]);

    setLoading(true);

    try {
      // Correct API Key usage
      const imgBBKey = import.meta.env.VITE_IMGBB_API_KEY;

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgBBKey}`,
        formData
      );

      if (
        response.data &&
        response.data.data &&
        response.data.data.display_url
      ) {
        const image = response.data.data.display_url;

        // Creating user and updating profile with imgBB URL
        const result = await createUser(email, password);
        const user = result.user;

        await updateUserProfile(name, image);
        await sendEmailVerification(user);

        toast.success("Verification email sent. Please check your inbox.");
        navigate("/");
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      const errorMessage = error.message;

      if (errorMessage.includes("email-already-in-use")) {
        setRegisterError(
          "The email address is already in use by another account."
        );
      } else {
        setRegisterError(errorMessage);
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container flex flex-col justify-center items-center px-6 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md shadow-lg p-6 bg-white rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Sign Up
          </h2>

          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            <Typewriter
              words={["  Create a new account!"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>

          {/* Username */}
          <div className="relative flex items-center mt-8">
            <input
              type="text"
              className={`block w-full py-3 text-gray-700 border rounded-lg px-4 transition duration-300 focus:border-blue-500 ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Username"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <span className="text-red-400">This field is required</span>
          )}

          {/* Image Upload */}
          <label
            htmlFor="image"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-gray-50 border-2 border-dashed rounded-lg cursor-pointer"
          >
            <input
              {...register("photo", {
                required: {
                  value: true,
                  message: "This field is required.",
                },
              })}
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            />
          </label>
          {errors.photo && (
            <span className="text-red-400">This field is required</span>
          )}

          {/* Email */}
          <div className="relative flex items-center mt-4">
            <input
              type="email"
              className={`block w-full py-3 text-gray-700 border rounded-lg px-4 transition duration-300 focus:border-blue-500 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Email address"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && (
            <span className="text-red-400">This field is required</span>
          )}

          {/* Password */}
          <div className="relative flex items-center mt-4">
            <input
              type="password"
              className={`block w-full py-3 text-gray-700 border rounded-lg px-4 transition duration-300 focus:border-blue-500 ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          {errors.password && (
            <span className="text-red-400">This field is required</span>
          )}
          {registerError && <p className="p-4 text-red-600">{registerError}</p>}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full px-6 py-3 text-sm font-medium text-white transition duration-300 rounded-lg ${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-400"
              }`}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-blue-500 hover:underline"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
