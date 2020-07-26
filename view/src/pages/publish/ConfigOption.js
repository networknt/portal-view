import React from "react";

export default function ConfigOption(props) {
    const { step, classes } = props;

    if(step !== 3) {
        return null;
    }

    return (
        <div>Config Option</div>
    )
}
