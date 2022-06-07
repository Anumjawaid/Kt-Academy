import FooterSection from "../../components/section/FooterSection";
import React from "react";
import Header from "../../components/section/Header";
import {useTranslations} from "../../src/Translations";
import {makeStaticPathsWithLocales, makeStaticProps, registerPage} from "../../src/Utils";
import {requestArticleOrNull, requestArticles} from "../../src/Network";
import ReactMarkdown from "react-markdown";
import {Article, ArticleDetails} from "../../src/Model";
import MediaHeaders from "../../components/MediaHeaders";
import ArticleBody from "../../components/component/article/articleBody";
import Link from "../../src/Link";
import {enrichText} from "../../src/article/ArticleMarkdownProcessing";
import {Fab} from "@material-ui/core";
import CommentsSection from "../../components/section/CommentsSection";
import Image from 'next/image'
import style from "./article.module.scss";

export async function getStaticProps({params, locale}) {
    const article = await requestArticleOrNull(params.articleKey, {lang: locale})
    return makeStaticProps({article})
}

export async function getStaticPaths({locale}) {
    const articles = await requestArticles({lang: locale})
    const articleKeys = articles.map(w => ({articleKey: w.key}))
    return makeStaticPathsWithLocales(articleKeys)
}

export default function ArticleOrMissingArticle({article}: { article: ArticleDetails | null }) {
    if (!article) {
        return <>
            <MissingArticle/>
        </>
    } else {
        return <ArticlePage article={article}/>
    }
}

function ArticlePage({article}: { article: ArticleDetails }) {
    registerPage(`article-${article.key}`)
    const text = enrichText(article)

    const t = useTranslations()
    return <>
        <MediaHeaders
            title={article.title}
            description={article.shortDescription}
            image={article.thumbnailUrl}
            // keywords={article.keywords} TODO
        />
        <Header addMediaHeader={false}/>
        <div className="content-container left">
            <ArticleBody text={text} articleKey={article.key}/>
            {article.author && <>
                <h3 style={{marginTop: "20px"}}>{t.article.author?.title}</h3>
                <AuthorReviewerBox text={article.author.displayName}
                                   linkUrl={`/user/${article.author.publicKey}`}
                                   imageUrl={article.author.imageUrl}/>
            </>}
            {article.reviewers && article.reviewers.length > 0 &&
                <>
                    <h3>{t.article.reviewer.title}</h3>
                    {article.reviewers.map(reviewer =>
                        <AuthorReviewerBox text={reviewer.displayName}
                                           linkUrl={`/user/${reviewer.publicKey}`}
                                           imageUrl={reviewer.imageUrl}
                                           key={reviewer.publicKey}/>
                    )}
                    {article.series === 'KOTLIN_COROUTINES' &&
                        <AuthorReviewerBox text={t.article.reviewer.open.name}
                                           linkUrl={"/user/reviewer/form/" + article.key}
                                           imageUrl="https://cdn.shortpixel.ai/client/q_lossy,ret_img/https://deko-rady.pl/wp-content/uploads/2014/02/question-mark.jpg"/>
                    }
                </>
            }
            <CommentsSection collectionKey={`kta-article-${article.key}`}/>
        </div>
        <PrevNextButtons article={article}/>
        <FooterSection/>
    </>;
}

function PrevNextButtons({article}: { article: ArticleDetails }) {
    const t = useTranslations()
    return <>
        {article?.prev &&
            <Link to={`/article/${article.prev.key}`}>
                <Fab variant="extended" color="primary" aria-label="add"
                     style={{position: "fixed", left: "20px", bottom: "20px"}}>
                    {t.article.prev}
                </Fab>
            </Link>
        }
        {article?.next &&
            <Link to={`/article/${article.next.key}`}>
                <Fab variant="extended" color="primary" aria-label="add"
                     style={{position: "fixed", right: "20px", bottom: "20px"}}>
                    {t.article.next}
                </Fab>
            </Link>
        }
    </>;
}

function MissingArticle() {
    registerPage(`article-not-translated`)
    const t = useTranslations()
    return <>
        <Header addMediaHeader={true}/>
        <div className="content-container left">
            <ReactMarkdown
                source={t.article.notTranslated}
            />
        </div>
        <FooterSection/>
    </>;
}

export function AuthorReviewerBox(
    {
        text, linkUrl, imageUrl
    }: {
        text: string,
        linkUrl: string,
        imageUrl: string
    }
) {
    return <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "20px"
    }}>
        <span style={{
            fontSize: ".8rem",
            display: "flex",
            alignItems: "center",
            marginRight: "13px",
        }}>
            {imageUrl &&
                <Image
                    src={imageUrl}
                    alt={text}
                    width={60}
                    height={60}
                    className={style.avatar}
                />
            }
        </span>
        <span style={{paddingTop: "2px"}}>
            <span className="article-name">
                <Link to={linkUrl} style={{
                    color: "rgba(0, 0, 0, .8) !important",
                    fontSize: "15px !important",
                }}>{text}</Link>
            </span>
        </span>
        <div className="clearfix"/>
    </div>;
}
