import ReactDOM from "react-dom";
import React from "react";

import MessageDialog from '../diagram/diagramJointjs/messageDialog';

const UserLeaveConfirmation = (
  message,
  callback,
  confirmOpen,
  setConfirmOpen
) => {
  const container = document.createElement("div");

  container.setAttribute("custom-confirm-view", "");

  const handleConfirm = (callbackState) => {
    ReactDOM.unmountComponentAtNode(container);
    callback(callbackState);
    setConfirmOpen(false);
  };

  const handleCancel = (callbackState) => {
    ReactDOM.unmountComponentAtNode(container);
    callback();
    setConfirmOpen(true);
  };

  document.body.appendChild(container);
  const { header, content } = JSON.parse(message);
  ReactDOM.render(
    <MessageDialog 
    open={confirmOpen} 
    handleOpen={handleConfirm} 
    handleClose={handleCancel}
    message={content}
    />,

    container
  );
};

export default UserLeaveConfirmation;