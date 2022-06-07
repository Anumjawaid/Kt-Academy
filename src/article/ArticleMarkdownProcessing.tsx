import {Article, ArticleDetails, ArticleSeries} from "../Model";

export function enrichText(article: ArticleDetails): string {
    const series = article.series;
    const seriesInfo = getSeriesInfo(series)
    const content = addBanners(removeTitle(article.contentMd), series, article.author.publicKey)

    return `![article banner (priority)](${article.thumbnailUrl})

# ${article.title}

${seriesInfo}
    
${content}`
}

function getSeriesInfo(series: ArticleSeries): string {
    switch (series) {
        case "JS_OD_PODSTAW":
            return "> Cześć! To jest fragment książki [JavaScript od podstaw](/book/js), która ma pomóc w nauce programowania od zera."
        case "EFFECTIVE_KOTLIN":
            return "> This is a chapter from the book [Effective Kotlin](/book/effectivekotlin). You can find it on [LeanPub](https://leanpub.com/effectivekotlin) or [Amazon](https://www.amazon.com/Effective-Kotlin-practices-Marcin-Moskala/dp/8395452837/ref=sr_1_1?dchild=1&keywords=effective+kotlin&qid=1615033955&sr=8-1)."
        case "KOTLIN_COROUTINES":
            return "> This is a chapter from the book [Kotlin Coroutines](/book/coroutines). You can find it on [LeanPub](https://leanpub.com/coroutines/)."
        case "FEATURE_ENGINEERING":
            return "> This is a chapter from the book [Feature Engineering and Feature Selection with Python](https://leanpub.com/feature-engineering-and-feature-selection-with-python). You can find it on [LeanPub](https://leanpub.com/feature-engineering-and-feature-selection-with-python/)."
        default:
            return ""
    }
}

function removeTitle(contentMd: string): string {
    if (contentMd.trim()[0] != "#") {
        return contentMd
    } else {
        return contentMd
            .replace(/(#+.*\n)/, '');
    }
}

function addBanners(contentMd: string, series: string, authorKey: string): string {
    switch (series) {
        case "JS_OD_PODSTAW":
            return contentMd
        case "EFFECTIVE_KOTLIN":
            return addBannersEvery(contentMd, 4, [
                "[![](/images/banners/ek_blue.jpg)](https://leanpub.com/effectivekotlin/)",
                "[![](/images/banners/follow_marcinmoskala.png)](https://twitter.com/marcinmoskala)",
                "[![](/images/banners/we_teach_programming.png)](/workshop)",
                // "[![](/images/banners/clean_code_workshop.png)](/workshop/refactoringToCleanCode)",
                "[![](/images/banners/coroutines_workshop.png)](/workshop/coroutines)",
                "[![](/images/banners/ek_orange.jpg)](https://leanpub.com/effectivekotlin/)",
                "[![](/images/banners/follow_kta.png)](https://twitter.com/ktdotacademy)",
                "[![](/images/banners/ek_workshop.png)](/workshop/effectiveKotlin)",
                // "[![](/images/banners/patterns_workshop.png)](/workshop/refactoringToPatterns)",
                "[![](/images/banners/we_teach_programming.png)](/workshop)",
                "[![](/images/banners/newsletter.png)](https://kotlin-academy.us17.list-manage.com/subscribe?u=5d3a48e1893758cb5be5c2919&id=d2ba84960a)",
            ])
        case "KOTLIN_COROUTINES":
            return addBannersEvery(contentMd, 3, [
                "[![](/images/banners/coroutines_workshop.png)](/workshop/coroutines)",
                "[![](/images/banners/follow_marcinmoskala.png)](https://twitter.com/marcinmoskala)",
                "[![](/images/banners/we_teach_programming.png)](/workshop)",
                ...(new Date() < new Date(2022, 6, 13) ? ["[![](/images/banners/coroutines_06_2022.png)](/workshop/coroutines#register)"] : []),
                "[![](/images/banners/coroutines_book.jpg)](/book/coroutines)",
                "[![](/images/banners/follow_kta.png)](https://twitter.com/ktdotacademy)",
            ])
        case "PERSISTENT_MEMORY":
            return addBannersEvery(contentMd, 2, [
                "[![](/images/banners/write_to_kasia.png)](https://kt.academy/#contact)",
                "[![](/images/banners/tech_lessons_in.png)](https://tech-lessons.in/)",
            ])
        case "FEATURE_ENGINEERING":
            return addBannersEvery(contentMd, 2, [
                "[![](/images/banners/feature_engineering_author_website.png)](https://www.charfaouiyounes.com/)",
                "[![](/images/banners/feature_engineering_book.png)](https://leanpub.com/feature-engineering-and-feature-selection-with-python )",
            ])
        default:
            switch (authorKey) {
                case "mesutdurukal":
                    return addBannersEvery(contentMd, 1, [
                        "[![](/images/banners/Mesut.png)](/workshop?trainerKey=mesutdurukal)",
                    ])
            }
            return contentMd
    }
}

// Add banners before titles or in the end.
// Banners are distributed fairly, considering only the number of titles.
function addBannersEvery(contentMd: string, splits: number, banners: string[]): string {
    if (splits === 0 || banners.length === 0) {
        return contentMd
    }
    const titleRegex = /#{2,3}/gm
    const countTitles = (contentMd.match(titleRegex) || []).length
    const numberOfSplitPoints = countTitles + 1 // the extra one if for the end of the article
    const splitsTable = findSplits(numberOfSplitPoints, splits)
    const startIndex = Math.floor(banners.length * Math.random())
    let titleNum = 1 // The title is skipped anyway
    let bannerNum = 0
    const nextBanner = () => banners[(startIndex + bannerNum++) % banners.length]
    contentMd = contentMd.replace(titleRegex, (match) => {
        if (splitsTable.includes(titleNum++)) {
            return nextBanner() + "\n\n" + match
        }
        return match
    })
    if (splitsTable[splitsTable.length - 1] === numberOfSplitPoints) {
        contentMd = contentMd + "\n\n" + nextBanner()
    }
    return contentMd
}


function findSplits(titles, splits) {
    const bannerEvery = Math.ceil(titles / (splits + 1))
    const ret = []
    for (let i = bannerEvery; i <= titles; i += bannerEvery) {
        ret.push(i)
        if (ret.length === splits) {
            return ret
        }
    }
    return ret
}

// findSplits(1, 1) // [1]
// findSplits(2, 2) // [1, 2]
// findSplits(3, 1) // [2]
// findSplits(5, 1) // [3]
// findSplits(5, 2) // [2, 4]
// findSplits(6, 2) // [2, 4]
// findSplits(7, 3) // [2, 4, 6]
