import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo } from 'react-icons/fi';

const Alert = ({ type = 'info', message, onClose }) => {
  const bgColor = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100',
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800',
  }[type];

  const icon = {
    success: <FiCheckCircle />,
    error: <FiAlertCircle />,
    warning: <FiAlertCircle />,
    info: <FiInfo />,
  }[type];

  return (
    <div className={`${bgColor} ${textColor} p-4 rounded-lg flex items-center gap-3 mb-4`}>
      {icon}
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto font-bold"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
