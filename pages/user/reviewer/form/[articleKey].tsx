import React from 'react';
import {useTranslations} from "../../../../src/Translations";
import {useForm} from "react-hook-form";
import {showErrorDialog, showSuccessDialog} from "../../../../src/Popups";
import {MultilineTextEdit, TextEdit} from "../../../../components/component/form/TextEdit";
import {useRouter} from "next/router";
import {KtAForm} from "../../../../components/wrapper/KtAForm";
import {postForm, requestCurrentUser} from "../../../../src/Network";
import {getUserUUIDFromRequest} from "../../../../src/userUuid";
import {makeDynamicProps} from "../../../../src/Utils";
import {User} from "../../../../src/Model";
import {RadioSelect} from "../../../../components/component/form/RadioSelect";
import {CheckboxSelect} from "../../../../components/component/form/CheckboxSelect";

type ReviewerFormData = {
    email?: string,
    writingExperience: string[],
    kotlinExperience: string,
    englishLevel: string,
    extra: string,
}

export async function getServerSideProps({params, locale, req, res}) {
    const user = await requestCurrentUser({lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return makeDynamicProps({user, articleKey: params.articleKey})
}

export default function AuthorFormPage({user, articleKey}: { user: User | null, articleKey: string }) {
    const t = useTranslations();
    const router = useRouter();

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, handleSubmit, errors} = useForm<ReviewerFormData>({
        defaultValues: {
            email: user?.email
        }
    });

    const onSubmit = (data: ReviewerFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postForm({...data, articleKey: articleKey})
            .then(
                (_) => {
                    setButtonEnabled(true)
                    showSuccessDialog(t.form.dialogSent)
                        .then(_ => router.push("/article/" + articleKey))
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

            <RadioSelect<ReviewerFormData, string>
                title={"Your English level"}
                name="englishLevel"
                register={register} errors={errors} required={false}
                options={[
                    {label: "Native or living in english-speaking country for years", value: "Native"},
                    {label: "I could write articles in english without language corrector", value: "Corrector"},
                    {label: "Good", value: "Good"},
                    {label: "Communicative", value: "Average"},
                ]}/>

            <RadioSelect<ReviewerFormData, string>
                title={"Your experience with Kotlin"}
                name="kotlinExperience"
                register={register} errors={errors} required={false}
                options={[
                    {label: "Using them on my work and teaching others", value: "Teaching"},
                    {label: "Using them on my work", value: "Professional"},
                    {label: "Using them on personal projects", value: "Hobbyist"},
                    {label: "Learning", value: "Learning"},
                ]}/>

            <CheckboxSelect<ReviewerFormData, string>
                title={"Your experience with writing"}
                name="writingExperience"
                register={register} errors={errors} required={false}
                options={[
                    {label: "I write technical articles", value: "WritingArticles"},
                    {label: "I give presentations on conferences", value: "Presentations"},
                    {label: "I wrote a technical book", value: "Book"},
                ]}/>

            <MultilineTextEdit question={t.form.extraPrompt} register={register} fieldName="extra" errors={errors}/>

            <input
                type="submit" className="button button--mini" id="submit"
                style={{position: "relative", right: "50%", left: "40%"}}
                value={t.form.submit}/>
        </KtAForm>
    </>;
}
