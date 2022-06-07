import {localeToPathPrefix, useLang, useTranslations} from "../src/Translations";
import {printMoney, PublicWorkshop, User, Workshop} from "../src/Model";
import {makeStaticProps, registerPage} from "../src/Utils";
import Header from "../components/section/Header";
import FooterSection from "../components/section/FooterSection";
import TrustedBySection from "../components/section/TrustedBySection";
import ContactSection from "../components/section/ContactSection";
import React, {useMemo} from "react";
import {useWorkshopCategories, WorkshopCategory} from "../src/Data";
import Link from "../src/Link";
import {requestTrainers, requestWorkshops} from "../src/Network";
import {BannerProps, Width} from "../components/section/Banner";
import TrainersSection from "../components/section/TrainersSection";

export async function getStaticProps({locale}) {
    const workshops = await requestWorkshops({lang: locale})
    const trainers = await requestTrainers({lang: locale})
    return makeStaticProps({workshops, trainers})
}

export default function HomePage({workshops, trainers}: { workshops: Workshop[], trainers: User[] }) {
    registerPage("index")
    const t = useTranslations()
    const bannerProps: BannerProps = {
        img: "/background-img/3-1920x1080.png",
        width: Width.Full,
        title: t.slogan.title,
        subtitle: t.slogan.subtitle
    };
    return (
        <>
            <Header banner={bannerProps}/>
            <WorkshopOfferSection workshops={workshops}/>
            <WhyUsSection/>
            <TrustedBySection/>
            <TrainersSection trainers={trainers}/>
            <ContactSection/>
            <FooterSection/>
        </>
    );
}

function WorkshopOfferSection({workshops}: { workshops: Workshop[] }) {
    const t = useTranslations();
    const workshopCategories: WorkshopCategory[] = useWorkshopCategories()
        .filter(category => !!workshops.find(w => w.tags.includes(category.tag)))
    const publicWorkshops = useMemo(() => workshops
            ?.flatMap(w => w.plannedPublicWorkshops.map(pw => {
                return {
                    workshop: w,
                    publicWorkshop: pw
                }
            }))
        , [workshops])

    return (<>
        <section className="workshops-offer section--white" id="workshops-offer">
            <div className="content-container">
                <h1> {t.workshopOffer.title} </h1>
                <p> {t.workshopOffer.subtitle} </p>

                <div className="flex-container--row">
                    {workshopCategories.map(PrivateWorkshopCategory)}
                </div>
            </div>
        </section>
        {publicWorkshops && publicWorkshops.length !== 0 &&
        <section className="workshops-offer section--white" id="workshops-offer">
            <div className="content-container">
                <h1> {t.workshopOffer.publicTitle} </h1>
                <p> {t.workshopOffer.publicSubtitle} </p>
                <div className="flex-container--row">
                    {publicWorkshops.map(PublicWorkshopView)}
                </div>
            </div>
        </section>
        }
    </>);
}

function PrivateWorkshopCategory(wc: WorkshopCategory) {
    const t = useTranslations();
    return <WorkshopOfferMain
        icon={wc.icon}
        title={wc.title}
        desc={wc.desc}
        link={`/workshop#tag-${wc.tag}`}
        buttonText={t.workshopOffer.button}
        key={wc.tag}
    />;
}

function PublicWorkshopView({workshop, publicWorkshop}: {workshop: Workshop, publicWorkshop: PublicWorkshop}) {
    const t = useTranslations();
    const lang = useLang();
    const langKey = lang.key.toUpperCase()
    const workshopLangUpper = publicWorkshop.workshopLang.toUpperCase()
    return <WorkshopOfferMain
        icon={workshop.icon}
        title={workshop.name + (workshopLangUpper !== langKey ? ` [${workshopLangUpper}]` : "")}
        desc={workshop.shortDescription}
        desc2={`${publicWorkshop.startDate}-${publicWorkshop.endDate}, ${publicWorkshop.timeDesc}, ${printMoney((langKey === "PL" ? workshop.basePrice.personPl : workshop.basePrice.person) ?? workshop.basePrice.person ?? workshop.basePrice.personPl!)}`}
        link={`${localeToPathPrefix(publicWorkshop.workshopLang)}/workshop/${workshop.key}#register`}
        buttonText={t.workshopsList.button}
        key={workshop.name}
    />;
}

function WorkshopOfferMain({desc, desc2, icon, title, link, buttonText}: { icon: string, title: string, desc: string, desc2?: string, link: string, buttonText: string }) {
    const style = {
        minWidth: '40%',
    };

    return <div key={title} className="flex-item flex-item-paddings flex-container--column margin-right-20 wow zoomIn" style={style}>
        <i className={icon + " big-icon"}/>
        <h3> {title} </h3>
        <p> {desc} </p>
        {desc2 && <p> {desc2} </p>}
        <Link to={link} className="button">
            {buttonText}
        </Link>
    </div>
}

function WhyUsSection() {
    const t = useTranslations();
    return (<section className="why-us padding-top-0" id="why-us">
        <div className="gradient--strip"/>
        <div className="content-container content-container--gradient--strip">
            <h1 className="white margin-bottom-30"> {t.whyUs.title} </h1>
            <h3 className="white margin-bottom-50"> {t.whyUs.subtitle} </h3>
            <div className="content-rectangle flex-container--row">
                <div className="flex-item--with-border flex-container--row wow pulse">
                    <div className="flex-item--with-symbol">
                        <i className="fas fa-code"/>
                    </div>
                    <div className="flex-item--after-symbol">
                        <h3> {t.whyUs.practicalTitle} </h3>
                        <p> {t.whyUs.practicalDesc1} </p>
                        <p> {t.whyUs.practicalDesc2} </p>
                    </div>
                </div>

                <div className="flex-item--right wow pulse flex-container--column">

                    <div className="flex-container--row margin-bottom-20 flex-basis-auto">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-puzzle-piece" style={{paddingTop: "10px", paddingBottom: "10px"}}/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p className="margin-bottom-5"> {t.whyUs.puzzlers} </p>
                            <Link to="/puzzler"
                                  className="button button--mini"> {t.whyUs.puzzlersButton} </Link>
                        </div>
                    </div>

                    <div className="flex-container--row margin-bottom-20 flex-basis-auto">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-brain" style={{paddingTop: "10px", paddingBottom: "10px"}}/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p className="margin-bottom-5"> {t.whyUs.challenges} </p>
                            <Link to="/challenges"
                                  className="button button--mini"> {t.whyUs.challengesButton} </Link>
                        </div>
                    </div>

                    <div className="flex-container--row flex-basis-auto">
                        <div className="flex-item--with-symbol">
                            <i className="fab fa-android symbol-width"
                               style={{paddingTop: "10px", paddingBottom: "10px"}}/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <p className="margin-bottom-5"> {t.whyUs.app} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>);
}
