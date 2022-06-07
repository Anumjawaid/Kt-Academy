import cookie from "cookie-cutter";
import Cookies from 'cookies'
import {isBrowser} from "./Utils";

export function generateRandomString() {
    const length = 36;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getUserUUID(): string | null {
    if (!isBrowser()) return null
    let userUuid = cookie.get('userUuid')
    if (!userUuid) {
        userUuid = generateRandomString()
        cookie.set('userUuid', userUuid)
    }
    return userUuid
}

export function getUserUUIDFromRequest(req, res): string {
    const cookies = new Cookies(req, res)
    let userUuid = cookies.get('userUuid')
    if (!userUuid) {
        userUuid = generateRandomString()
        cookies.set('userUuid', userUuid)
    }
    return userUuid
}
