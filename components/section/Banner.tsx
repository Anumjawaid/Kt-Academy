import Link from "../../src/Link";
import React from "react";

export type BannerProps = {
    img: string,
    width: Width,
    title: string,
    subtitle?: string,
    button?: Button
}

export enum Width {
    Full,
    Half
}

type Button = {
    text: string,
    to: string
}

export function Banner({banner}: { banner?: BannerProps }) {
    return <>
        {banner ?
            <header className={banner ? "banner__background banner--full-width" : ""}
                    style={banner ? {
                        backgroundImage: "url('" + banner.img + "')",
                        height: banner.width === Width.Half ? "65vh" : "100vh",
                        marginTop: banner.width === Width.Half ? "70px" : "35px",
                        zIndex: 1000
                    } : {}}>
                <div className="banner">
                    <div className="wow fadeInDown banner__text-container">
                        <h1>{banner.title}</h1>
                        <h3>{banner.subtitle}</h3>
                        {banner.button &&
                        <Link to={banner.button.to} className="button button--white pointer">{banner.button.text}</Link>
                        }
                    </div>
                </div>
            </header>
            :
            <div style={{height: "70px"}}/>
        }
    </>
}
