import {
    AddComment,
    Article, ArticleDetails,
    Challenge,
    ChallengeStatus,
    CommentsCollection,
    Course,
    DayStatisticsJson,
    EditComment,
    GeneralStatistics,
    PublicUser,
    RecommendationCollection,
    RecommendationData,
    SocialMediaDefinition,
    User, UserArticles,
    Workshop,
    WorkshopSubmission
} from "./Model";
import {getUserUUID} from "./userUuid";

// export const API_URL = "http://0.0.0.0:8080/"
export const API_URL = "https://api.kt.academy/"
// export const API_URL = "https://gapi.kt.academy/"
// export const API_URL = "https://kt-academy.herokuapp.com/"

export const STATISTICS_URL = "https://kt-academy-statistics.herokuapp.com/"

type ApiCallParams = {
    lang?: string,
    urlParams?: Record<string, string | null>,
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    body?: any,
    parseResult?: boolean,
    userUuid?: string,
    baseUrl?: string
}

export function requestApi<T>(path: string, params: ApiCallParams = {}): Promise<T> {
    return buildFetch(path, params)
        .then(res => res.json())
}

export function callApi(path: string, params: ApiCallParams = {}): Promise<Response> {
    return buildFetch(path, params)
}

function removeEmptyValues(obj) {
    if (typeof obj !== "object") return
    Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
}

export class HttpError extends Error {
    private readonly _code: number;
    private readonly _statusText: string;

    constructor(code: number, statusText: string, message: string) {
        super(message);
        this._code = code;
        this._statusText = statusText;

        Object.setPrototypeOf(this, HttpError.prototype);
    }

    get code(): number {
        return this._code;
    }

    get statusText(): string {
        return this._statusText;
    }
}

async function buildFetch(
    path: string,
    {lang, urlParams, method, body, userUuid, baseUrl = API_URL}: ApiCallParams = {}
): Promise<Response> {
    if (lang) {
        if (urlParams) {
            urlParams = {...urlParams, lang: lang.toUpperCase()};
        } else {
            urlParams = {lang: lang.toUpperCase()};
        }
    }

    removeEmptyValues(urlParams);
    const search = buildQuery(urlParams);

    const response = await fetch(baseUrl + path + search, {
        headers: {
            "Content-Type": "application/json",
            userUuid: userUuid ?? getUserUUID() ?? "null"
        },
        ...(method && {method: method}),
        ...(body &&
            ((typeof body === "string" && {body: body}) || {
                body: JSON.stringify(body)
            }))
    });
    if (response.ok) {
        return response;
    } else {
        throw new HttpError(
            response.status,
            response.statusText,
            await response.text()
        );
    }
}

function buildQuery(urlParams: Record<string, string | null> | undefined) {
    return urlParams ? ("?" + Object.keys(urlParams)
        .map(key => key + '=' + urlParams[key])
        .join('&')) : "";
}

export function saveUserChallenge(challengeKey: string, body: { code?: string, status?: ChallengeStatus }): Promise<Response> {
    return callApi("challenge/" + challengeKey, {
        method: "PUT",
        body: JSON.stringify(body)
    })
}

export function requestChallenge(challengeKey: string, params: ApiCallParams = {}): Promise<Challenge | null> {
    return requestApi<Challenge | null>(`challenge/${challengeKey}`, params)
}

export function requestUserByKey(userKey: string, params: ApiCallParams = {}): Promise<PublicUser | null> {
    try {
        return requestApi<User | null>(`user/key/${userKey}`, params)
    } catch (e) {
        return promiseWith(null)
    }
}

export function requestUserArticles(userKey: string, params: ApiCallParams = {}): Promise<UserArticles> {
    return requestApi<UserArticles>(`article/user/${userKey}`, params)
}

export function requestCurrentUser(params: ApiCallParams = {}): Promise<User | null> {
    return requestApi<User | null>("user/me", params)
}

export function requestUsersList(params: ApiCallParams = {}): Promise<User[]> {
    return requestApi<User[]>("user", params)
}

export function requestUserById(userId: string, params: ApiCallParams = {}): Promise<User> {
    return requestApi<User>("user/id/" + userId, params)
}

export function requestTrainers(params: ApiCallParams = {}): Promise<User[]> {
    return requestApi<User[]>("trainer", params)
}

export function requestStatistics(): Promise<GeneralStatistics> {
    return requestApi<GeneralStatistics>("statistics", {baseUrl: STATISTICS_URL})
}

export function requestArticleStatistics(): Promise<GeneralStatistics> {
    return requestApi<GeneralStatistics>("statistics/articles", {baseUrl: STATISTICS_URL})
}

export function requestPageStatistics(pageKey: string, params: ApiCallParams = {}): Promise<GeneralStatistics> {
    return requestApi<GeneralStatistics>(`statistics/${pageKey}`, {...params, baseUrl: STATISTICS_URL})
}

export function requestDayStatistics(day: string, params: ApiCallParams = {}): Promise<DayStatisticsJson> {
    return requestApi<DayStatisticsJson>(`statistics/day/${day}`, {...params, baseUrl: STATISTICS_URL})
}

export function postPageLoad(pageKey: string) {
    callApi("page-load", {method: "POST", body: {pageKey: pageKey}, baseUrl: STATISTICS_URL})
}

export type PatchUserSelfRequest = {
    customImageUrl?: string | null, // Empty means removing
    publicKey?: string | null, // Empty means removing
    displayName?: string | null, // Empty means removing
    bio?: string | null,
    bioPl?: string | null,
    socialMedia?: SocialMediaDefinition | null
}

export function patchUserSelf(body: PatchUserSelfRequest): Promise<Response> {
    return callApi("user/me", {
        method: "PATCH",
        body: body
    })
}

export function putUserAdmin(userId: string, body: { tags: string[] }): Promise<Response> {
    return callApi("user/" + userId, {
        method: "PUT",
        body: body,
    })
}

export function acceptTrainerAdmin(userId: string): Promise<Response> {
    return callApi(`user/${userId}/trainer/accept`, {
        method: "POST",
    })
}

export function requestCourse(courseKey: string, params: ApiCallParams = {}): Promise<Course> {
    return requestApi<Course>(`course/${courseKey}`, params)
}

export function requestCourses(params: ApiCallParams = {}): Promise<Course[]> {
    return requestApi<Course[]>(`course`, params)
}

export function changeCourseStepVideoStatus(stepKey: string, state: ChallengeStatus): Promise<Response> {
    return callApi(`challenge/${stepKey}/video/${state}`, {
        method: "PATCH"
    })
}

export function requestWorkshopSubmissionsList(): Promise<WorkshopSubmission[]> {
    return requestApi<WorkshopSubmission[]>("workshop/submission")
}

export function changeWorkshopSubmission(submissionId: string, body: { status: string }): Promise<Response> {
    return callApi("workshop/submission/" + submissionId, {
        method: "PUT",
        body: JSON.stringify(body)
    })
}

export function requestVideoRecommendations(): Promise<RecommendationCollection> {
    return requestApi<RecommendationCollection>("recommendation/video/")
}

export function callAddRecommendation(body: { key: string, data: RecommendationData }): Promise<RecommendationCollection> {
    return requestApi<RecommendationCollection>("recommendation/video/", {
        body: body,
        method: "POST"
    })
}

export type AddRatingBody = { rating?: number, blocked?: boolean, favourite?: boolean };

export function callAddRating(recommendationKey: string, body: AddRatingBody): Promise<RecommendationCollection> {
    return requestApi<RecommendationCollection>("recommendation/video/" + recommendationKey, {
        body: body,
        method: "PUT"
    })
}

export function sendFeedback(pageKey: string, feedback: string | undefined): Promise<Response> {
    return callApi("feedback", {
        body: {
            type: "PRIVATE",
            pageKey: pageKey,
            comment: feedback
        },
        method: "POST"
    })
}

export function requestWorkshop(workshopKey: string, params: ApiCallParams = {}): Promise<Workshop> {
    return requestApi("workshop/" + workshopKey, params)
}

export function requestWorkshops(params: ApiCallParams & { trainer?: string, tag?: string } = {}): Promise<Workshop[]> {
    return requestApi("workshop", {...params, urlParams: {trainer: params.trainer, tag: params.tag}})
}

export function requestWorkshopsAdminList(params: ApiCallParams): Promise<Workshop[]> {
    return requestApi("workshop/adminList", params)
}

export function requestArticle(articleKey: string, params: ApiCallParams = {}): Promise<ArticleDetails> {
    return requestApi("article/" + articleKey, params)
}

export async function requestArticleOrNull(articleKey: string, params: ApiCallParams = {}): Promise<ArticleDetails | null> {
    try {
        return requestArticle(articleKey, params)
    } catch (e) {
        return null
    }
}

export function requestArticles(params: ApiCallParams = {}): Promise<Article[]> {
    return requestApi("article", params)
}

export function registerUser(googleToken: string): Promise<User> {
    const searchParams = new URLSearchParams(window.location.search)
    return requestApi('/user/google', {
        method: "POST",
        body: {
            googleToken: googleToken,
            userId: searchParams.has("userId") ? searchParams.get("userId") : null,
            workshopGroupAccessKey: searchParams.has("workshopGroupAccessKey") ? searchParams.get("workshopGroupAccessKey") : null,
        },
        userUuid: getUserUUID(),
    })
}

export const NEWSLETTER_NAME = "KT_ACADEMY"

export function requestAllowNewsletter(allow: boolean, newsletterName: string = NEWSLETTER_NAME): Promise<User> {
    const allowNewsletters = {}
    allowNewsletters[newsletterName] = allow
    return requestApi('/user/me', {
        method: "PATCH",
        body: {
            allowNewsletters: allowNewsletters
        },
        userUuid: getUserUUID(),
    })
}

export function requestDeleteUser() {
    return callApi('/user', {
        method: "DELETE",
        userUuid: getUserUUID(),
    })
}

export function requestSignOutUser() {
    return callApi('/user/logout', {
        method: "DELETE",
        userUuid: getUserUUID(),
    })
}

export function requestComments(collectionKey: string, params: ApiCallParams = {}): Promise<CommentsCollection> {
    return requestApi("comment/" + collectionKey, params)
}

export function requestAddComment(collectionKey: string, body: AddComment, params: ApiCallParams = {}): Promise<CommentsCollection> {
    return requestApi("comment/" + collectionKey, {
        method: "POST",
        body: body,
        ...params
    })
}

export function requestEditComment(collectionKey: string, body: EditComment, params: ApiCallParams = {}): Promise<CommentsCollection> {
    return requestApi("comment/" + collectionKey, {
        method: "PUT",
        body: body,
        ...params
    })
}

export function requestDeleteComment(collectionKey: string, commentId: string, params: ApiCallParams = {}): Promise<CommentsCollection> {
    return requestApi("comment/" + collectionKey + "/" + commentId, {
        method: "DELETE",
        ...params
    })
}

export function postForm(body: any) {
    return callApi('form', {
        method: "POST",
        body: body
    })
}

function promiseWith<T>(value: T): Promise<T> {
    return new Promise((resolutionFunc) => {
        resolutionFunc(value);
    });
}
