import React from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {Lang} from "../src/Translations";
import {BaseRouter} from "next/dist/shared/lib/router/router";

type MediaHeadersProps = {
    title?: string,
    description: string,
    keywords?: string,
    image?: string
};

function getFullUrl(router: BaseRouter): string {
    const locale = router.locale === Lang.PL ? "/pl" : ""
    return process.env.baseUrl + locale + router.asPath
}

export default function MediaHeaders({title = "Kt. Academy", description, keywords, image}: MediaHeadersProps) {
    const router = useRouter();
    const imageUrl = image ?? `${process.env.baseUrl}/images/logo_full.png`
    return <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        {keywords && <meta name="keywords" content={keywords}/>}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:site" content="@ktdotacademy"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>
        <meta name="twitter:image" content={imageUrl}/>
        <meta property="og:title" content={title}/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content={imageUrl}/>
        <meta property="og:image:width" content="800"/>
        <meta property="og:image:height" content="1200"/>
        <meta property="og:url" content={getFullUrl(router)}/>
        <meta property="og:description" content={description}/>
    </Head>;
}
