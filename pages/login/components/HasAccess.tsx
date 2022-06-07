import {useTranslations} from "../../../src/Translations";
import React from "react";
import Link from "../../../src/Link";

const HasAccess = (): JSX.Element => {
    const t = useTranslations();

    return (
        <>
            <h2>{t.login.hasAccess}</h2>
            <Link to={`/course`}>
                <div className="button light margin-10 pointer">{t.login.goToCourses}</div>
            </Link>
        </>
    )
}

export default HasAccess;