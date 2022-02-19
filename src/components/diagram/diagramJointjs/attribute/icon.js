import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Icon(props) {

    const path = <path d="M14 0h-12c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2v-12c0-1.1-0.9-2-2-2zM14 14h-12v-12h12v12z" />

    return (
        <SvgIcon  style={{ fontSize: 28 }}>
            {path}
        </SvgIcon>
    );
}