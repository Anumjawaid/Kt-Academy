import React, {useEffect} from "react";
import {registerGoogleSignInButton, signOutHandle} from "../../../src/login";
import {useTranslations} from "../../../src/Translations";
import {useGlobalState} from "../../../src/GlobalState";
import Link from "../../../src/Link";

type SetLoggedIn = (val: boolean) => void

interface LoginToGainAccessPropsI {
    justLoggedIn: boolean;
    setLoggedIn: SetLoggedIn;
}

const LoginToGainAccess = ({justLoggedIn, setLoggedIn}: LoginToGainAccessPropsI): JSX.Element => {
    return justLoggedIn ? <SuccessfulLogin/>: <Login setLoggedIn={setLoggedIn}/>
}

const Login = ({setLoggedIn}: {setLoggedIn: SetLoggedIn}): JSX.Element => {
    const t = useTranslations();
    const loginId = "login_button";
    const {user, setUser} = useGlobalState()

    useEffect(() => {
        user && signOutHandle(setUser).catch(console.error);
    }, [])

    useEffect(() => {
        registerGoogleSignInButton(loginId, setUser, () => setLoggedIn(true));
    }, [])

    return (
        <>
            <h2>{t.login.login}</h2>
            <div className="button light margin-10 pointer" id={loginId}>{t.login.button}</div>
        </>
    );
}

const SuccessfulLogin = (): JSX.Element => {
    const t = useTranslations();

    return (
        <>
            <h2> {t.login.success}</h2>
            <Link to={`/course`}>
                <div className="button light margin-10 pointer">{t.login.goToCourses}</div>
            </Link>
        </>
    );
}

export default LoginToGainAccess;