import React from 'react';
import {useTranslations} from "../../../src/Translations";
import {useForm} from "react-hook-form";
import {showErrorDialog, showSuccessDialog} from "../../../src/Popups";
import {MultilineTextEdit, TextEdit} from "../../../components/component/form/TextEdit";
import {useRouter} from "next/router";
import {KtAForm} from "../../../components/wrapper/KtAForm";
import {postForm, requestCurrentUser} from "../../../src/Network";
import {getUserUUIDFromRequest} from "../../../src/userUuid";
import {makeDynamicProps} from "../../../src/Utils";
import {User} from "../../../src/Model";
import {RadioSelect} from "../../../components/component/form/RadioSelect";

type AuthorFormData = {
    email?: string,
    title: string,
    type: string,
    idea: string,
    extra: string,
}

export async function getServerSideProps({locale, req, res}) {
    const user = await requestCurrentUser({lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return makeDynamicProps({user})
}

export default function AuthorFormPage({user}: { user: User | null }) {
    const t = useTranslations();
    const router = useRouter();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, handleSubmit, errors} = useForm<AuthorFormData>({
        defaultValues: {
            email: user?.email
        }
    });

    const onSubmit = (data: AuthorFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postForm(data)
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
            title={t.user.author.form.title}
            intro={t.user.author.form.intro}
            onSubmit={handleSubmit(onSubmit)}>

            {!user?.email &&
            <TextEdit
                question={t.user.author.form.email}
                fieldName="email"
                register={register({required: t.form.required})} errors={errors}/>
            }

            <RadioSelect<AuthorFormData, string>
                title={t.user.author.form.type}
                name="type" register={register} errors={errors} required={false}
                options={[
                    {label: t.user.author.form.article, value: "Article"},
                    {label: t.user.author.form.book, value: "Book"},
                ]}/>

            <TextEdit
                question={t.user.author.form.titleIdea}
                fieldName="title"
                register={register} errors={errors}/>

            <MultilineTextEdit question={t.user.author.form.idea} register={register} fieldName="idea" errors={errors}/>

            <MultilineTextEdit question={t.form.extraPrompt} register={register} fieldName="extra" errors={errors}/>

            <input
                type="submit" className="button button--mini" id="submit"
                style={{position: "relative", right: "50%", left: "40%"}}
                value={t.form.submit}/>
        </KtAForm>
    </>;
}
