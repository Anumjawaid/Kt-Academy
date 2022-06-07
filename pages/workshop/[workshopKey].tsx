import {makeStaticPaths, makeStaticProps, registerPage} from "../../src/Utils";
import React from "react";
import {useTranslations} from "../../src/Translations";
import FooterSection from "../../components/section/FooterSection";
import {User, Workshop} from "../../src/Model";
import Header, {LinkTo} from "../../components/section/Header";
import {TitledSection} from "../../components/section/TitledSection";
import KnowledgeSourcesSection from "../../components/section/workshop/KnowledgeSourcesSection";
import WorkshopDetailsSection from "../../components/section/workshop/WorkshopTocSection";
import {RegistrationSection} from "../../components/section/workshop/RegistrationSection";
import JetbrainsCertificationSection from "../../components/section/workshop/JetbrainsCertificationSection";
import AuthorProfileSection from "../../components/section/AuthorProfileSection";
import MaterialsSection from "../../components/section/workshop/MaterialsSection";
import {requestUserByKey, requestWorkshop, requestWorkshops} from "../../src/Network";
import MediaHeaders from "../../components/MediaHeaders";
import {Width} from "../../components/section/Banner";

export async function getStaticProps({params, locale}) {
    const workshop = await requestWorkshop(params.workshopKey, {lang: locale})
    const trainerKey = workshop?.trainer?.key;
    const trainer = trainerKey ? await requestUserByKey(trainerKey, {lang: locale}) : null
    return makeStaticProps({workshop, trainer})
}

export async function getStaticPaths({locale}) {
    const workshops = await requestWorkshops({lang: locale})
    const workshopKeys = workshops.map(w => ({workshopKey: w.key}))
    return makeStaticPaths(locale, workshopKeys)
}

export default function WorkshopPage({workshop, trainer}: { workshop: Workshop, trainer: User | null }) {
    registerPage(`workshop-${workshop.key}`)
    const t = useTranslations()
    const HeaderBg = getHeader(workshop?.key)

    const menuLinks: LinkTo[] = [
        {text: t.menu.workshopMaterial, to: "#workshop-TOC"},
        ...(workshop.trainer ? [{text: t.menu.trainer, to: "#trainer"}] : []),
        ...(workshop.materials ? [{text: t.menu.materials, to: "#materials"}] : []),
        {text: t.menu.register, to: "#register", divider: true},
    ]

    let bannerOptions = {
        img: HeaderBg,
        title: workshop.name,
        width: Width.Half,
        ...(workshop.subtitle && {subtitle: workshop.subtitle}),
        button: {
            text: t.workshopPage.registration.title,
            to: "#register"
        }
    };

    return (
        <>
            <MediaHeaders
                title={workshop.name}
                description={workshop.shortDescription}
                keywords={workshop.metaKeywords}
                image={getPromotionImageUrl(workshop.key)}
            />

            <Header links={menuLinks} banner={bannerOptions}
                    allowedLangs={workshop.langVariants.map(w => w.toLowerCase())} addMediaHeader={false}/>

            <KnowledgeSourcesSection workshop={workshop}/>

            <WorkshopDetailsSection workshop={workshop}/>

            {workshop.aboutCourseMd &&
            <TitledSection title={t.workshopPage.titleAbout} text={workshop.aboutCourseMd}/>
            }

            {workshop.howLong &&
            <TitledSection title={t.workshopPage.titleHowLong} text={workshop.howLong}/>
            }

            {workshop.requirements &&
            <section className="requirements short-section short-list">
                <div className="content-container short-content-container">
                    <h1>{t.workshopPage.titleRequirements}</h1>
                    <ul>
                        {workshop.requirements.map((requirement, index) =>
                            <li key={index}>{requirement}</li>
                        )}
                    </ul>
                </div>
            </section>
            }

            {trainer &&
            <AuthorProfileSection title={t.whyUs.bestTitle} titleIcon="far fa-thumbs-up" user={trainer} bioOverride={t.workshopPage.trainerBio[trainer.publicKey]}/>
            }

            {workshop.certifiedByJb &&
            <JetbrainsCertificationSection/>
            }

            {workshop.materials && (workshop.materials.book || workshop.materials.printed || workshop.materials.online) &&
            <MaterialsSection workshopKey={workshop.key} materials={workshop.materials}/>
            }

            <RegistrationSection workshop={workshop}/>

            <FooterSection/>
        </>
    );
}

function getHeader(workshopKey?: string) {
    switch (workshopKey) {
        case "android":
            return "/background-img/2-1920x702.png"
        case "backend":
            return "/background-img/6-1920x702.png"
        case "effectiveKotlin":
            return "/background-img/3-1920x702.png"
        case  "refactoringToCleanCode":
            return "/background-img/3-1920x702.png"
        case "coroutines":
            return "/background-img/9-1920x702.png"
        default:
            return "/background-img/6-1920x702.png"
    }
}

function getPromotionImageUrl(workshopKey?: string) {
    switch (workshopKey) {
        case "android":
            return "/background-img/2-1920x702.png"
        case "backend":
            return "/background-img/6-1920x702.png"
        case "effectiveKotlin":
            return "/background-img/3-1920x702.png"
        case  "refactoringToCleanCode":
            return "/background-img/3-1920x702.png"
        case "coroutines":
            return "/background-img/9-1920x702.png"
        default:
            return "/background-img/6-1920x702.png"
    }
}
