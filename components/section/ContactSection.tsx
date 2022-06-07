import React from "react";
import {useTranslations} from "../../src/Translations";

export default function ContactSection() {
    const t = useTranslations();
    const [showEmail, setShowEmail] = React.useState(false);

    return (<section className="contact short-section section--white" id="contact">
            <div className="content-container">
                <h1> {t.contact.stayInTouch} </h1>

                <div className="flex-container--row">
                    <div className="flex-item flex-item-paddings margin-right-20 flex-container--column wow zoomIn">
                        <i className="fab fa-twitter big-icon"/>
                        <h3>{t.contact.twitter.title}</h3>
                        <p>{t.contact.twitter.description}</p>
                        <a href="https://twitter.com/ktdotacademy" className="button">@ktdotacademy</a>
                    </div>
                    <div className="flex-item flex-item-paddings margin-right-20 flex-container--column wow zoomIn">
                        <i className="fas fa-envelope big-icon"/>
                        <h3>{t.contact.mail.title}</h3>
                        <p> {t.contact.mail.description} </p>
                        {showEmail ?
                            <a id="contact-clicked" href="mailto:contact@kt.academy" target="_top"
                               className="button"> contact@kt.academy </a>
                            :
                            <div id="contact-button" onClick={() => setShowEmail(true)}
                                 className="button wow swing"> {t.contact.mail.button} </div>
                        }
                    </div>
                    <div className="flex-item flex-item-paddings flex-container--column wow zoomIn">
                        <i className="fas fa-at big-icon"/>
                        <h3>{t.contact.newsletter.title}</h3>
                        <p>{t.contact.newsletter.description}</p>
                        <a href="http://eepurl.com/diMmGv" className="button">{t.contact.newsletter.button}</a>
                    </div>
                </div>
            </div>
        </section>
    );
}