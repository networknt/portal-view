import React from "react";

export default function ConfigDetail(props) {
    const { step, classes } = props;

    if(step !== 4) {
        return null;
    }

    return (
        <div>Config Detail</div>
    )
}
