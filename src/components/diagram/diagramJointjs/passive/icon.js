import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Icon(props) {

    const path = <path d="M14.381 15.99h-12.762c-0.003 0-0.006 0-0.010 0-0.889 0-1.609-0.72-1.609-1.609 0-0 0-0 0-0v0-12.762c-0-0.003-0-0.006-0-0.010 0-0.889 0.72-1.609 1.609-1.609 0.004 0 0.007 0 0.011 0h12.761c0 0 0 0 0 0 0.889 0 1.609 0.72 1.609 1.609 0 0.004-0 0.007-0 0.011v-0.001 12.762c0 0.889-0.72 1.609-1.609 1.609v0z" />

    return (
        <SvgIcon  style={{ fontSize: 28 }}>
            {path}
        </SvgIcon>
    );
}