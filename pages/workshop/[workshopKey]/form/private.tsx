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
import ReactMarkdown from "react-markdown";
import {CountrySelect} from "../../../../components/component/form/CountrySelect";
import {useRouter} from "next/router";

type GroupSizeOptions = "size1" | "size2to7" | "size8to15" | "size16orMore"
type IsOnlineOptions = "online" | "inCompany"

export async function getStaticProps({params, locale}) {
    const workshop = await requestWorkshop(params.workshopKey, {lang: locale})
    return makeStaticProps({workshop})
}

export async function getStaticPaths({locale}) {
    const workshops = await requestWorkshops({lang: locale})
    const workshopKeys = workshops.map(w => ({workshopKey: w.key}))
    return makeStaticPaths(locale, workshopKeys)
}

export type PrivateFormData = {
    senderName: string,
    email: string,
    companyName: string,
    country: string,
    date: string,
    groupSize: GroupSizeOptions,
    isOnline: IsOnlineOptions,
    howDoYouKnow: string,
    howDoYouKnowExtra: string,
    extra: string,
}

function postPrivateRequestForm(workshop: Workshop, lang: string, data: PrivateFormData) {
    return callApi("workshop/" + workshop!.key + "/submit", {
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
    const {register, watch, handleSubmit, errors} = useForm<PrivateFormData>();
    const groupSize = watch("groupSize")
    const isOnline = watch("isOnline")
    const {linkKeepLang} = useLinkFunctions()

    const onSubmit = (data: PrivateFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postPrivateRequestForm(workshop, lang.key, data)
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
            title={t.form.private.title}
            intro={t.form.private.intro
                .replace("{workshop_name}", workshop.name)
                .replace("{workshop_link}", linkKeepLang("/workshop/" + workshop.key))}
            submitEnabled={groupSize !== "size1"}
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

            <TextEdit question={t.form.companyNamePrompt}
                      fieldName="companyName"
                      register={register({
                          required: t.form.required
                      })} errors={errors}/>

            <RadioSelect<PrivateFormData, GroupSizeOptions>
                title={t.form.groupSizePrompt}
                name="groupSize" register={register} errors={errors} required={true}
                options={[
                    {label: t.form.justMe, value: "size1"},
                    {label: "2-8", value: "size2to7"},
                    {label: "8-16", value: "size8to15"},
                    {label: "17 " + t.form.orMore, value: "size16orMore"},
                ]}/>

            {(groupSize === "size1" || groupSize === "size2to7") &&
            <ReactMarkdown
                source={t.form.requestOpenInsteadInfo
                    .replace("{openFormLink}", linkKeepLang(`/workshop/${workshop.key}/form/public`))}/>
            }

            {groupSize !== "size1" &&
            <>
                <CountrySelect register={register}/>

                <RadioSelect<PrivateFormData, IsOnlineOptions>
                    title={t.form.isOnline.question}
                    name="isOnline" register={register} errors={errors} required={true}
                    options={[
                        {label: t.form.isOnline.online, value: "online"},
                        {label: t.form.isOnline.inCompany, value: "inCompany"},
                    ]}/>

                {isOnline === "inCompany" &&
                <p>{t.form.private.inCompanyWarning}</p>
                }

                <TextEdit question={t.form.datePrompt}
                          fieldName="date"
                          register={register({
                              required: t.form.required
                          })} errors={errors}/>
            </>
            }
        </WorkshopForm>
    </>;
}
