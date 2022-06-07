import FooterSection from "../../components/section/FooterSection";
import React from "react";
import Header from "../../components/section/Header";
import {registerPage} from "../../src/Utils";
import {useGlobalState} from "../../src/GlobalState";
import LoginToGainAccess from "./components/LoginToGainAccess";
import HasAccess from "./components/HasAccess";
import style from "./login.module.scss";

const LoginPage = (): JSX.Element => {
    registerPage(`login`)
    const {user} = useGlobalState();
    const [justLoggedIn, setLoggedIn] = React.useState(false);
    const hasAccess = user?.tags.includes("KOTLIN_WORKSHOP_ATTENDEE");

    return (
        <div className={style.loginPage}>
            <Header/>
            <section>
                <div className="content-container">
                    {hasAccess && !justLoggedIn ? <HasAccess/> : <LoginToGainAccess justLoggedIn={justLoggedIn} setLoggedIn={setLoggedIn}/>}
                </div>
            </section>
            <FooterSection style={{position: "absolute", bottom: "0", width: "100%"}}/>
        </div>
    );
}

export default LoginPage;