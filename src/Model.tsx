import {isBrowser} from "./Utils";
import {useRouter} from "next/router";
import {Lang} from "./Translations";
import {GenericSection} from "../components/page/GenericPage";

export type Trainer = {
    key: string
    promotionVideos?: Video[] | null
};

export type Video = {
    ytCode: string
    posterImg: string
};

export type Workshop = {
    key: string
    lang: string
    name: string
    programmingLevel: ProgrammingLevel
    subtitle: string | null
    shortDescription: string
    metaKeywords: string
    description: string
    requirements: string[] | null
    tocMd: string
    aboutCourseMd: string | null
    icon: string
    certifiedByJb: boolean
    trainer: Trainer | null
    tags: string[]
    howLong: string | null
    basePrice: BasePrice
    langVariants: string[]
    materials: Materials | null
    knowledgeSources: KnowledgeSource[]
    plannedPublicWorkshops: PublicWorkshop[],
    visibility: WorkshopVisibility,
    ownerIds: string[],
};

export type WorkshopVisibility = "PUBLIC" | "PROTECTED"

export type KnowledgeSource = {
    key: string
    iconCss: string
    text: TranslatedText
}

export type PublicWorkshop = {
    key: string
    workshopLang: string
    workshopKey: string
    location: string
    timeDesc: string
    startDate: string
    endDate: string
}

export type TranslatedText = {
    text: string | null
    translationKey: string | null
}

export type ProgrammingLevel = "OPEN" | "BEGINNER" | "ADVANCED"

export type Materials = {
    online: boolean
    printed: boolean
    book: boolean
}

export type BasePrice = {
    key: string
    company: Money | null
    companyPl: Money | null
    person: Money | null
    personPl: Money | null
    daysNumber: number
};

export type Currency = "EUR" | "PLN" | "USD"

export type Money = {
    amount: string
    currency: Currency
};

export function printMoney(money: Money): string {
    switch (money.currency) {
        case "EUR":
            return `${money.amount}\xa0EUR`
        case "PLN":
            return `${money.amount}\xa0zł`
        default:
            return `${money.amount}\xa0${money.currency}`
    }
}

export type User = {
    id: string
    publicKey: string
    displayName: string
    email: string
    name: string
    surname: string
    bio: string | null
    bioPl: string | null
    createdAt: string
    imageUrl: string
    customImageUrl: string
    googleToken: string | null
    newsletters: string[]
    tags: string[],
    socialMedia: SocialMediaDefinition,
    trainer: TrainerDefinition | null,
    trainerProposition: TrainerDefinition | null,
    ownerIds: string[],
};

export function isAdmin(user: User): boolean {
    return !!(isBrowser() && user !== null && user && user.tags && user.tags.includes("ADMIN"))
}

export type PublicUser = {
    publicKey: string
    displayName: string
    bio: string | null
    bioPl: string | null
    imageUrl: string
    tags: string[],
    socialMedia: SocialMediaDefinition,
    trainer: TrainerDefinition | null,
}

export type SocialMediaDefinition = {
    websiteUrl?: string | null,
    twitter?: string | null,
    github?: string | null,
    linkedin?: string | null,
}

export type TrainerDefinition = {
    rates: TrainerRatesDefinition,
    topics: string[],
    description: string,
    experienceDescription: string,
    shortDescription: string,
    promotionVideos?: Video[] | null
}

export type TrainerRatesDefinition = {
    privateConsultationsPerHour: Money | null,
    companyConsultationsPerDay: Money | null,
}

export function useBio(user: { bio: string | null, bioPl: string | null }): string {
    const router = useRouter()
    const isPl = router.locale === Lang.PL
    return isPl ? nullIfBlank(user.bioPl) ?? user.bio : nullIfBlank(user.bio) ?? user.bioPl
}

function nullIfBlank(value: string | null | undefined): string {
    return value && value.trim().length > 0 ? value : null
}

export type Challenge = {
    key: string
    title: string
    codeTests: string
    code: string
    originalCode: string
    description: string
    status: ChallengeStatus
};

export type ChallengeStatus = "INITIAL" | "STARTED" | "SOLVED"

export type WorkshopSubmission = {
    id: string
    timestamp: string
    workshopKey: string
    submissionType: string
    lang: string
    data: string
    status: WorkshopSubmissionStatus
};

export type WorkshopSubmissionStatus =
    "SUBMITTED"
    | "CONTACTED"
    | "CONFIRMED"
    | "WAITING"
    | "FINISHED"
    | "OUTDATED"
    | "SPAM";

export type Course = {
    key: string
    name: string
    description: string
    steps: CourseStep[]
    state: CourseState
}

export type CourseState = "LOCKED" | "FINISHED" | "READY" | "STARTED" | null;

export type CourseStep = {
    title: string
    type: CourseStepType
    key: string
    state: CourseState
}

export function getLink(courseKey: string, step: CourseStep): string | null {
    if (step.state === "LOCKED") {
        return null
    }
    switch (step.type) {
        case "CHALLENGE":
            return `/course/${courseKey}/challenge/${step.key}`
        case "VIDEO":
            return `/course/${courseKey}/video/${step.key}`
        case "LINK":
            return step.key
    }
    console.log("Illegal type", step.type)
    return null
}

export type CourseStepType = "CHALLENGE" | "VIDEO" | "LINK"

export type RecommendationCollection = {
    collectionKey: string
    elements: RecommendationElement[]
}

export type RecommendationElement = {
    key: string
    data: RecommendationData
    yourRating: number | null
    averageRating: number
    ratingsNum: number
    blocked: boolean
    favourite: boolean
    tags: string[] | null
}

export type RecommendationData = {
    title: string
    url: string
    img: string
};

export type GeneralStatistics = {
    perPage: GeneralPageStatistics[]
    perDay: GeneralDayStatisticsJson[]
}

export type GeneralDayStatisticsJson = {
    date: string
    viewsCount: number
    usersCount: number | null
}

export type GeneralPageStatistics = {
    pageKey: string
    last30DaysViewsCount: number
    last30DaysUsersCount: number
    lastYearViewsCount: number | null
    lastYearUsersCount: number | null
}

export type DayStatisticsJson = {
    perPage: DayPageStatisticsJson[]
}

export type DayPageStatisticsJson = {
    pageKey: string,
    viewsCount: number
    usersCount: number
}

export type StatisticsDataPoint = {
    day: string
    amount: number
}

export type Article = {
    key: string
    title: string
    shortDescription: string
    author: User
    thumbnailUrl: string
    visibility: ArticleVisibility
    series: ArticleSeries
    publicationDate: string | null
    reviewers: User[]
}

export type UserArticles = {
    authored: Article[],
    reviewed: Article[],
}

export type ArticleDetails = {
    key: string
    title: string
    contentMd: string
    shortDescription: string
    author: User
    thumbnailUrl: string
    visibility: ArticleVisibility
    series: ArticleSeries
    publicationDate: string | null
    reviewers: User[]
    prev: { key: string } | null
    next: { key: string } | null
}

export type ArticleSeries =
    "JS_OD_PODSTAW" |
    "PYTHON_OD_PODSTAW" |
    "EFFECTIVE_KOTLIN" |
    "KOTLIN_PROGRAMMER_DICTIONARY" |
    "KOTLIN_COROUTINES" |
    "FEATURE_ENGINEERING"

export type ArticleVisibility =
    "PUBLIC" |
    "PROTECTED" |
    "PRIVATE"

export type Book = {
    key: string
    title: string
    imageUrl: string
    locale: string
    articleSeries: ArticleSeries
    subtitle?: string
    description: string
    shortDescription: string
    actions: BookAction[]
    sections: GenericSection[],
    authorKey: string,
    updates?: BookUpdate[]
}

export type BookAction = {
    text: string
    href: string
    icon?: string
    social?: boolean
}

export type BookUpdate = {
    title: string
    date: string
    text: string
}

export type CommentsCollection = {
    collectionKey: string
    elements: CommentElement[]
}

export type CommentElement = {
    id: string,
    collectionKey: string,
    user: PublicUser,
    comment: string | null,
    date: string,
}

export type AddComment = {
    comment: string | null,
}

export type EditComment = {
    id: string,
    comment: string | null,
}
