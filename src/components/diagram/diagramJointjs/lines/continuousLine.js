import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Icon(props) {

  const path = <path d="M14,4.48.47,17.86a.29.29,0,0,1-.39,0h0a.27.27,0,0,1,0-.39L13.63,4.08Zm2,1.61L17.79.25A.19.19,0,0,0,17.54,0L12.05,2.12a.2.2,0,0,0-.07.32l3.73,3.73A.2.2,0,0,0,16,6.09Z" />

  return (
    <SvgIcon  style={{ fontSize: 28 }}>
        {path}
    </SvgIcon>
  );
}