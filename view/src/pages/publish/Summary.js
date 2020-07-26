import React from "react";

export default function Summary(props) {
    const { step, classes } = props;

    if(step !== 6) {
        return null;
    }

    return (
        <div>Summary</div>
    )
}
