import React from "react";
import {makeDynamicProps} from "../../src/Utils";
import {Article} from "../../src/Model";
import {requestArticles} from "../../src/Network";
import {getUserUUIDFromRequest} from "../../src/userUuid";
import ArticlesPage from "./index";

export async function getServerSideProps({locale, req, res}) {
    const articles = await requestArticles({lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return makeDynamicProps({articles})
}

export default function AllArticlesPage({articles}: { articles: Article[] }) {
    return ArticlesPage({articles});
}

