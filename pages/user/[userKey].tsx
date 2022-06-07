import React from "react";
import {printMoney, PublicUser, useBio, UserArticles} from "../../src/Model";
import Header from "../../components/section/Header";
import FooterSection from "../../components/section/FooterSection";
import {BadgesSection} from "../../components/component/BadgesSection";
import {requestUserArticles, requestUserByKey} from "../../src/Network";
import {getUserUUIDFromRequest} from "../../src/userUuid";
import {makeDynamicProps} from "../../src/Utils";
import MediaHeaders from "../../components/MediaHeaders";
import {UserImage} from "../../components/component/UserImage";
import ReactMarkdown from "react-markdown";
import {SocialMediaIcons} from "../../components/component/SocialMediaIcons";
import {Lang, useTranslations} from "../../src/Translations";
import Link from "../../src/Link";
import {ArticlesGrid} from "../../components/component/ArticlesGrid";

export async function getServerSideProps({params, locale, req, res}) {
    const userKey = params.userKey;
    const userArticlesAsync = requestUserArticles(userKey)
    const user = await requestUserByKey(userKey, {lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    const userArticles = await userArticlesAsync
    return makeDynamicProps({user, userArticles})
}

export default function UserPage({user, userArticles}: { user: PublicUser, userArticles: UserArticles }) {
    const t = useTranslations();
    const bio = useBio(user)
    const trainer = user.trainer
    const privateConsultationsPerHour = trainer?.rates.privateConsultationsPerHour;
    const companyConsultationsPerDay = trainer?.rates.companyConsultationsPerDay;
    return <>
        <MediaHeaders
            title={user.displayName}
            description={trainer?.description ?? user?.bio ?? ""}
            image={user.imageUrl}
        />
        <Header addMediaHeader={false} allowedLangs={[Lang.EN]}/>
        <div className="content-container">
            <UserImage user={user} userImage={user.imageUrl}/>
            <SocialMediaIcons socialMedia={user.socialMedia}/>

            {bio &&
                <ReactMarkdown className="margin-top-30 text-align-left" source={bio}/>
            }

            {trainer?.description &&
                <ReactMarkdown className="margin-top-30 text-align-left" source={trainer?.description}/>
            }

            {privateConsultationsPerHour &&
                <Link to={`/user/trainer/${user.publicKey}/request/person`}>
                    <div
                        className="button light margin-10">{`Request private consultations (${printMoney(privateConsultationsPerHour)}/h)`}</div>
                </Link>
            }

            {companyConsultationsPerDay &&
                <Link to={`/user/trainer/${user.publicKey}/request/company`}>
                    <div
                        className="button light margin-10">{`Request company consultations (${printMoney(companyConsultationsPerDay)}/day)`}</div>
                </Link>
            }


            {/*<Link to="/user/trainer/form">*/}
            {/*    <div className="button light margin-10">See workshops</div>*/}
            {/*</Link>*/}

            {/*<BadgesSection user={user}/>*/}
        </div>

        {userArticles.authored.length &&
            <ArticlesGrid
                title={t.user.articlesAuthored}
                articles={userArticles.authored}
                showAuthor={false}
                style={{backgroundColor: "white"}}/>
        }

        {userArticles.reviewed.length > 0 &&
            <ArticlesGrid
                title={t.user.articlesReviewed}
                articles={userArticles.reviewed}
                showAuthor={true}
                style={{backgroundColor: "white"}}/>
        }
        <FooterSection/>
    </>;
}