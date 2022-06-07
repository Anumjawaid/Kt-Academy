import React, {Dispatch, SetStateAction} from "react";
import {isBrowser, useDidUpdateEffect} from "./Utils";
import cookie from "cookie-cutter";

export function useSimpleCookieState<T>(initialValue: T, property: string): [T, Dispatch<SetStateAction<T>>] {
    const getCookieValue = () => {
        if (!isBrowser()) return null
        const read = cookie.get(property)
        return read && JSON.parse(read)
    }
    const [value, setValue] = React.useState<T>(getCookieValue() ?? initialValue);
    const setValuePersistent = (value) => {
        setValue(value)
        if (isBrowser()) {
            cookie.set(property, JSON.stringify(value), {
                expires: 2147483647 // Max value, ~year 2038
            })
        }
    }
    return [value, setValuePersistent]
}