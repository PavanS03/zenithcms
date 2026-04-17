import React from "react";

function Toast({ message }) {

  if (!message) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "var(--accent)",
      color: "black",
      padding: "10px",
      borderRadius: "6px"
    }}>
      {message}
    </div>
  );
}

export default Toast;