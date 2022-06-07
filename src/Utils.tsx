import React, {useEffect, useRef} from "react";
import cookie from "cookie-cutter";
import {postPageLoad} from "./Network";
import {Lang, Langs} from "./Translations";

export function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current)
            fn();
        else
            didMountRef.current = true;
    }, inputs);
}

export function getPageKey(): string {
    return cookie.get('pageKey') ?? null
}

export function registerPage(localPageKey: string) {
    if (!isBrowser()) return

    const pageKey = 'kta-' + localPageKey
    const pageLoadMillis = (new Date()).getTime();
    const prevPageKey = cookie.get('pageKey')
    const prevPageLoadMillis = cookie.get('pageLoadMillis')
    cookie.set('pageKey', pageKey)
    cookie.set('pageLoadMillis', pageLoadMillis)

    const MINUTE_IN_MILLIS = 60 * 1000

    const pageHasChanged = pageKey !== prevPageKey
    const pageChangedAWhileAgo = !prevPageLoadMillis || pageLoadMillis - prevPageLoadMillis > MINUTE_IN_MILLIS
    if (pageHasChanged || pageChangedAWhileAgo) {
        postPageLoad(pageKey)
    }
}

export function pathWithLocales() {
    return [{locale: Lang.EN}, {locale: Lang.PL}]
}

export function makeStaticProps(props, revalidateTimeInSec: number = 5 * 60) {
    return {
        props: props,
        revalidate: revalidateTimeInSec
    }
}

export function makeDynamicProps(props) {
    return {
        props: props,
    }
}

export function makeRedirectProps(to: string) {
    return {
        redirect: {
            permanent: false,
            destination: to,
        },
        props: {},
    }
}

export function makeStaticPathsWithLocales<T>(params: T[]) {
    return {
        paths: cartesian("locale", Langs, "params", params),
        fallback: 'blocking'
    }
}

export function makeStaticPaths<T>(locale: string, params: T[]) {
    return {
        paths: params.map((param) => {
            return {"locale": locale, "params": param}
        }),
        fallback: 'blocking'
    }
}

function cartesian<T1, T2>(name1: string, arr1: T1[], name2: string, arr2: T2[]) {
    return arr1.flatMap(a1 =>
        arr2.map(a2 => {
            return {
                [name1]: a1,
                [name2]: a2
            }
        })
    )
}

export function isBrowser() {
    return typeof window !== 'undefined'
}

export function getQueryParamFromWindow(name: string): string | null {
    const res = isBrowser() && window && (new URLSearchParams(window.location.search)).get(name);
    return !res || res.length === 0 ? null : res
}