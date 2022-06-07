import React from "react";
import {useTranslations} from "./Translations";
import {CircularProgress} from "@material-ui/core";

export const LoadingPage = () => <>
    <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
        <CircularProgress />
    </div>
</>;

export const ErrorPage = ({message}: { message?: string }) => {
    const t = useTranslations()
    const displayMessage = message ? message : t.errorMessage
    return <>
        <div style={{textAlign: "center"}}>
            {displayMessage}
        </div>
    </>
}
