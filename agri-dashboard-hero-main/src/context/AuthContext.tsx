import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!user; // ✅ Derive authentication state

  // ✅ Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      console.log("Logging in with:", { email, password });
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      console.log("Login successful:", res.data);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard"); // ✅ Redirect after login
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup function
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      console.log("Signing up with:", { name, email, password });
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      console.log("Signup successful:", res.data);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/dashboard"); // ✅ Redirect after signup
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login"); // ✅ Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  // ✅ Load user from localStorage on page reload
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
