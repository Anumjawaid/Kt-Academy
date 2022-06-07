import {useForm} from "react-hook-form";
import ReactMarkdown from "react-markdown";
import {callApi, requestWorkshop, requestWorkshops} from "../../../../../../src/Network";
import {makeStaticPaths, makeStaticProps} from "../../../../../../src/Utils";
import {PublicWorkshop, Workshop} from "../../../../../../src/Model";
import {useLang, useTranslations} from "../../../../../../src/Translations";
import {useRouter} from "next/router";
import {useLinkFunctions} from "../../../../../../src/Link";
import {showErrorDialog, showSuccessDialog} from "../../../../../../src/Popups";
import {WorkshopForm} from "../../../../../../components/wrapper/WorkshopForm";
import {TextEdit} from "../../../../../../components/component/form/TextEdit";
import {RadioSelect} from "../../../../../../components/component/form/RadioSelect";
import React from "react";

type RegisterKinds = "myself" | "developerCompany" | "myselfAndGroupCompany" | "groupCompany"
type InvoiceToOptions = "person" | "privateCompany" | "company"
type DeveloperExperience = "no" | "junior" | "mid" | "senior"

export async function getStaticProps({params, locale}) {
    const workshop = await requestWorkshop(params.workshopKey, {lang: locale})
    const publicWorkshop = workshop.plannedPublicWorkshops.find(pw => pw.key === params.publicWorkshopKey)
    return makeStaticProps({workshop, publicWorkshop})
}

export async function getStaticPaths({locale}) {
    const workshops = await requestWorkshops({lang: locale})
    const workshopKeys = workshops.flatMap(w =>
        w.plannedPublicWorkshops.map(pw =>
            ({workshopKey: w.key, publicWorkshopKey: pw.key})
        )
    )
    return makeStaticPaths(locale, workshopKeys)
}

export type PublicPlannedFormData = {
    senderName: string,
    email: string,
    registerKind: RegisterKinds,

    invoiceTo?: InvoiceToOptions,
    developerExperience?: DeveloperExperience,

    companyName?: string,
    groupSize: string,

    howDoYouKnow: string,
    howDoYouKnowExtra: string,
    extra: string,
};

export function postPublicRegisterToPlannedForm(publicWorkshop: PublicWorkshop, lang: string, data: PublicPlannedFormData) {
    return callApi("workshop/" + publicWorkshop.key + "/registerPublicPlanned", {
        lang: lang,
        method: "POST",
        body: data
    })
}

export default function RegisterForPlannedPublicWorkshop({workshop, publicWorkshop}: { workshop: Workshop, publicWorkshop: PublicWorkshop }) {
    const t = useTranslations();
    const lang = useLang();
    const router = useRouter();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, watch, handleSubmit, errors} = useForm<PublicPlannedFormData>();
    const registerKind: RegisterKinds = watch("registerKind")
    const developerExperience: DeveloperExperience | undefined = watch("developerExperience")
    const invoiceTo: InvoiceToOptions | undefined = watch("invoiceTo")
    const {linkKeepLang} = useLinkFunctions()

    const senderName = watch("senderName")

    const onSubmit = (data: PublicPlannedFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postPublicRegisterToPlannedForm(publicWorkshop, lang.key, data)
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
                .replace("{workshop_link}", linkKeepLang("/workshop/" + workshop.key))
                .replace("{start_date}", publicWorkshop.startDate)
                .replace("{time}", publicWorkshop.timeDesc)}
            register={register}
            errors={errors}
            watch={watch}
            submitEnabled={!(["myself", "developerCompany"].includes(registerKind) && developerExperience === "no")}
            onSubmit={handleSubmit(onSubmit)}>

            {senderName}

            <TextEdit question={t.form.namePrompt}
                      fieldName="senderName"
                      register={register({
                          required: t.form.required
                      })} errors={errors}/>

            <TextEdit question={t.form.emailPrompt}
                      fieldName="email"
                      register={register({
                          required: t.form.required,
                          pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: t.form.invalidEmail
                          }
                      })} errors={errors}/>

            <RadioSelect<PublicPlannedFormData, RegisterKinds>
                title={t.form.registerKind.question} name="registerKind" register={register} errors={errors}
                required={true}
                options={[
                    {label: t.form.registerKind.myself, value: "myself"},
                    {label: t.form.registerKind.developerCompany, value: "developerCompany"},
                    {label: t.form.registerKind.myselfAndGroupCompany, value: "myselfAndGroupCompany"},
                    {label: t.form.registerKind.groupCompany, value: "groupCompany"},
                ]}/>

            {["developerCompany", "myselfAndGroupCompany", "groupCompany"].includes(registerKind) &&
            <>
                <TextEdit question={t.form.companyNamePrompt}
                          fieldName="companyName"
                          register={register({
                              required: t.form.required
                          })} errors={errors}/>
            </>
            }

            {registerKind === "myself" &&
            <>
                <RadioSelect<PublicPlannedFormData, InvoiceToOptions>
                    title={t.form.invoiceTo.question} name="invoiceTo" register={register} errors={errors}
                    required={true}
                    options={[
                        {label: t.form.invoiceTo.company, value: "company"},
                        {label: t.form.invoiceTo.privateCompany, value: "privateCompany"},
                        {label: t.form.invoiceTo.person, value: "person"}
                    ]}/>

                {invoiceTo === "person" &&
                <ReactMarkdown source={t.form.noVatIdInfo}/>
                }
            </>
            }

            {["myself", "developerCompany"].includes(registerKind) && workshop.programmingLevel === "ADVANCED" &&
            <>
                <RadioSelect<PublicPlannedFormData, DeveloperExperience>
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
            <TextEdit question={t.form.groupSizePrompt}
                      fieldName="groupSize"
                      register={register({
                          required: t.form.required
                      })} errors={errors}/>
            }
        </WorkshopForm>
    </>;
}