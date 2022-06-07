import ReactMarkdown from "react-markdown";
import React from "react";

export function TitledSection({title, text}: { title: string, text: string }) {
    return <section className="requirements short-section short-list">
        <div className="content-container short-content-container">
            <h1>{title}</h1>
            <ReactMarkdown source={text}/>
        </div>
    </section>;
}