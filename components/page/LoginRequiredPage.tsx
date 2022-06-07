import {useGlobalState} from "../../src/GlobalState";
import React, {useEffect} from "react";
import {registerGoogleSignInButton} from "../../src/login";
import Header from "../section/Header";
import FooterSection from "../section/FooterSection";
import {useTranslations} from "../../src/Translations";
import {User} from "../../src/Model";
import {generateRandomString} from "../../src/userUuid";

export function LoginRequiredPage() {
    const t = useTranslations()

    return <>
        <Header/>
        <div style={{margin: "auto", textAlign: "center", marginTop: "200px"}}>
            <div>{t.login.pageLoginRequired}</div>
            <LoginButton text={t.login.button}/>
        </div>
        <FooterSection style={{bottom: 0, width: "100%", position: "fixed"}}/>
    </>
}

export function LoginButton({text}: { text: string }) {
    const randomString = generateRandomString()
    const loginButtonId = "login_button_" + randomString
    const {setUser} = useGlobalState()

    useEffect(() => {
        registerGoogleSignInButton(loginButtonId, setUser)
    }, [])

    return <div id={loginButtonId} className="button light margin-10">{text}</div>;
}

type OrUser<T> = T & { user: User | null }

export function PageOrLoginRequired<T>(initialState: OrUser<T>, Child: (params: OrUser<T>) => any) {
    const state = useGlobalState()
    if (initialState && initialState.user) {
        state.setUser(initialState.user)
    }
    if (state.user) {
        return <Child {...initialState} user={state.user}/>
    } else {
        return <LoginRequiredPage/>
    }
}
