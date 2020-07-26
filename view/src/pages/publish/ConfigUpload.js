import React from "react";

export default function ConfigUpload(props) {
    const { step, classes } = props;

    if(step !== 5) {
        return null;
    }

    return (
        <div>Config Upload</div>
    )
}
