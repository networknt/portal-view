import React from "react";
export default function SpecUpload(props) {
    const { step, classes } = props;

    if(step !== 2) {
        return null;
    }
    
    return (
        <div>Spec Upload</div>
    )
}
