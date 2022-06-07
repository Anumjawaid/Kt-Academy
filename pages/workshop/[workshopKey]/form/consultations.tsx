import React from 'react';
import {callApi, requestWorkshop, requestWorkshops} from "../../../../src/Network";
import {Workshop} from "../../../../src/Model";
import {makeStaticPaths, makeStaticProps} from "../../../../src/Utils";
import {useLang, useTranslations} from "../../../../src/Translations";
import {useForm} from "react-hook-form";
import {useLinkFunctions} from "../../../../src/Link";
import {showErrorDialog, showSuccessDialog} from "../../../../src/Popups";
import {WorkshopForm} from "../../../../components/wrapper/WorkshopForm";
import {TextEdit} from "../../../../components/component/form/TextEdit";
import {RadioSelect} from "../../../../components/component/form/RadioSelect";
import {CountrySelect} from "../../../../components/component/form/CountrySelect";
import {useRouter} from "next/router";

type ConsultationType = "private" | "company"

export async function getStaticProps({params, locale}) {
    const workshop = await requestWorkshop(params.workshopKey, {lang: locale})
    return makeStaticProps({workshop})
}

export async function getStaticPaths({locale}) {
    const workshops = await requestWorkshops({lang: locale})
    const workshopKeys = workshops.map(w => ({workshopKey: w.key}))
    return makeStaticPaths(locale, workshopKeys)
}

export type ConsultationsFormData = {
    senderName: string,
    email: string,
    consultationType: ConsultationType,
    companyName?: string,
    country: string,
    howDoYouKnow: string,
    howDoYouKnowExtra: string,
    extra: string,
}

function postConsultationsForm(workshop: Workshop, lang: string, data: ConsultationsFormData) {
    return callApi("workshop/" + workshop!.key + "/consultations", {
        lang: lang,
        method: "POST",
        body: data
    });
}

export default function WorkshopFormPage({workshop}: { workshop: Workshop }) {
    const t = useTranslations();
    const lang = useLang();
    const router = useRouter();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, watch, handleSubmit, errors} = useForm<ConsultationsFormData>();
    const consultationType = watch("consultationType")
    const {linkKeepLang} = useLinkFunctions()

    const onSubmit = (data: ConsultationsFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postConsultationsForm(workshop, lang.key, data)
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
            title={t.form.consultations.title}
            intro={t.form.consultations.intro
                .replace("{workshop_name}", workshop.name)
                .replace("{workshop_link}", linkKeepLang("/workshop/" + workshop.key))}
            register={register}
            errors={errors}
            watch={watch}
            onSubmit={handleSubmit(onSubmit)}>

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

            <RadioSelect<ConsultationsFormData, ConsultationType>
                title={t.form.consultations.consultationType.question}
                name="consultationType" register={register} errors={errors} required={true}
                options={[
                    {label: t.form.consultations.consultationType.company, value: "company"},
                    {label: t.form.consultations.consultationType.private, value: "private"},
                ]}/>

            {consultationType === "company" &&
            <TextEdit question={t.form.companyNamePrompt}
                      fieldName="companyName"
                      register={register({required: t.form.required})} errors={errors}/>
            }

            <CountrySelect register={register}/>
        </WorkshopForm>
    </>;
}
