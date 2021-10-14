import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Icon(props) {

    const path = <path d="M9.074 0h-9.074v9.27h0.003c0.104 3.735 3.163 6.73 6.923 6.73h2.149c3.76 0 6.819-2.996 6.923-6.73h0.003v-9.27zM14.153 7.174v1.803h-0.002c-0.084 2.876-2.436 5.175-5.325 5.176h-1.652c0 0 0 0-0 0-2.889 0-5.241-2.3-5.325-5.169l-0-0.008h-0.002v-7.13h12.306z" />
    
    return (
        <SvgIcon  style={{ fontSize: 28 }}>
            {path}
        </SvgIcon>
    );
}