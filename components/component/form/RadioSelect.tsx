import React from "react";
import {FormError} from "./FormError";
import {useTranslations} from "../../../src/Translations";

type RadioSelectOption<OptionType> = {
    label: string,
    value: OptionType
}

type RadioSelectProps<FormType, OptionType> = {
    title: string,
    explanation?: string,
    name: keyof FormType,
    options: RadioSelectOption<OptionType>[],
    register,
    errors,
    required?: boolean
};

export function RadioSelect<FormType, OptionType extends string>({title, explanation, options, name, register, errors, required = false}: RadioSelectProps<FormType, OptionType>) {
    const t = useTranslations();
    const refOptions = required ? {required: t.form.required} : {}
    return <fieldset>
        <legend>{title}</legend>
        {explanation && <div className="small-text">{explanation}</div>}
        {options.map((option, i) => <>
            <input key={"i" + i} type="radio" id={option.value} name={name as string} value={option.value}
                   ref={register(refOptions)}/>
            <label key={"l" + i} htmlFor={option.value}>{option.label}</label><br/>
        </>)}
        <FormError field={errors[name]}/>
    </fieldset>;
}
