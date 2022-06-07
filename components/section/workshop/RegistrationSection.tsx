import React from "react";
import {printMoney, PublicWorkshop, Workshop} from "../../../src/Model";
import {useLang, useTranslations} from "../../../src/Translations";
import Link from "../../../src/Link";

export function RegistrationSection({workshop}: { workshop: Workshop }) {
    const t = useTranslations()
    const lang = useLang()

    const multipleOptions = !!workshop.basePrice.company && !!workshop.basePrice.person
    const plannedPublicWorkshops: PublicWorkshop[] = workshop.plannedPublicWorkshops

    return <section className="contact short-section section--white" id="register">
        <div className="content-container">
            <h1>{t.workshopPage.registration.title}</h1>
            {plannedPublicWorkshops && plannedPublicWorkshops
                .filter(publicWorkshop => publicWorkshop.workshopLang.toUpperCase() == lang.key.toUpperCase())
                .map(publicWorkshop =>
                    <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                        <OrderOption
                            link={`/workshop/${workshop.key}/form/public/${publicWorkshop.key}/register`}
                            buttonText={t.workshopPage.registration.register}
                            explanation={t.workshopPage.registration.publicPlanned.explanation
                                .replace("{start_date}", publicWorkshop.startDate)
                                .replace("{end_date}", publicWorkshop.endDate)
                                .replace("{time}", publicWorkshop.timeDesc)
                                .replace("{workshop_person_price}", printMoney(workshop.basePrice.person!))
                                .replace("{workshop_person_price_pl}", printMoney(workshop.basePrice.personPl ?? workshop.basePrice.person!))}
                        />
                    </div>
                )}
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                {workshop.basePrice.company &&
                <OrderOption
                    link={`/workshop/${workshop.key}/form/private`}
                    buttonText={multipleOptions ? t.workshopPage.registration.private.buttonText : t.workshopPage.registration.register}
                    explanation={
                        (multipleOptions ? t.workshopPage.registration.private.chooseOption : "") +
                        t.workshopPage.registration.private.explanation
                            .replace("{workshop_price}", printMoney(workshop.basePrice.company))
                            .replace("{workshop_price_pl}", printMoney(workshop.basePrice.companyPl ?? workshop.basePrice.company))
                            .replace("{days_num}", String(workshop.basePrice.daysNumber ?? 3))}/>
                }
                {workshop.basePrice.person &&
                <OrderOption
                    link={`/workshop/${workshop.key}/form/public`}
                    buttonText={multipleOptions ? t.workshopPage.registration.public.buttonText : t.workshopPage.registration.register}
                    explanation={
                        (multipleOptions ? t.workshopPage.registration.public.chooseOption : "") +
                        t.workshopPage.registration.public.explanation
                            .replace("{workshop_person_price}", printMoney(workshop.basePrice.person))
                            .replace("{workshop_person_price_pl}", printMoney(workshop.basePrice.personPl ?? workshop.basePrice.person))
                            .replace("{days_num}", String(workshop.basePrice.daysNumber ?? 3))}/>
                }
            </div>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                <OrderOption
                    link={`/workshop/${workshop.key}/form/consultations`}
                    buttonText={t.workshopPage.registration.consultations.chooseOption}
                    explanation={t.workshopPage.registration.consultations.text}
                />
            </div>
        </div>
    </section>;
}

const OrderOption = ({link, buttonText, explanation}: { link: string, buttonText: string, explanation: string }) =>
    <div style={{
        flex: 1,
        padding: "20px",
        borderRadius: "3px",
        boxShadow: "1px 1px 4px #cacaca",
        margin: "20px",
        maxWidth: "415px"
    }}>
        <p style={{}}>{explanation}</p>
        <Link to={link}
              className="button button-detailed-page-gtm margin-top-10">
            {buttonText}
        </Link>
    </div>;
