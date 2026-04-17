import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";


import useAuth from "./hooks/useAuth";


function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
  return <p>Loading...</p>;
}

if (!user) {
  return <Navigate to="/login" />;
}

  return children; 
}


function PublicRoute({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}


function App() {

  return (
    <Router>

      <Routes>

        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path="/create" element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        } />

        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        } />

        <Route path="/post/:id" element={
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>
  );
}

export default App;