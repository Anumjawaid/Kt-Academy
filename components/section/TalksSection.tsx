import ReactMarkdown from "react-markdown";
import React from "react";
import {TalkSection} from "../page/GenericPage";

export function TalksSection({talks, title, index = 0}: { talks: TalkSection[], title: string, index?: number }) {
    return <section id="talks" className={index % 2 == 0 ? "section--white" : ""}>
        <div className="content-container left">
            <h1>{title}</h1>
            {talks.map(talk => <>
                <div className="title margin-top-20">
                    <h2>{talk.title}</h2>
                </div>
                <div className="content-container flex-container--row">
                    <div className="flex-item--image-container">
                        <img className="round-photo wow zoomIn" src={talk.speaker.imgSrc} alt={talk.speaker.name}/>
                    </div>
                    <div className="flex-item--right padding-left-40" style={{flex: 3}}>

                        <ReactMarkdown source={talk.description}/>
                    </div>
                </div>
            </>)}
        </div>
    </section>;
}

