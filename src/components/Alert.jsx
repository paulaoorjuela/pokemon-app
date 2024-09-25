import React, { useEffect } from "react";

const Alert = ({ message, type = "success", onClose }) => {
  useEffect(() => {// useEffect to set a timer for closing the alert
    const timer = setTimeout(() => {// Set a timer that calls onClose (3 seconds)
      onClose();
    }, 3000);

    return () => clearTimeout(timer);// Cleanup function to clear the timer
  }, [onClose]);

  return (
    <div className={`poppins-regular ${type}-alert custom-alert`}>{/*type changes to error or succes for styling*/}
      <p>{message}</p>
    </div>
  );
};

export default Alert;
