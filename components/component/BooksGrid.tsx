import React from "react";
import {Book, User} from "../../src/Model";
import Link from "../../src/Link";
import {useTranslations} from "../../src/Translations";
import NextLink from "next/link";

export function BooksGrid({books, authors}: { books: Book[], authors: User[] }) {
    const t = useTranslations()
    return <section id="books" style={{paddingTop: "0px"}}>
        <div className="content-container left" style={{maxWidth: "1350px"}}>
            <h2>{t.book.booksTitle}</h2>
            <div style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center"
            }}>
                {books.map(book =>
                    <BookBox book={book} author={authors.find(a => a.publicKey === book.authorKey)}/>
                )}
            </div>
        </div>
    </section>;
}

function BookBox({book, author}: { book: Book, author: User | null }) {
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
                boxSizing: "border-box",
                textAlign: "center"
            }}>
                <NextLink href={`/book/${book.key}`} locale={book.locale}>
                    <a>
                        <img style={{
                            maxHeight: "300px",
                            width: "auto",
                            height: "100%",
                        }} src={book.imageUrl}/>
                    </a>
                </NextLink>
            </div>
            <div style={{padding: "1.25rem",}}>
                <NextLink href={`/book/${book.key}`} locale={book.locale}>
                    <a>
                        <h2 style={{
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            color: "rgb(33, 37, 41)",
                            lineHeight: 1.25,
                            textAlign: "left",
                        }}>
                            {`${book.title} [${book.locale.toUpperCase()}]`}
                        </h2>
                        <h4 style={{
                            fontSize: "0.95rem",
                            fontWeight: 400,
                            color: "rgba(0, 0, 0, .44)",
                            lineHeight: 1.6,
                            textAlign: "left",
                        }}>{book.shortDescription}</h4>
                    </a>
                </NextLink>
            </div>
        </div>
        {author &&
        <div style={{padding: "1.25rem",}}>
            <AuthorBox author={author}/>
        </div>
        }
    </div>
}

function AuthorBox({author}: { author: User }) {
    const t = useTranslations()
    return <div style={{
        fontSize: "0.8rem",
        display: "flex",
        alignItems: "center",
    }}>
                    <span style={{
                        fontSize: ".8rem",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <img src={author.imageUrl} alt={author.displayName} style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "13px",
                            borderRadius: "100%",
                        }}/>
                    </span>
        <span style={{paddingTop: "2px"}}>
            <span style={{color: "rgba(0, 0, 0, .44)", fontSize: "14.4px !important",}}>
                {t.book.authorSmall}
            </span>
            <br/>
            <span className="article-name">
                <Link to={`/user/${author.publicKey}`} style={{
                    color: "rgba(0, 0, 0, .8) !important",
                    fontSize: "15px !important",
                }}>{author.displayName}</Link>
            </span>
        </span>
    </div>;
}