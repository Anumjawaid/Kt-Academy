import React from "react";
import {Article, Book, User} from "../../src/Model";
import Header from "../../components/section/Header";
import FooterSection from "../../components/section/FooterSection";
import {makeStaticPathsWithLocales, makeStaticProps} from "../../src/Utils";
import MediaHeaders from "../../components/MediaHeaders";
import {requestArticles, requestUserByKey} from "../../src/Network";
import UserProfileSection from "../../components/section/AuthorProfileSection";
import {ArticlesGrid} from "../../components/component/ArticlesGrid";
import {BOOKS} from "../../src/Data";
import {useTranslations} from "../../src/Translations";
import {UpdatesSection} from "../../components/section/UpdatesSection";
import {AboutPageSection} from "../../components/section/AboutPageSection";
import {GenericSections} from "../../components/page/GenericPage";

export async function getStaticProps({params}) {
    const bookKey = params.bookKey
    const book = BOOKS.find(book => book.key === bookKey)
    const articles = (await requestArticles({
        lang: book.locale,
        urlParams: {
            order: "NATURAL",
            series: book.articleSeries
        }
    }))
    const author = await requestUserByKey(book.authorKey)
    return makeStaticProps({book, articles, author})
}

export async function getStaticPaths() {
    const bookKeys = BOOKS.map(w => ({bookKey: w.key}))
    return makeStaticPathsWithLocales(bookKeys)
}

export default function BookPage({book, articles, author}: { book: Book, articles: Article[], author: User | null }) {
    const t = useTranslations();
    return <>
        <MediaHeaders
            title={book.title}
            description={book.description}
            image={book.imageUrl}
        />
        <Header allowedLangs={[book.locale]} addMediaHeader={false}/>

        <AboutPageSection
            title={book.title}
            subtitle={book.subtitle}
            text={book.description}
            actions={book.actions}
            imageUrl={book.imageUrl}/>

        <GenericSections sections={book.sections} firstIndex={1} />

        {author &&
        <UserProfileSection title={t.book.author} user={author}/>
        }

        <ArticlesGrid title={t.book.sharedChapters} articles={articles} showAuthor={false}/>

        {book.updates &&
        <UpdatesSection updates={book.updates}/>
        }

        <FooterSection/>
    </>;
}