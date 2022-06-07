import {useTranslations} from "../../src/Translations";

type BadgesProps = {
    user: { tags: string[] }
};

export function BadgesSection({user}: BadgesProps) {
    const passedExam = user.tags.includes("PASSED_KOTLIN_EXAM");
    const workshopAttendee = user.tags.includes("KOTLIN_WORKSHOP_ATTENDEE");
    const ekReviewer = user.tags.includes("EFFECTIVE_KOTLIN_REVIEWER");
    const blogAuthor = user.tags.includes("BLOG_AUTHOR");
    const hasAnyBadge = passedExam || workshopAttendee || ekReviewer || blogAuthor
    const t = useTranslations()
    return <>
        {hasAnyBadge &&
        <div>
            <h2>{t.user.achievements.title}</h2>
            <div className="flex-container--row badges-section">
                {passedExam &&
                <Badge imgSrc="/badges/badge_certified_kotlin_developer.png"
                       text={t.user.achievements.kotlinCertified}/>
                }
                {workshopAttendee &&
                <Badge imgSrc="/badges/badge_kotlin_developer_1.png" text={t.user.achievements.kotlinDeveloper}/>
                }
                {ekReviewer &&
                <Badge imgSrc="/badges/badge_reviewer.png" text={t.user.achievements.ekReviewer}/>
                }
                {blogAuthor &&
                <Badge imgSrc="/badges/badge_author.png" text={t.user.achievements.author}/>
                }
            </div>
        </div>
        }
    </>;
}

const Badge = ({text, imgSrc}: { text: string, imgSrc: string }) =>
    <div className="flex-item flex-item-paddings flex-container--column badge-container">
        <img className="badge-img" src={imgSrc}/>
        <p className="badge-text">{text}</p>
    </div>;
