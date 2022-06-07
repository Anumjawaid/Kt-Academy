import React from "react";
import Header from "../../components/section/Header";
import FooterSection from "../../components/section/FooterSection";
import {makeStaticProps, registerPage} from "../../src/Utils";
import {Book, PublicUser, User} from "../../src/Model";
import {requestUserByKey} from "../../src/Network";
import {BooksGrid} from "../../components/component/BooksGrid";
import {BOOKS} from "../../src/Data";

export async function getStaticProps({locale, req, res}) {
    const books = BOOKS
    const authorsPromises: Promise<PublicUser>[] = books
        .map(b => b.authorKey)
        .filter((value, index, self) => self.indexOf(value) === index) // distinct
        .map(async a => await requestUserByKey(a))
        .filter(u => u)
    const authors = await Promise.all(authorsPromises)
    return makeStaticProps({books, authors})
}

export default function BooksPage({books, authors}: { books: Book[], authors: User[] }) {
    registerPage("articles")
    return (
        <>
            <Header/>
            <BooksGrid books={books} authors={authors}/>
            <FooterSection/>
        </>
    );
}
