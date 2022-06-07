import React from "react";
import {useTranslations} from "../../../src/Translations";

export function CountrySelect({register}: { register }) {
    const t = useTranslations();
    return <fieldset>
        <label htmlFor="country">{t.form.countryPrompt}</label>
        <select name="country" id="country" ref={register}>
            <option value="Poland">Poland</option>
            <option value="UnitedKingdom">United Kingdom</option>
            <option value="USA">USA</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="China">China</option>
            <option value="Europe">Europe</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Australia">Australia</option>
        </select>
    </fieldset>;
}