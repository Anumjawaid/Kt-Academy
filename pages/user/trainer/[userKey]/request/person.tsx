import React from 'react';
import {useTranslations} from "../../../../../src/Translations";
import {useForm} from "react-hook-form";
import {showErrorDialog, showSuccessDialog} from "../../../../../src/Popups";
import {MultilineTextEdit, TextEdit} from "../../../../../components/component/form/TextEdit";
import {useRouter} from "next/router";
import {KtAForm} from "../../../../../components/wrapper/KtAForm";
import {postForm, requestUserByKey} from "../../../../../src/Network";
import {getUserUUIDFromRequest} from "../../../../../src/userUuid";
import {makeDynamicProps} from "../../../../../src/Utils";
import {PublicUser} from "../../../../../src/Model";

type PersonalConsultationsFormData = {
    email: string,
    topic: string,
    studentExperience: string,
    when: string,
    extra: string,
}

export async function getServerSideProps({params, locale, req, res}) {
    const user = await requestUserByKey(params.userKey, {lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return makeDynamicProps({user})
}

export default function WorkshopFormPage({user}: { user: PublicUser }) {
    const t = useTranslations();
    const router = useRouter();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, handleSubmit, errors} = useForm<PersonalConsultationsFormData>();

    const onSubmit = (data: PersonalConsultationsFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postForm({
            ...data,
            user: user,
        })
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
        <KtAForm
            title={t.user.trainer.consultationForm.companyTitle}
            onSubmit={handleSubmit(onSubmit)}>

            <TextEdit
                question={t.user.trainer.consultationForm.email}
                fieldName="email"
                register={register({
                    required: t.form.required
                })} errors={errors}/>

            <MultilineTextEdit
                question={t.user.trainer.consultationForm.topic}
                register={register}
                fieldName="topic"
                errors={errors}/>

            <TextEdit
                question={t.user.trainer.consultationForm.studentExperience}
                fieldName="studentExperience"
                register={register({
                    required: t.form.required
                })} errors={errors}/>

            <TextEdit
                question={t.user.trainer.consultationForm.when}
                fieldName="when"
                register={register({
                    required: t.form.required
                })} errors={errors}/>

            <MultilineTextEdit question={t.form.extraPrompt} register={register} fieldName="extra" errors={errors}/>

            <input
                type="submit" className="button button--mini" id="submit"
                style={{position: "relative", right: "50%", left: "40%"}}
                value={t.form.submit}/>
        </KtAForm>
    </>;
}
