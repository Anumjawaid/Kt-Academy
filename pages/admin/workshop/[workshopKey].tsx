import React from 'react';
import {callApi, requestWorkshop} from "../../../src/Network";
import {isAdmin, Materials, ProgrammingLevel, Workshop, WorkshopVisibility} from "../../../src/Model";
import {makeDynamicProps} from "../../../src/Utils";
import {Lang, useTranslations} from "../../../src/Translations";
import {useForm} from "react-hook-form";
import {MultilineTextEdit, TextEdit} from "../../../components/component/form/TextEdit";
import {RadioSelect} from "../../../components/component/form/RadioSelect";
import {KtAForm} from "../../../components/wrapper/KtAForm";
import {CheckboxSelect} from "../../../components/component/form/CheckboxSelect";
import {showErrorDialog, showSuccessDialog} from "../../../src/Popups";
import {getUserUUIDFromRequest} from "../../../src/userUuid";
import Link from "../../../src/Link";
import Swal from "sweetalert2";
import {useGlobalState} from "../../../src/GlobalState";

export async function getServerSideProps({params, locale, req, res}) {
    try {
        const workshop = await requestWorkshop(params.workshopKey, {
            lang: locale,
            userUuid: getUserUUIDFromRequest(req, res)
        })
        return makeDynamicProps({workshop})
    } catch (e) {
        return makeDynamicProps({workshop: null})
    }
}

export type PostWorkshopJson = {
    key: string
    lang: string
    name: string
    programmingLevel: ProgrammingLevel
    subtitle: string | null
    shortDescription: string
    metaKeywords: string
    description: string
    requirements: string[] | null
    tocMd: string
    aboutCourseMd: string | null
    icon: string
    certifiedByJb: boolean
    trainerKey: string | null
    tags: string[]
    howLong: string | null
    basePrice: string
    materials: Materials | null
    knowledgeSources: string[],
    visibility: WorkshopVisibility,
    ownerIds: string[],
};

export type UpdateWorkshopForm = {
    key: string
    lang: string
    name: string
    programmingLevel: ProgrammingLevel
    subtitle: string | null
    shortDescription: string
    metaKeywords: string
    description: string
    requirements: string,
    tocMd: string
    aboutCourseMd: string | null
    icon: string
    certifiedByJb: string
    trainerKey: string | null
    tags: string[]
    howLong: string | null
    basePrice: string
    materials: string[]
    knowledgeSources: string[],
    visibility: WorkshopVisibility,
};

function postUpsertWorkshopForm(data: PostWorkshopJson): Promise<Response> {
    return callApi("workshop", {
        method: "POST",
        body: data
    });
}

function deleteWorkshop(workshopKey: string, lang: string): Promise<Response> {
    return callApi("workshop/" + workshopKey, {
        method: "DELETE",
        lang: lang.toUpperCase()
    });
}

export default function WorkshopFormPage({workshop}: { workshop: Workshop | null }) {
    const t = useTranslations()
    const {user} = useGlobalState()

    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, handleSubmit, errors, watch} = useForm<UpdateWorkshopForm>({
        defaultValues: {
            key: workshop?.key,
            lang: workshop?.lang?.toLowerCase(),
            name: workshop?.name,
            programmingLevel: workshop?.programmingLevel,
            subtitle: workshop?.subtitle,
            shortDescription: workshop?.shortDescription,
            metaKeywords: workshop?.metaKeywords,
            description: workshop?.description,
            requirements: workshop?.requirements?.join("\n"),
            tocMd: workshop?.tocMd,
            aboutCourseMd: workshop?.aboutCourseMd,
            icon: workshop?.icon ?? "",
            certifiedByJb: workshop?.certifiedByJb?.toString() ?? "false",
            trainerKey: workshop?.trainer?.key,
            tags: workshop?.tags ?? [],
            howLong: workshop?.howLong,
            basePrice: workshop?.basePrice?.key,
            materials: [
                ...(workshop?.materials?.book ? ["book"] : []),
                ...(workshop?.materials?.online ? ["online"] : []),
                ...(workshop?.materials?.printed ? ["printed"] : []),
            ],
            knowledgeSources: workshop?.knowledgeSources?.map(it => it.key) ?? [],
            visibility: workshop?.visibility ?? "PROTECTED",
        }
    })
    const key = watch("key")
    const lang = watch("lang")
    const makesACopy = workshop && (key !== workshop.key || lang != workshop.lang)

    const onSubmit = (data: UpdateWorkshopForm) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postUpsertWorkshopForm({
            ...data,
            lang: data.lang.toUpperCase(),
            requirements: data.requirements.trim().length == 0 ? null : data.requirements.split("\n"),
            materials: {
                book: data.materials?.includes("book"),
                online: data.materials?.includes("online"),
                printed: data.materials?.includes("printed"),
            },
            certifiedByJb: data.certifiedByJb == "true",
            ownerIds: [
                ...(workshop?.ownerIds ?? []),
                ...(user ? [user.id] : [])
            ],
            trainerKey: data.trainerKey ?? workshop?.trainer?.key ?? "",
            visibility: data.visibility ?? workshop?.visibility ?? "PROTECTED",
        })
            .then(
                (_) => {
                    setButtonEnabled(true)
                    showSuccessDialog(t.form.dialogSent)
                },
                (error) => {
                    setButtonEnabled(true)
                    console.log(error)
                    showErrorDialog(t.form.dialogError)
                }
            )
    }

    const onDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to remove this workshop? You won't be able to revert this operation!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(res => {
            if (!!res.value) {
                deleteWorkshop(workshop.key, workshop.lang)
            }
        })
    }

    return <>
        <KtAForm onSubmit={handleSubmit(onSubmit)}>

            {workshop && <>
                <Link to={`/workshop/${workshop.key}/preview`}>
                    <div className="button light margin-10">Preview current {workshop.key}</div>
                </Link>
                <div onClick={onDelete} className="button light margin-10">Delete {workshop.key} workshop</div>
            </>}

            <TextEdit question="Workshop key"
                      explanation="This key will be used in URL to identify the workshop"
                      placeholder="someKey"
                      fieldName="key"
                      register={register({
                          required: t.form.required,
                          pattern: /\w*/
                      })} errors={errors}/>

            <RadioSelect<PostWorkshopJson, string>
                explanation="If you like to conduct the workshop in multiple languages, register it separately for each of them. Fill other fields in the language you chose."
                title={"Language"}
                name="lang" register={register} errors={errors} required={true}
                options={[
                    {label: "EN", value: Lang.EN},
                    {label: "PL", value: Lang.PL},
                ]}/>

            {makesACopy &&
            <div>Changing public key or lang leads to making a copy of the workshop. If you wish to change them, after
                submitting the copy, and checking that is exists, remember to delete the previous workshop.</div>
            }

            <TextEdit question="Workshop title"
                      explanation="Will be displayed as a name and at the top of the workshop page."
                      fieldName="name"
                      register={register({
                          required: t.form.required
                      })} errors={errors}/>

            <RadioSelect<PostWorkshopJson, string>
                title={"Who do you direct this workshop to?"}
                name="programmingLevel" register={register} errors={errors} required={true}
                options={[
                    {label: "For everyone", value: "OPEN"},
                    {label: "For beginners", value: "BEGINNER"},
                    {label: "For advanced developers", value: "ADVANCED"},
                ]}/>

            <TextEdit question="Subtitle (optional)"
                      explanation="Second line on the workshop page."
                      fieldName="subtitle"
                      register={register()} errors={errors}/>

            <TextEdit question="Short description"
                      explanation="Will be displayed on workshop preview."
                      fieldName="shortDescription"
                      register={register({
                          required: t.form.required
                      })} errors={errors}/>

            <TextEdit question="Meta keywords"
                      fieldName="metaKeywords"
                      register={register({
                          required: t.form.required
                      })} errors={errors}/>

            <MultilineTextEdit question="Description"
                               explanation="Full description of the workshop using Markdown."
                               fieldName="description"
                               register={register({
                                   required: t.form.required
                               })} errors={errors}/>

            <MultilineTextEdit question="Requirements"
                               explanation="What are the requirements for the attendee to attend. Each requirement in a separate line."
                               fieldName="requirements"
                               register={register()} errors={errors}/>

            <MultilineTextEdit question="Table of contents (in Markdown)"
                               explanation="Full description of what you are planning to cover on the workshop. You points by starting a line with *."
                               fieldName="tocMd"
                               register={register({
                                   required: t.form.required
                               })} errors={errors}/>

            <MultilineTextEdit question="About the course (in Markdown)"
                               explanation=""
                               fieldName="aboutCourseMd"
                               register={register()} errors={errors}/>

            <TextEdit question="Icon"
                      fieldName="icon"
                      explanation="Font awesome class (https://fontawesome.com/v5/search)"
                      register={register({
                          required: t.form.required
                      })} errors={errors}/>

            <RadioSelect<PostWorkshopJson, string>
                title={"Certified by JetBrains"}
                name="certifiedByJb"
                register={register} errors={errors} required={true}
                options={[
                    {label: "Yes", value: "true"},
                    {label: "No", value: "false"},
                ]}/>

            <CheckboxSelect<PostWorkshopJson, string>
                title={"Categories"}
                name="tags" register={register} errors={errors} required={true}
                options={[
                    {label: "Kotlin", value: "kotlin"},
                    {label: "Data Science", value: "datascience"},
                    {label: "Best practices", value: "bestpractices"},
                    {label: "Testing", value: "testing"},
                    {label: "Beginners", value: "beginners"},
                    {label: "Frontend", value: "frontend"},
                    {label: "Android", value: "android"},
                    {label: ".NET", value: ".NET"},
                ]}/>

            <MultilineTextEdit question="How long does it take description? (optional)"
                               explanation="Explain how long should the workshop take. Displayed as a separate section."
                               fieldName="howLong"
                               register={register()} errors={errors}/>

            <RadioSelect<PostWorkshopJson, string>
                title={"Base price plan"}
                name="basePrice" register={register} errors={errors} required={true}
                options={[
                    {label: "1 day", value: "1d"},
                    {label: "2 days", value: "2d"},
                    {label: "3 days", value: "3d"},
                    {label: "Half a year", value: "y/2"},
                ]}/>

            <CheckboxSelect<PostWorkshopJson, string>
                title={"How attendees will obtain knowledge? (choose 2-4)"}
                name="knowledgeSources" register={register} errors={errors} required={true}
                options={[
                    {label: t.workshopPage.knowledgeSources.lecture, value: "lecture"},
                    {label: t.workshopPage.knowledgeSources.challenges, value: "challenges"},
                    {label: t.workshopPage.knowledgeSources.exercises, value: "exercises"},
                    {label: t.workshopPage.knowledgeSources.android, value: "android"},
                    {label: t.workshopPage.knowledgeSources.puzzlers, value: "puzzlers"},
                    {label: t.workshopPage.knowledgeSources.discussion, value: "discussion"},
                ]}/>

            {isAdmin(user) && <>
                <CheckboxSelect<PostWorkshopJson, string>
                    title={"Offered materials"}
                    name="materials" register={register} errors={errors} required={false}
                    options={[
                        {label: "Online", value: "online"},
                        {label: "Printed", value: "printed"},
                        {label: "Effective Kotlin Book", value: "book"},
                    ]}/>

                <TextEdit question="Trainer key"
                          fieldName="trainerKey"
                          explanation="marcinmoskala or leave empty"
                          register={register()} errors={errors}/>

                <RadioSelect<PostWorkshopJson, string>
                    title={"Workshop visibility"}
                    name="visibility" register={register} errors={errors} required={true}
                    options={[
                        {label: "PUBLIC", value: "PUBLIC"},
                        {label: "PROTECTED", value: "PROTECTED"},
                    ]}/>
            </>}

            <input
                type="submit" className="button button--mini" id="submit"
                style={{position: "relative", right: "50%", left: "40%"}}
                value={t.form.submit}/>
        </KtAForm>
    </>;
}
