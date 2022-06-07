import {BookUpdate} from "../../src/Model";
import {useTranslations} from "../../src/Translations";
import ReactMarkdown from "react-markdown";
import React from "react";

export function UpdatesSection({updates, index = 0}: { updates: BookUpdate[], index?: number }) {
    const t = useTranslations();
    return <section id="updates" className={index % 2 == 0 ? "section--white" : ""}>
        <div className="content-container left">
            <h1>{t.book.updates}</h1>
            {updates.map(update =>
                <div className="update-without-image">
                    <h2 className="orange left">{update.title}</h2>
                    <p className="date">{update.date}</p>
                    <ReactMarkdown children={update.text}/>
                </div>
            )}
        </div>
    </section>;
}

