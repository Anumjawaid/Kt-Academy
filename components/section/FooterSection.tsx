import React, {CSSProperties} from "react";
import {useTranslations} from "../../src/Translations";
import Link from "../../src/Link";

export default function FooterSection({style = {}}: { style?: CSSProperties }) {
    const t = useTranslations();

    return (<footer style={style}>
        <div className="content-container">
            <div>
                <p className="mail-contact"> {t.footerContact} <a
                    href="mailto:contact@kt.academy"> contact@kt.academy </a></p>
                <p><Link to="/privacyPolicy">{t.privacyPolicy}</Link></p>
            </div>
            <div className="copywright-container">
                <p> &copy; Marcin Moskała 2018 </p>
            </div>
        </div>
    </footer>);
}