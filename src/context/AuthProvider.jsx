import { useState, useCallback } from "react";
import * as AuthApi from "../api/AuthApi";
import { AuthContext } from "./AuthContext";

// Reads whoever was logged in out of localStorage. Used as the lazy
// initial state below, so it runs once, synchronously, on mount - no
// effect and no flash-of-logged-out-content while it "loads".
function readStoredUser() {
  const storedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!token || !storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);

  const login = async (username, password) => {
    const { data } = await AuthApi.login({ username, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const register = async (username, email, password) => {
    const { data } = await AuthApi.register({ username, email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // Used by the OAuth2 redirect page — the backend already gave us a token,
  // we just fetch the user profile and store everything.
  const handleOAuthToken = useCallback(async (token) => {
    localStorage.setItem("token", token);
    const { data: userData } = await AuthApi.getMe();
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return userData;
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    handleOAuthToken,
    isLoggedIn: !!user,
    isAdmin: user?.role === "ADMIN",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
