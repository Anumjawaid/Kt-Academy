import React, {Dispatch, SetStateAction} from "react";
import {isBrowser, useDidUpdateEffect} from "../Utils";
import cookie from "cookie-cutter";

export function useCookieState<T, S>(initialValue: T, setConfig: (config: S) => void, property: keyof S): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = React.useState<T>(initialValue);
    useDidUpdateEffect(() => {
        if (value != null) {
            const configChange = {[property]: value};
            // @ts-ignore
            setConfig(configChange)
        }
    }, [value])
    return [value, setValue]
}

export function useCookieMusicConfigState<T>(defaultValue: T, property: keyof CookieMusicConfig): [T, Dispatch<SetStateAction<T>>] {
    const {getConfig, setConfig} = useCookieMusicConfig()
    const initialConfig = getConfig()
    // @ts-ignore
    const value: T = initialConfig ? initialConfig[property] ?? defaultValue : defaultValue
    return useCookieState<T, CookieMusicConfig>(value, setConfig, property)
}

type CookieMusicConfig = {
    chosenVideo?: string,
    workTime?: number,
    breakTime?: number,
    volume?: number,
    totalSecPassed?: number,
}

function useCookieMusicConfig(): { getConfig: () => CookieMusicConfig, setConfig: (config: CookieMusicConfig) => void } {
    const getConfig = () => {
        if (!isBrowser()) return null
        const cookieContent = cookie.get('programming-music-config');
        const obj = cookieContent && cookieContent.length !== 0 ? cookieContent : "{}";
        return JSON.parse(obj)
    }
    return {
        getConfig: getConfig,
        setConfig: (value: CookieMusicConfig) => {
            if (isBrowser()) {
                cookie.set('programming-music-config', JSON.stringify({...getConfig(), ...value}))
            }
        }
    }
}