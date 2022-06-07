import React from "react";
import Header from "../../components/section/Header";
import FooterSection from "../../components/section/FooterSection";
import {makeDynamicProps, registerPage} from "../../src/Utils";
import {Article} from "../../src/Model";
import {requestArticles} from "../../src/Network";
import Link from "../../src/Link";
import {useTranslations} from "../../src/Translations";
import {ArticlesGrid} from "../../components/component/ArticlesGrid";

export async function getServerSideProps({locale}) {
    const articles = await requestArticles({lang: locale, userUuid: "null"})
    return makeDynamicProps({articles})
}

export default function ArticlesPage({articles}: { articles: Article[] }) {
    registerPage("articles")
    const t = useTranslations()
    return (
        <>
            <Header/>
            <ArticlesGrid articles={articles}/>
            <section style={{
                margin: "0px auto",
                maxWidth: "1250px",
                padding: "80px 80px",
                backgroundColor: "white",
                textAlign: "center"
            }}>
                {t.article.more} <Link to="https://blog.kotlin-academy.com/">Medium</Link>
            </section>
            <FooterSection/>
        </>
    );
}
