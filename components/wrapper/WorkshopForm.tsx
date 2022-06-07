import React from 'react';
import {HowDoYouKnowSelect} from "../component/form/HowDoYouKnowSelect";
import {useTranslations} from "../../src/Translations";
import {KtAForm} from "./KtAForm";
import {MultilineTextEdit} from "../component/form/TextEdit";

type WorkshopFormProps = { children, onSubmit, register, errors, watch, title: string, intro: string, submitEnabled?: boolean };

export const WorkshopForm = ({children, onSubmit, title, intro, submitEnabled = true, register, errors, watch}: WorkshopFormProps) => {
    const t = useTranslations();
    return <KtAForm onSubmit={onSubmit} title={title} intro={intro}>
        {children}

        {submitEnabled &&
        <>
            <HowDoYouKnowSelect register={register} errors={errors} watch={watch}/>

            <MultilineTextEdit question={t.form.extraPrompt} register={register} fieldName="extra" errors={errors} />

            <input type="submit" className="button button--mini" id="submit"
                   style={{position: "relative", right: "50%", left: "40%"}}
                   value={t.form.submit}/>
        </>
        }
    </KtAForm>;
};