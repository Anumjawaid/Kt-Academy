import React from "react";
import ReactMarkdown from "react-markdown";
import {useTranslations} from "../../../src/Translations";
import {Workshop} from "../../../src/Model";

type Props = {
    workshop: Workshop
};

export default function WorkshopDetailsSection({workshop}: Props) {
    const t = useTranslations();
    return (<section className="workshop-TOC" id="workshop-TOC">
        <div className="gradient--strip skew"/>
        <div className="content-container content-container--gradient--strip">
            <h1 className="white-and-shadow margin-bottom-50">{t.workshopPage.titleToc}</h1>
            <div className="content-rectangle wow pulse" style={{textAlign: "left"}}>
                <style>
                    {'h4 {margin-bottom: 0; margin-top: 20px;}'}
                </style>
                <ReactMarkdown source={workshop.tocMd}/>
            </div>
        </div>
    </section>);
}