import React from "react";
import {useTranslations} from "../../src/Translations";
import FooterSection from "../../components/section/FooterSection";
import {Workshop} from "../../src/Model";
import {useWorkshopCategories, WorkshopCategory} from "../../src/Data";
import Link from "../../src/Link";
import Header from "../../components/section/Header";
import {requestWorkshops} from "../../src/Network";
import {getQueryParamFromWindow, makeStaticProps, registerPage} from "../../src/Utils";
import {Width} from "../../components/section/Banner";

export async function getStaticProps({locale}) {
    const workshops = await requestWorkshops({lang: locale})
    return makeStaticProps({workshops})
}

export default function WorkshopsPage({workshops}: { workshops: Workshop[] }) {
    registerPage(`workshops`)
    const t = useTranslations();

    const trainerKeyFilter = getQueryParamFromWindow("trainerKey")
    if (trainerKeyFilter) {
        const authorsWorkshops = workshops.filter(w => w.trainer?.key === trainerKeyFilter.trim());
        if (authorsWorkshops.length > 0) {
            workshops = authorsWorkshops
        }
    }

    const bannerOptions = {
        img: "/background-img/4-1920x702.png",
        title: t.workshopOffer.title,
        subtitle: t.workshopOffer.subtitle,
        width: Width.Half,
    };
    return (
        <>
            <Header banner={bannerOptions}/>
            <WorkshopChoice workshops={workshops}/>
            <FooterSection/>
        </>
    );
}

type Props = {
    workshops: Workshop[],
};

function WorkshopChoice({workshops}: Props) {
    const t = useTranslations();

    const workshopCategories: WorkshopCategory[] = useWorkshopCategories()
    const sections = workshopCategories
        .filter(category => !!workshops.find(w => w.tags.includes(category.tag)))
    const LAST_SECTION_INDEX = (workshopCategories.length - 1)

    return (<section className="workshops-offer" id="workshops-offer">
        <div className="content-container" style={{maxWidth: "1500px"}}>
            {sections.map((s, sectionIndex) =>
                <div className="section"
                     style={{marginTop: (sectionIndex !== 0 ? "40px" : "0px"), position: "relative"}}>
                    <div id={"tag-" + s.tag} style={{position: "absolute", top: "-100px", left: "0"}}/>
                    <h2>{s.title}</h2>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        {workshops.filter(w => w.tags.includes(s.tag)).map((w, workshopIndex) =>
                            <div key={workshopIndex}
                                 className="flex-item flex-item-paddings flex-container--column wow zoomIn"
                                 style={{
                                     flexBasis: "400px",
                                     maxWidth: "350px",
                                     marginBottom: (sectionIndex === LAST_SECTION_INDEX ? "60px" : "0px")
                                 }}>
                                <i className={w.icon + " big-icon"} style={{fontSize: "50px"}}/>
                                <h3> {w.name} </h3>
                                <p> {w.shortDescription} </p>
                                <Link to={"/workshop/" + w.key} className="button">
                                    {t.workshopsList.button}
                                </Link>
                            </div>)}
                    </div>
                </div>
            )}
            <span> {t.workshopsList.otherOption} <a href="mailto:contact@kt.academy">contact@kt.academy</a>.</span>
        </div>
    </section>);
}
