import React from "react";
import Header from "../section/Header";
import FooterSection from "../section/FooterSection";
import {BookUpdate} from "../../src/Model";
import {registerPage} from "../../src/Utils";
import MediaHeaders from "../MediaHeaders";
import {AboutPageSection} from "../section/AboutPageSection";
import {UpdatesSection} from "../section/UpdatesSection";
import ReactMarkdown from "react-markdown";
import {VideoSection} from "../section/VideoSection";
import {TalksSection} from "../section/TalksSection";

export default function GenericPage({page}: { page: GenericPageData }) {
    registerPage(page.key)
    return <>
        <MediaHeaders
            title={page.pageTitle}
            description={page.pageDescription ?? ""}
            image={page.imgSrc}
        />
        <Header allowedLangs={[page.lang]} addMediaHeader={false}/>

        <GenericSections sections={page.sections}/>

        <FooterSection/>
    </>;
};

export function GenericSections({sections, firstIndex = 0}: { sections: GenericSection[], firstIndex?: number }) {
    return <>
        {sections.map((section, index) => {
            index += firstIndex
            switch (section.type) {
                case "intro":
                    return <AboutPageSection
                        key={index}
                        title={section.title}
                        text={section.description}
                        imageUrl={section.imgSrc}/>
                case "text":
                    return <TextualSection
                        section={section}
                        index={index}
                        key={index}/>
                case "video":
                    return <VideoSection
                        title={section.title}
                        videoKeys={section.videoKeys}
                        key={index}
                        id={section.id}
                        index={index}/>
                case "updates":
                    return <UpdatesSection
                        updates={section.updates}
                        key={index}
                        index={index}/>
                case "talks":
                    return <TalksSection
                        talks={section.talks}
                        title={section.title}
                        key={index}
                        index={index}/>
            }
        })}
    </>;
}

export const TextualSection = ({section, index = 0}: { section: TextualSectionType, index?: number }) =>
    <section id={section.key} className={index % 2 == 0 ? "section--white" : ""}>
        <div className="content-container left">
            {section.imgSrc &&
            <div style={{textAlign: "center", marginBottom: section.text ? "50px" : "0px"}}>
                <img src={section.imgSrc} alt="" style={{maxWidth: "700px", width: "100%"}}/>
            </div>
            }
            {section.text && <ReactMarkdown children={section.text}/>}
        </div>
    </section>

export type GenericPageData = {
    key: string,
    lang: string,
    pageTitle?: string,
    pageDescription?: string,
    imgSrc?: string,
    sections: GenericSection[]
}

export type GenericSection = IntroSectionType | TextualSectionType | UpdatesSectionType | VideoSectionType | TalksSectionType

type IntroSectionType = {
    type: "intro",
    title: string,
    description: string,
    imgSrc: string,
}

type TextualSectionType = {
    type: "text",
    key?: string,
    imgSrc?: string,
    text?: string,
}

type UpdatesSectionType = {
    type: "updates",
    updates: BookUpdate[],
}

type VideoSectionType = {
    type: "video",
    title: string,
    id?: string,
    videoKeys: string[],
}

type TalksSectionType = {
    type: "talks",
    title: string,
    talks: TalkSection[]
}

export type TalkSection = {
    title: string,
    description: string,
    speaker: {name: string, imgSrc: string, link: string},
}