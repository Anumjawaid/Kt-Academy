import React, {CSSProperties} from "react";
import {Article} from "../../src/Model";
import Link from "../../src/Link";
import {AuthorBox} from "./AuthorBox";

type ArticlesGridProps = {
    title?: string,
    articles: Article[],
    showAuthor?: boolean,
    style?: CSSProperties
}

export function ArticlesGrid({title, articles, showAuthor = true, style}: ArticlesGridProps) {
    return <section id="articles" style={{...style}}>
        <div className="content-container left" style={{maxWidth: "1350px"}}>
            {title && <h2>{title}</h2>}
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between"
            }}>
                {articles.map(article =>
                    <ArticleBox article={article} showAuthor={showAuthor}/>
                )}
            </div>
        </div>
    </section>;
}

function ArticleBox({article, showAuthor}: { article: Article, showAuthor?: boolean }) {
    return <div style={{
        width: "340px",
        borderColor: "#000",
        border: "1px solid #ccc",
        borderStyle: "solid",
        margin: "10px",
    }}>
        <div style={{height: "460px"}}>
            <div style={{
                maxHeight: "300px",
                overflow: "hidden",
                boxSizing: "border-box"
            }}>
                <Link to={`/article/${article.key}`}>
                    <img style={{
                        width: "100%",
                        height: "auto",
                    }} src={article.thumbnailUrl}/>
                </Link>
            </div>
            <div style={{padding: "1.25rem",}}>
                <Link to={`/article/${article.key}`}>
                    <h2 style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "rgb(33, 37, 41)",
                        lineHeight: 1.25,
                        textAlign: "left",
                    }}>
                        {article.title}
                    </h2>
                    <h4 style={{
                        fontSize: "0.95rem",
                        fontWeight: 400,
                        color: "rgba(0, 0, 0, .44)",
                        lineHeight: 1.6,
                        textAlign: "left",
                    }}>{article.shortDescription}</h4>
                </Link>
            </div>
        </div>
        {article.author && showAuthor &&
        <div style={{padding: "1.25rem",}}>
            <AuthorBox author={article.author} publicationDate={article.publicationDate}/>
        </div>
        }
    </div>
}

