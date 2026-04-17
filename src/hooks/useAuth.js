import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useAuth() {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const { user, login, register, logout, loading } = context;

  return {
    user,
    login,
    register,
    logout,
    loading
  };
}

export default useAuth;