import React from "react";
import ReactMarkdown from "react-markdown";
import {TranslatedText, Workshop} from "../../../src/Model";
import {useTranslations} from "../../../src/Translations";

type Props = {
    workshop: Workshop
};

export default function KnowledgeSourcesSection({workshop}: Props) {
    const t = useTranslations();
    return (<section className="workshop-page">
        <div className="content-container">
            <ReactMarkdown source={workshop.description}/>
            <h1 className="margin-top-20">{t.workshopPage.knowledgeSources.title}</h1>
            <div className="flex-container--row">
                {workshop.knowledgeSources?.map(source =>
                    <KnowledgeSource text={source.text} iconCss={source.iconCss + "  big-icon"}/>
                )}
            </div>
        </div>
    </section>);
}

function KnowledgeSource({iconCss, text}: { iconCss: string, text: TranslatedText }) {
    const t = useTranslations();
    return <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
        <i className={iconCss}/>
        <p style={{marginTop: 0, height: "40px"}}>{textFromTranslatedText(text, t.workshopPage.knowledgeSources)}</p>
    </div>;
}

function textFromTranslatedText(text: TranslatedText, translationBase): string {
    let key = text.translationKey;
    if (key !== null) {
        return translationBase[key]
    } else {
        return text.text ?? ""
    }
}
