import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Icon(props) {

    const path = <path d="M0 8.72v-1.44h2v1.44zM0 5.84h2v-1.43h-2zM2 11.59v-1.43h-2v1.43zM5.84 16v-2h-1.43v2zM13 2h1v1h2v-1c0-1.105-0.895-2-2-2v0h-1zM10.16 0v2h1.43v-2zM7.28 2h1.44v-2h-1.44zM4.41 2h1.43v-2h-1.43zM2 3v-1h1v-2h-1c-1.105 0-2 0.895-2 2v0 1zM8.72 14h-1.44v2h1.44zM14 4.41v1.43h2v-1.43zM14 13v1h-1v2h1c1.105 0 2-0.895 2-2v0-1zM3 14h-1v-1h-2v1c0 1.105 0.895 2 2 2v0h1zM11.62 14h-1.46v2h1.43zM16 10.16h-2v1.43h2zM14 7.28v1.44h2v-1.44z" />

    return (
        <SvgIcon  style={{ fontSize: 28 }}>
            {path}
        </SvgIcon>
    );
}