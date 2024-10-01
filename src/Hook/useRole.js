import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!loading && user?.email) {
        try {
          const { data } = await axios.get(
            `https://authentication-server-rust.vercel.app/user/${user?.email}`
          );
          setLoggedInUser(data);
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserRole();
  }, [loading, user?.email]);

  return { loggedInUser, isLoading };
};

export default useRole;
