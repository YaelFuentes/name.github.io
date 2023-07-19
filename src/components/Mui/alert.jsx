import React, { useState, useEffect } from 'react';

const Alert = ({ type, message, duration }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  if (!showAlert) {
    return null;
  }

  return (
    <div className={`alert ${type}`}>
      {message}
    </div>
  );
};

export default Alert;