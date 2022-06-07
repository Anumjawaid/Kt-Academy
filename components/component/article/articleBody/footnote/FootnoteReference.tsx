import React from "react";
import { getFootnoteId } from "./helper";

const FootnoteReference = (props): JSX.Element => {
    const id = getFootnoteId(props);

    return (
        <sup id={"use-" + id}>
            <a href={"#definition-" + id}>{id}</a>
        </sup>
    );
}

export default FootnoteReference;