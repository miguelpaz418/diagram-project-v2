import React from "react";
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Icon(props) {

  const path = <path d="M15,8.22l-5-5a.26.26,0,0,1,.09-.42L17.45,0a.26.26,0,0,1,.34.31L15.44,8.11A.26.26,0,0,1,15,8.22ZM1,16.71l-.62.62.61.6.62-.62ZM11.69,6l-.63.63.6.61.64-.64ZM9.54,8.12l-.63.63.6.61.64-.64ZM7.4,10.26l-.64.64.61.6L8,10.87ZM5.25,12.41l-.64.64.61.6L5.85,13ZM3.1,14.56l-.63.63.6.61.64-.64Zm9.13-9.12-.32.31.6.61L12.83,6ZM1,16.7l-.63.63.6.61.64-.64Z" />

  return (
    <SvgIcon  style={{ fontSize: 28 }}>
        {path}
    </SvgIcon>
  );
}