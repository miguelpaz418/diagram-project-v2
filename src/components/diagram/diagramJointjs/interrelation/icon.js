import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

export default function Icon(props) {

    const path = <>
                    <path d="M0 10.531h1.847v1.048h-1.847v-1.048z" />
                    <path d="M0 7.636h1.847v1.048h-1.847v-1.048z" />
                    <path d="M1.847 2.77v-0.923h12.306v0.923h1.847v-0.684c0-1.152-0.934-2.087-2.087-2.087v0h-11.827c-1.152 0-2.087 0.934-2.087 2.087v0 0.684z" />
                    <path d="M0 4.617h1.847v1.172h-1.847v-1.172z" />
                    <path d="M14.153 4.617h1.847v1.172h-1.847v-1.172z" />
                    <path d="M14.153 13.425v0.728h-12.306v-0.728h-1.847v0.488c0 1.152 0.934 2.087 2.087 2.087v0h11.827c1.152 0 2.087-0.934 2.087-2.087v0-0.488z" />
                    <path d="M14.153 7.636h1.847v1.048h-1.847v-1.048z" />
                    <path d="M14.153 10.531h1.847v1.048h-1.847v-1.048z" />
                </>
    return (
        <SvgIcon  style={{ fontSize: 28 }}>
            {path}
        </SvgIcon>
    );
}