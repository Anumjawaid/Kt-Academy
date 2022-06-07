import React, {useEffect} from "react";
import {changeLocaleTo, useTranslations} from "../../src/Translations";
import MediaHeaders from "../MediaHeaders";
import {HeaderMenu} from "./HeaderMenu";
import {Banner, BannerProps} from "./Banner";
import {useRouter} from "next/router";

export type LinkTo = {
    text: string,
    to?: string,
    onClick?: () => void,
    divider?: boolean,
    translate?: boolean
}

type Props = {
    links?: LinkTo[],
    banner?: BannerProps,
    allowedLangs?: string[],
    addMediaHeader?: boolean
};

export default function Header({links = [], banner = undefined, allowedLangs, addMediaHeader = true}: Props) {
    const t = useTranslations()
    const router = useRouter()

    useEffect(() => {
        if (allowedLangs && allowedLangs.length > 0 && !allowedLangs.includes(router.locale)) {
            changeLocaleTo(router, allowedLangs[0]);
        }
    }, [])

    return (
        <>
            {addMediaHeader && <MediaHeaders
                title="Kt. Academy"
                description={t.motto}
                keywords="Workshop Learning Programming"
            />}
            <HeaderMenu links={links} allowedLangs={allowedLangs}/>
            <Banner banner={banner}/>
        </>
    )
}
