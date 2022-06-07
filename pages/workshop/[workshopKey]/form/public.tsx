import React from 'react';
import {useForm} from "react-hook-form";
import ReactMarkdown from "react-markdown";
import {callApi, requestWorkshop, requestWorkshops} from "../../../../src/Network";
import {makeStaticPaths, makeStaticProps} from "../../../../src/Utils";
import {printMoney, Workshop} from "../../../../src/Model";
import {useLang, useTranslations} from "../../../../src/Translations";
import {useRouter} from "next/router";
import {useLinkFunctions} from "../../../../src/Link";
import {showErrorDialog, showSuccessDialog} from "../../../../src/Popups";
import {WorkshopForm} from "../../../../components/wrapper/WorkshopForm";
import {RadioSelect} from "../../../../components/component/form/RadioSelect";
import {FormError} from "../../../../components/component/form/FormError";
import {CountrySelect} from "../../../../components/component/form/CountrySelect";

type RegisterKinds = "myself" | "developerCompany" | "myselfAndGroupCompany" | "groupCompany"
type InvoiceToOptions = "person" | "privateCompany" | "company"
type DeveloperExperience = "no" | "junior" | "mid" | "senior"
type PriceAcceptanceOptions = "ok" | "discountNeeded" | "wayTooMuch"

export async function getStaticProps({params, locale}) {
    const workshop = await requestWorkshop(params.workshopKey, {lang: locale})
    return makeStaticProps({workshop})
}

export async function getStaticPaths({locale}) {
    const workshops = await requestWorkshops({lang: locale})
    const workshopKeys = workshops.map(w => ({workshopKey: w.key}))
    return makeStaticPaths(locale, workshopKeys)
}

export type PublicFormData = {
    senderName: string,
    email: string,
    registerKind: RegisterKinds,

    invoiceTo?: InvoiceToOptions,
    developerExperience?: DeveloperExperience,
    priceAcceptance?: PriceAcceptanceOptions,

    companyName?: string,
    groupSize: string,

    country: string,
    date: string,
    howDoYouKnow: string,
    howDoYouKnowExtra: string,
    extra: string
};

export function postPublicRequestForm(workshop: Workshop, lang: string, data: PublicFormData) {
    return callApi("workshop/" + workshop!.key + "/requestPublic", {
        lang: lang,
        method: "POST",
        body: data
    })
}

export default function RequestPublicWorkshop({workshop}: { workshop: Workshop }) {
    const t = useTranslations();
    const lang = useLang();
    const router = useRouter();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, watch, handleSubmit, errors} = useForm<PublicFormData>();
    const registerKind: RegisterKinds = watch("registerKind")
    const developerExperience: DeveloperExperience | undefined = watch("developerExperience")
    const invoiceTo: InvoiceToOptions | undefined = watch("invoiceTo")
    const {linkKeepLang} = useLinkFunctions()

    const onSubmit = (data: PublicFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postPublicRequestForm(workshop, lang.key, data)
            .then(
                (_) => {
                    setButtonEnabled(true)
                    showSuccessDialog(t.form.dialogSent)
                        .then(_ => router.push("/"))

                },
                (error) => {
                    setButtonEnabled(true)
                    console.log(error)
                    showErrorDialog(t.form.dialogError)
                }
            )
    }

    return <>
        <WorkshopForm
            title={t.form.public.title}
            intro={t.form.public.intro
                .replace("{workshop_name}", workshop.name)
                .replace("{workshop_link}", linkKeepLang("/workshop/" + workshop.key))}
            register={register}
            errors={errors}
            watch={watch}
            submitEnabled={!(["myself", "developerCompany"].includes(registerKind) && developerExperience === "no")}
            onSubmit={handleSubmit(onSubmit)}>

            <fieldset>
                <label htmlFor="senderName">{t.form.namePrompt}</label>
                <input type="text" name="senderName" id="senderName" ref={register({
                    required: t.form.required
                })} placeholder={t.form.namePrompt}/>
                <FormError field={errors.senderName}/>
            </fieldset>

            <fieldset>
                <label htmlFor="email">{t.form.emailPrompt}</label>
                <input type="text" name="email" id="email" ref={register({
                    required: t.form.required,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t.form.invalidEmail
                    }
                })} placeholder={t.form.emailPrompt}/>
                <FormError field={errors.email}/>
            </fieldset>

            <RadioSelect<PublicFormData, RegisterKinds>
                title={t.form.registerKind.question} name="registerKind" register={register} errors={errors}
                required={true}
                options={[
                    {label: t.form.registerKind.myself, value: "myself"},
                    {label: t.form.registerKind.developerCompany, value: "developerCompany"},
                    {label: t.form.registerKind.myselfAndGroupCompany, value: "myselfAndGroupCompany"},
                    {label: t.form.registerKind.groupCompany, value: "groupCompany"},
                ]}/>

            {registerKind === "myself" &&
            <>
                <RadioSelect<PublicFormData, InvoiceToOptions>
                    title={t.form.invoiceTo.question} name="invoiceTo" register={register} errors={errors}
                    required={true}
                    options={[
                        {label: t.form.invoiceTo.company, value: "company"},
                        {label: t.form.invoiceTo.privateCompany, value: "privateCompany"},
                        {label: t.form.invoiceTo.person, value: "person"}
                    ]}/>

                {invoiceTo === "person" && workshop.programmingLevel !== "BEGINNER" &&
                <ReactMarkdown source={t.form.noVatIdInfo}/>
                }
            </>
            }

            {(["developerCompany", "myselfAndGroupCompany", "groupCompany"].includes(registerKind) ||
                invoiceTo === "company") &&
            <>
                <fieldset>
                    <label htmlFor="companyName">{t.form.companyNamePrompt}</label>
                    <input type="text" name="companyName" id="companyName" ref={register()}
                           placeholder={t.form.companyNamePrompt}/>
                    <FormError field={errors.companyName}/>
                </fieldset>
            </>
            }

            {["myself", "developerCompany"].includes(registerKind) && workshop.programmingLevel === "ADVANCED" &&
            <>
                <RadioSelect<PublicFormData, DeveloperExperience>
                    title={registerKind === "myself" ? t.form.developerExperience.questionMyself : t.form.developerExperience.questionOther}
                    name="developerExperience" register={register} errors={errors} required={true}
                    options={[
                        {label: t.form.developerExperience.no, value: "no"},
                        {label: t.form.developerExperience.junior, value: "junior"},
                        {label: t.form.developerExperience.mid, value: "mid"},
                        {label: t.form.developerExperience.senior, value: "senior"},
                    ]}/>

                {developerExperience === "no" &&
                <ReactMarkdown source={t.form.notForBeginnerInfo}/>
                }
            </>
            }

            {["myselfAndGroupCompany", "groupCompany"].includes(registerKind) &&
            <>
                <fieldset>
                    <label htmlFor="groupSize">{t.form.groupSizePrompt}</label>
                    <input type="text" name="groupSize" id="groupSize" min="1" max="100" ref={register({
                        required: t.form.required
                    })} placeholder={t.form.groupSizePrompt}/>
                    <FormError field={errors.groupSize}/>
                </fieldset>
            </>
            }

            {!(["myself", "developerCompany"].includes(registerKind) && developerExperience === "no") &&
            <>
                <CountrySelect register={register}/>

                <fieldset>
                    <label htmlFor="date">{t.form.datePrompt}</label>
                    <input type="text" name="date" id="date" ref={register({
                        required: t.form.required
                    })} placeholder=""/>
                    <FormError field={errors.date}/>
                </fieldset>

                <RadioSelect<PublicFormData, PriceAcceptanceOptions>
                    title={t.form.priceAcceptance.question
                        .replace("{price}", printMoney(workshop.basePrice.person ?? workshop.basePrice.personPl!!))
                        .replace("{price_pl}", printMoney(workshop.basePrice.personPl ?? workshop.basePrice.personPl!!))
                        .replace("{days_num}", workshop.basePrice.daysNumber.toString())}
                    name="priceAcceptance" register={register} errors={errors} required={true}
                    options={[
                        {label: t.form.priceAcceptance.ok, value: "ok"},
                        {label: t.form.priceAcceptance.discountNeeded, value: "discountNeeded"},
                        {label: t.form.priceAcceptance.wayTooMuch, value: "wayTooMuch"},
                    ]}/>
            </>
            }
        </WorkshopForm>
    </>;
}
