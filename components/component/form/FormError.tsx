import React from "react";

export function FormError(props: { field }) {
    return <div style={{color: "red", fontSize: "small", marginLeft: "10px", marginTop: "5px"}}>
        {props.field && props.field.message}
    </div>;
}