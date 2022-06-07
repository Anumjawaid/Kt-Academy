import {isBrowser} from "../../src/Utils";
import React, {useEffect} from "react";

export function useSetupPlayground() {
    useEffect(() => {
        setupPlayground()
    })
}

export function setupPlayground(options = undefined) {
    if (isBrowser()) {
        const playground = require('kotlin-playground')
        playground(".kotlin-code")
    }
}

type KotlinPlaygroundParams = {
    dataTargetPlatform?: "junit" | "java",
    children,
    className?: string,
    mode?: string,
    options?: any,
    readOnly?: boolean,
    args?: string
};

export default function KotlinPlayground({children, dataTargetPlatform = "java", mode = "kotlin", className = "", options = undefined, readOnly = false, args}: KotlinPlaygroundParams) {
    useEffect(() => {
        setupPlayground(options)
    }, [children, dataTargetPlatform])

    const attributes = {
        mode: mode,
        "data-autocomplete": "true",
        "highlight-on-fly": "true",
        "match-brackets": "true",
        "data-target-platform": dataTargetPlatform,
        "folded-button": "true",
        ...(args ? {args: args} : {})
    }
    return <div className={className}>
        {readOnly ?
            <div data-highlight-only className="kotlin-code"{...attributes}>{children}</div> :
            <div className="kotlin-code"{...attributes}>{children}</div>
        }
    </div>
}
