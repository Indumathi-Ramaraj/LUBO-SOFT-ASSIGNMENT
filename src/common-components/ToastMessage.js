import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from "react-icons/fa";

export const displayIcon = (type) => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

const ToastMessage = ({ type, message }) => {
  return (
    //@ts-ignore
    toast[type](
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
          {message}
        </div>
      </div>
    )
  );
};

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ToastMessage.dismiss = toast.dismiss;

export const sucessNotification = (message) => {
  ToastMessage({
    type: "success",
    message: message,
  });
};

export const warningNotification = (message) => {
  ToastMessage({
    type: "warning",
    message: message,
  });
};
export const errorNotification = (message) => {
  ToastMessage({
    type: "error",
    message: message,
  });
};

export default ToastMessage;
