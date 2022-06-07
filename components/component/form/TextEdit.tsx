import {FormError} from "./FormError";
import React from "react";

export function TextEdit({question, explanation, placeholder = "", fieldName, register, errors}: { question: string, explanation?: string, placeholder?: string, fieldName: string, register, errors }) {
    return <fieldset>
        <label htmlFor={fieldName}>{question}</label>
        {explanation && <div className="small-text">{explanation}</div>}
        <input type="text" name={fieldName} id={fieldName} ref={register} placeholder={placeholder}/>
        <FormError field={errors[fieldName]}/>
    </fieldset>;
}

export function MultilineTextEdit({question, explanation, placeholder = "", fieldName, register, errors}: { question: string, explanation?:string, placeholder?: string, fieldName: string, register, errors }) {
    return <fieldset>
        <label htmlFor={fieldName}>{question}</label>
        {explanation && <div className="small-text">{explanation}</div>}
        <textarea rows={7} name={fieldName} id={fieldName} ref={register} placeholder={placeholder}/>
        <FormError field={errors[fieldName]}/>
    </fieldset>;
}