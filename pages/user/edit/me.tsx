import React, {useEffect} from "react";
import {User} from "../../../src/Model";
import Header from "../../../components/section/Header";
import FooterSection from "../../../components/section/FooterSection";
import {Lang, useTranslations} from "../../../src/Translations";
import {useForm} from "react-hook-form";
import {HttpError, patchUserSelf, requestCurrentUser} from "../../../src/Network";
import {showSuccessDialog} from "../../../src/Popups";
import ReactMarkdown from "react-markdown";
import {BadgesSection} from "../../../components/component/BadgesSection";
import {getUserUUIDFromRequest} from "../../../src/userUuid";
import {makeDynamicProps} from "../../../src/Utils";
import {MultilineTextEdit, TextEdit} from "../../../components/component/form/TextEdit";
import Link from "../../../src/Link";
import {useRouter} from "next/router";
import {PageOrLoginRequired} from "../../../components/page/LoginRequiredPage";

export async function getServerSideProps({locale, req, res}) {
    const user = await requestCurrentUser({lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return makeDynamicProps({user})
}

type UserEditFormData = {
    customImageUrl?: string
    publicKey?: string
    displayName?: string
    bio?: string
    bioPl?: string,
    website?: string,
    twitter?: string,
    github?: string,
    linkedin?: string,
}

export default function UserEditPage({user}: { user: User | null }) {
    return PageOrLoginRequired({user}, UserEditPageLogged)
}

function UserEditPageLogged({user}: { user: User }) {
    const t = useTranslations();
    const [imageUrl, setImageUrl] = React.useState<string>(user.imageUrl);

    return <>
        <Header/>
        <div className="content-container form">
            <img className="avatar" src={imageUrl} alt="User profile image"/>
            <h3>{user.displayName}</h3>
            {user.publicKey &&
            <ReactMarkdown
                source={t.editProfile.pageVisibleOn + ` [kt.academy/user/${user.publicKey}](https://kt.academy/user/${user.publicKey})`}/>
            }

            <Link to="/user/trainer/form">
                <div className="button light margin-10">{t.editProfile.becomeTrainer}</div>
            </Link>
            <Link to="/user/author/form">
                <div className="button light margin-10">{t.editProfile.becomeAuthor}</div>
            </Link>

            <UserProfileDataForm user={user} setImageUrl={setImageUrl}/>

            <BadgesSection user={user}/>
        </div>
        <FooterSection/>
    </>;
}

function UserProfileDataForm({user, setImageUrl}: { user: User, setImageUrl: (string) => void }) {
    const router = useRouter();
    const t = useTranslations();
    const {register, watch, handleSubmit, errors, setError} = useForm<UserEditFormData>({
        defaultValues: {
            customImageUrl: user.customImageUrl ?? "",
            publicKey: user.publicKey ?? "",
            displayName: user.displayName ?? "",
            bio: user.bio ?? "",
            bioPl: user.bioPl ?? "",
            website: user.socialMedia.websiteUrl,
            twitter: user.socialMedia.twitter,
            github: user.socialMedia.github,
            linkedin: user.socialMedia.linkedin,
        }
    });
    const customImageUrlValue = watch("customImageUrl")
    useEffect(() => {
        setImageUrl(customImageUrlValue && customImageUrlValue.trim().length > 0 ? customImageUrlValue : user.imageUrl)
    }, [customImageUrlValue])

    const onSubmit = (data: UserEditFormData) => {
        patchUserSelf({
            publicKey: data.publicKey,
            customImageUrl: data.customImageUrl,
            bio: data.bio,
            bioPl: data.bioPl,
            displayName: data.displayName,
            socialMedia: {
                websiteUrl: data.website,
                twitter: data.twitter,
                github: data.github,
                linkedin: data.linkedin,
            }
        }).then(
            (_) => {
                showSuccessDialog()
                    .then(_ => router.reload())
            },
            (error: HttpError) => {
                function getErrorMessage() {
                    switch (error.code) {
                        case 409:
                            return "Such public key already exists"
                        case 400:
                            return "Incorrect public key"
                        default:
                            return "An error occurred. There is probably something wrong with the values. "
                    }
                }

                setError("publicKey", {
                    type: "manual",
                    message: getErrorMessage()
                });
            }
        )
    }

    return <div className="margin-bottom-30">
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextEdit
                question={t.editProfile.publicKeyLabel}
                fieldName="publicKey"
                register={register}
                errors={errors}/>

            <TextEdit
                question={t.editProfile.customImageUrlLabel}
                fieldName="customImageUrl"
                register={register}
                errors={errors}/>

            <TextEdit
                question={t.editProfile.displayNameLabel}
                fieldName="displayName"
                register={register}
                errors={errors}/>

            <MultilineTextEdit
                question={t.editProfile.bioLabel}
                fieldName="bio"
                register={register}
                errors={errors}/>

            {router.locale === Lang.PL &&
            <MultilineTextEdit
                question={t.editProfile.bioPlLabel}
                fieldName="bioPl"
                register={register}
                errors={errors}/>
            }

            <TextEdit
                question={t.editProfile.websiteLabel}
                fieldName="website"
                register={register({
                    pattern: {
                        value: linkRegex,
                        message: t.form.shouldBeUrl
                    }
                })}
                errors={errors}/>

            <TextEdit
                question={t.editProfile.twitterLabel}
                fieldName="twitter"
                register={register}
                errors={errors}/>

            <TextEdit
                question={t.editProfile.githubLabel}
                fieldName="github"
                register={register}
                errors={errors}/>


            <TextEdit
                question={t.editProfile.linkedinLabel}
                fieldName="linkedin"
                register={register}
                errors={errors}/>

            <input type="submit" className="button button--mini center" id="submit" value={t.form.save}/>
        </form>
    </div>;
}

const linkRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/