import React from "react";
import {useTranslations} from "../../src/Translations";

function LogoIcon({src}: { src: string }) {
    return <div className="trustedby-logo-container">
        <img className="trustedby-logo" src={src}/>
    </div>;
}

export default function TrustedBySection() {
    const t = useTranslations();
    const logoList = [
        "dropbox.png",
        "pega.png",
        "flixbus.png",
        "futuretv.png",
        "itaxi.png",
        "itv.png",
        "microdrones.png",
        "nordea.png",
        "operon.png",
        "SAP.png",
        "pko.png",
        "pracujpl2.png",
        "schibsted.png",
        "sensilabs.png",
        "TTMS.png",
    ].map(img => `/trusted-by/${img}`)
    return (<>
        <section className="padding-top-0 section--white" id="why-us">
            <div className="gradient--strip"/>
            <div className="content-container content-container--gradient--strip">
                <h1 className="white margin-bottom-30"> {t.trustedBy} </h1>
                <div className="trustedby-logos-container content-rectangle flex-container--row">
                    {logoList.map((logo, i) => <LogoIcon key={i} src={logo}/>)}
                </div>
            </div>
        </section>
    </>);
}