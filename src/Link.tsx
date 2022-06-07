import React from 'react';
import NextLink from "next/link";
import {useLang} from "./Translations";

export default function Link({to, ...rest}) {
    const children = rest.children
    if (!to) {
        return (<a {...rest}>{children}</a>);
    } else if (to[0] === "#") {
        return <a href={to} {...rest}>{children}</a>
    } else if (isInternal(to) && !isResource(to)) {
        return <NextLink href={to}><a {...rest}>{children}</a></NextLink>
    } else {
        return <a href={to} target="_blank" {...rest}>{children}</a>
    }
}

export function useLinkFunctions() {
    const {pathPrefix} = useLang()
    return {
        linkKeepLang: (to: string) => !isOnlyHash(to) ? pathPrefix + to : to
    }
}

function isInternal(to) {
    return to.indexOf("://") === -1 && to.indexOf("www") === -1
}

function isResource(to) {
    return to.endsWith(".pdf")
}

function isOnlyHash(to) {
    return to.startsWith("#")
}