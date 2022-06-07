import React from 'react';
import {callApi, requestCurrentUser} from "../../../src/Network";
import {Currency, Money, User} from "../../../src/Model";
import {useTranslations} from "../../../src/Translations";
import {useForm} from "react-hook-form";
import {showErrorDialog, showSuccessDialog} from "../../../src/Popups";
import {MultilineTextEdit, TextEdit} from "../../../components/component/form/TextEdit";
import {useRouter} from "next/router";
import {KtAForm} from "../../../components/wrapper/KtAForm";
import {RadioSelect} from "../../../components/component/form/RadioSelect";
import {getUserUUIDFromRequest} from "../../../src/userUuid";
import {makeDynamicProps} from "../../../src/Utils";
import {PageOrLoginRequired} from "../../../components/page/LoginRequiredPage";

type PatchTrainerSelfRequest = {
    rates: TrainerRatesJson,
    topics: string[],
    description: string,
    experienceDescription: string,
    shortDescription: string,
}

type TrainerRatesJson = {
    privateConsultationsPerHour: Money | null,
    companyConsultationsPerDay: Money | null,
}

function postProposeTrainerSelf(data: PatchTrainerSelfRequest) {
    return callApi("user/me/trainer", {
        method: "POST",
        body: data
    });
}

type ProposeTrainerFormData = {
    privateConsultationsPerHourRate: string,
    privateConsultationsPerHourCurrency: Currency,
    companyConsultationsPerDayRate: string,
    companyConsultationsPerDayCurrency: Currency,
    topics: string,
    description: string,
    experienceDescription: string,
    shortDescription: string,
}

export async function getServerSideProps({locale, req, res}) {
    const user = await requestCurrentUser({lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return makeDynamicProps({user})
}

export default function TrainerFormPage({user}: { user: User | null }) {
    return PageOrLoginRequired({user}, TrainerFormPageLogged)
}

function TrainerFormPageLogged({user}: { user: User }) {
    const t = useTranslations();
    const router = useRouter();
    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, handleSubmit, errors} = useForm<ProposeTrainerFormData>({
        defaultValues: {
            topics: user.trainerProposition?.topics?.join(", ") ??
                user.trainer?.topics?.join(", "),
            description: user.trainerProposition?.description ??
                user.trainer?.description,
            shortDescription: user.trainerProposition?.shortDescription ??
                user.trainer?.shortDescription,
            experienceDescription: user.trainerProposition?.experienceDescription ??
                user.trainer?.experienceDescription,
            privateConsultationsPerHourRate: user.trainerProposition?.rates?.privateConsultationsPerHour?.amount ??
                user.trainer?.rates?.privateConsultationsPerHour?.amount,
            privateConsultationsPerHourCurrency: user.trainerProposition?.rates?.privateConsultationsPerHour?.currency ??
                user.trainer?.rates?.privateConsultationsPerHour?.currency,
            companyConsultationsPerDayRate: user.trainerProposition?.rates?.companyConsultationsPerDay?.amount ??
                user.trainer?.rates?.companyConsultationsPerDay?.amount,
            companyConsultationsPerDayCurrency: user.trainerProposition?.rates?.companyConsultationsPerDay?.currency ??
                user.trainer?.rates?.companyConsultationsPerDay?.currency,
        }
    });

    const onSubmit = (data: ProposeTrainerFormData) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        postProposeTrainerSelf({
            rates: {
                privateConsultationsPerHour: {
                    amount: data.privateConsultationsPerHourRate,
                    currency: data.privateConsultationsPerHourCurrency,
                },
                companyConsultationsPerDay: {
                    amount: data.companyConsultationsPerDayRate,
                    currency: data.companyConsultationsPerDayCurrency,
                }
            },
            topics: data.topics.split(",").map(t => t.trim().toLowerCase()),
            description: data.description,
            shortDescription: data.shortDescription,
            experienceDescription: data.experienceDescription,
        })
            .then(
                (_) => {
                    setButtonEnabled(true)
                    const text = !user.publicKey || !user.bio ?
                        t.form.dialogSent + t.form.dialogSetYourProfileContinuation :
                        t.form.dialogSent;
                    showSuccessDialog(text)
                        .then(_ => router.push("/user/edit/me"))
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
            title={t.user.trainer.propositionForm.title}
            intro={t.user.trainer.propositionForm.intro}
            onSubmit={handleSubmit(onSubmit)}>

            <TextEdit question={t.user.trainer.propositionForm.topicsPrompt}
                      fieldName="topics"
                      register={register({
                          required: t.form.required
                      })} errors={errors}/>

            <MultilineTextEdit question={t.user.trainer.propositionForm.shortDescription}
                               fieldName="shortDescription"
                               register={register({
                                   required: t.form.required,
                                   maxLength: 300
                               })} errors={errors}/>

            <MultilineTextEdit question={t.user.trainer.propositionForm.descriptionPrompt}
                               fieldName="description"
                               register={register({
                                   required: t.form.required
                               })} errors={errors}/>

            <MultilineTextEdit question={t.user.trainer.propositionForm.experiencePrompt}
                               fieldName="experienceDescription"
                               register={register({
                                   required: t.form.required
                               })} errors={errors}/>

            <h3>{t.user.trainer.propositionForm.privateConsultationTitle}</h3>

            <TextEdit question={t.user.trainer.propositionForm.rateAmount}
                      fieldName="privateConsultationsPerHourRate"
                      register={register({
                          pattern: {
                              value: /^\d*\.?\d*$/,
                              message: t.form.invalidNumber
                          }
                      })} errors={errors}/>

            <RadioSelect<ProposeTrainerFormData, Currency>
                title={t.user.trainer.propositionForm.rateCurrency}
                name="privateConsultationsPerHourCurrency" register={register} errors={errors} required={false}
                options={[
                    {label: "EUR", value: "EUR"},
                    {label: "PLN", value: "PLN"},
                    {label: "USD", value: "USD"},
                ]}/>

            <h3>{t.user.trainer.propositionForm.companyConsultingTitle}</h3>

            <TextEdit question={t.user.trainer.propositionForm.rateAmount}
                      fieldName="companyConsultationsPerDayRate"
                      register={register({
                          pattern: {
                              value: /^\d*\.?\d*$/,
                              message: t.form.invalidNumber
                          }
                      })} errors={errors}/>

            <RadioSelect<ProposeTrainerFormData, Currency>
                title={t.user.trainer.propositionForm.rateCurrency}
                name="companyConsultationsPerDayCurrency" register={register} errors={errors} required={false}
                options={[
                    {label: "EUR", value: "EUR"},
                    {label: "PLN", value: "PLN"},
                    {label: "USD", value: "USD"},
                ]}/>

            <input type="submit" className="button button--mini" id="submit"
                   style={{position: "relative", right: "50%", left: "40%"}}
                   value={t.form.submit}/>
        </KtAForm>
    </>;
}

