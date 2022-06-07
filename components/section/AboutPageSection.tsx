import {BookAction} from "../../src/Model";
import ReactMarkdown from "react-markdown";
import React from "react";

type AboutPageSectionProps = {
    title: string,
    imageUrl: string,
    subtitle?: string,
    text: string,
    actions?: BookAction[],
};

export function AboutPageSection({title, subtitle, text, actions, imageUrl}: AboutPageSectionProps) {
    return <section id="about" style={{paddingTop: "0px"}} className="section--white">
        <div className="content-container">
            <h1 className="orange" style={{marginBottom: "50px"}}>{title}</h1>
            {subtitle && <h2 className="orange">{subtitle}</h2>}
            <div className="flex-container reverse--on-mobile">
                <div className="flex-item padding-top-20">
                    <ReactMarkdown children={text}/>
                    {actions &&
                    <p>
                        <div className="flex-container">
                            {actions
                                ?.map(action => <AboutActionButton config={action} key={action.text}/>)}
                        </div>
                    </p>
                    }
                </div>
                <div className="flex-item--image-container wiz--on-mobile">
                    <img
                        style={{maxHeight: "500px", width: "auto"}}
                        src={imageUrl}
                        className="responsive-img"
                    />
                </div>
            </div>
        </div>
    </section>
}

const AboutActionButton = ({config: {text, icon, href, social}}: { config: BookAction }) =>
    <a href={href} className={"button light flex-item" + (social ? " blue" : "")}
       style={{margin: "10px", flexGrow: 0}}>
        {icon && <i className={icon + " small-icon"}/>}
        {text}
    </a>;