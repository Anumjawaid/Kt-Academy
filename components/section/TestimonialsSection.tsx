import React from "react";
import {useTranslations} from "../../src/Translations";
import Link from "../../src/Link";

export default function TestimonialsSection({}: {}) {
    const t = useTranslations();

    return (
        <section className="testimonials">
            <div className="content-container content-container--full-width">
                <h2> {t.testimonials.subtitle} </h2>
                <div className="flex-container--row">

                    <Testimonial
                        img="/testimonials/MariuszSaramak.jpg"
                        name="Mariusz Saramak"
                        position="Expert Android Developer"
                        company="Tom Tom"
                        testimonial={t.testimonials.saramak}
                    />

                    <Testimonial
                        img="/testimonials/NataliaNazaruk.jpg"
                        name="Natalia Nazaruk"
                        position="IT Developer (Android)"
                        company="Nordea"
                        testimonial={t.testimonials.nazaruk}
                    />

                    <Testimonial
                        img="/testimonials/PatrykGrajewski.jpg"
                        name="Patryk Grajewski"
                        position="Android Software Engineer"
                        company="Sii Poland"
                        testimonial={t.testimonials.grajewski}
                    />

                </div>
                <div className="book-workshop-button">
                    <div>
                        <Link to={"/workshop"}
                              id="testymonials-button"
                              className="button wow fadeInUp page-scroll margin-top-50"> {t.testimonials.button} </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function Testimonial({img, name, position, company, testimonial}: { img: string, testimonial: string, name: string, position: string, company: string }) {
    return <div
        className="flex-item padding-right-testimonials padding-top-30  flex-item--testimonials wow fadeInLeft flex-container--column">
        <div className="flex-container--column">
            <div className="flex-item--image-container">
                <img className="round-photo round-photo-small" src={img}
                     alt={`${name} - Kt.Academy references`}/>
            </div>
            <div className="flex-item margin-top-20">
                <h2 className="margin-bottom-5"> {name} </h2>
                <h3 className="margin-bottom-5"> {position} </h3>
                <h3 className="margin-bottom-5"> {company} </h3>
            </div>
        </div>
        <blockquote
            className="flex-item--flex-start margin-top-30"> {testimonial} </blockquote>
    </div>;
}
