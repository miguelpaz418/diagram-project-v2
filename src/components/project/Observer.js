import React from "react";
//MUI
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
//Icons

function Observer({
  email,
  imageUrl,
  onHandle,
  onClick,
  chipClassName,
  chipId,
  icon,
  color,
  size,
  variant
}) {
  return (
    <Chip
      avatar={<Avatar alt="imagen avatar" src={imageUrl} />}
      label={email}
      onDelete={onHandle}
      onClick={onClick}
      className={chipClassName}
      id={chipId}
      deleteIcon={icon}
      color={color}
      variant={variant}
      size={size}
    />
  );
}

export default Observer;
