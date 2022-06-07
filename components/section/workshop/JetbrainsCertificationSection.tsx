import React from "react";
import {useTranslations} from "../../../src/Translations";

export default function JetbrainsCertificationSection() {
    const t = useTranslations();
    return (<section className="section--white short-section jetbrains-certification">
            <div className="content-container">
                <div className="flex-container--row">
                    <div className="flex-item padding-right-35 flex-container--row">
                        <div className="flex-item--with-symbol">
                            <i className="fas fa-certificate"/>
                        </div>
                        <div className="flex-item--after-symbol">
                            <h3>{t.certificateTitle} </h3>
                            <p>{t.certificateDesc} </p>
                        </div>
                    </div>

                    <div className="flex-item--image-container">
                        <img className="wow zoomIn image-plus-text"
                             src="/images/JetBrains_certified_Kotlin_Training.png"
                             alt="JetBrains certified Kotlin Training" width=""/>
                    </div>
                </div>
            </div>
        </section>
    );
}