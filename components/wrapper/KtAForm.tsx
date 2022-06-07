import React from 'react';
import ReactMarkdown from "react-markdown";
import Header from "../section/Header";
import FooterSection from "../section/FooterSection";

type KtAFormProps = { children, onSubmit, title?: string, intro?: string };

export const KtAForm = ({children, onSubmit, title, intro}: KtAFormProps) => {
    return <>
        <Header/>
        <section className="form">
            <div className="content-container">
                {title && <h1>{title}</h1>}
                {intro && <ReactMarkdown source={intro}/>}
                <form onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </section>
        <FooterSection/>
    </>;
};