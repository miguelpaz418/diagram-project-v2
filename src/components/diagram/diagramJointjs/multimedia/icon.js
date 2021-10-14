import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Icon(props) {

    const path = <path d="M15.646 8.86l-6.786 6.786c-0.22 0.221-0.524 0.357-0.86 0.357s-0.64-0.136-0.86-0.357l-6.786-6.786c-0.221-0.22-0.357-0.524-0.357-0.86s0.136-0.64 0.357-0.86l6.786-6.786c0.22-0.221 0.524-0.357 0.86-0.357s0.64 0.136 0.86 0.357l6.786 6.786c0.221 0.22 0.357 0.524 0.357 0.86s-0.136 0.64-0.357 0.86l-0 0z" />

    return (
        <SvgIcon  style={{ fontSize: 28 }}>
            {path}
        </SvgIcon>
    );
}