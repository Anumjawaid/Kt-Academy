import React, {useMemo} from "react";
import {RadioSelect} from "./RadioSelect";
import {useTranslations} from "../../../src/Translations";
import {TextEdit} from "./TextEdit";

// export type


export function HowDoYouKnowSelect({register, errors, watch}: { register, errors, watch }) {
    const t = useTranslations();
    const howDoYouKnow = watch("howDoYouKnow")

    const options = useMemo(() => shuffle([
        t.form.howDoYouKnow.search,
        t.form.howDoYouKnow.linkedin,
        t.form.howDoYouKnow.ad,
        t.form.howDoYouKnow.article,
        t.form.howDoYouKnow.post,
        t.form.howDoYouKnow.recommendation,
        t.form.howDoYouKnow.newsletter,
    ]).concat([
        t.form.howDoYouKnow.other
    ]), [t])
    return <>
        <RadioSelect
            title={t.form.howDoYouKnow.title}
            name="howDoYouKnow"
            options={options.map(o => {
                return {label: o, value: o}
            })}
            errors={errors}
            register={register}
        />
        {howDoYouKnow === t.form.howDoYouKnow.other &&
        <TextEdit question={t.form.howDoYouKnow.explain}
                  fieldName="howDoYouKnowExtra"
                  register={register()} errors={errors}/>
        }
    </>;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
