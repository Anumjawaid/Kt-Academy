import React from "react";
import {useTranslations} from "../../src/Translations";
import Link from "../../src/Link";
import {User} from "../../src/Model";

export default function TrainersSection({trainers}: { trainers: User[] }) {
    const t = useTranslations();

    return trainers &&
        <section className="testimonials">
            <div className="content-container content-container--full-width">
                <h2> {t.trainers.sectionTitle} </h2>
                <div className="flex-container--row">

                    {trainers.map(trainer =>
                        <Trainer
                            key={trainer.id}
                            img={trainer.imageUrl}
                            name={trainer.displayName}
                            description={trainer.trainer.shortDescription}
                            publicKey={trainer.publicKey}/>
                    )}

                </div>
                {/*<div className="book-workshop-button">*/}
                {/*    <Link to={"/workshop"}*/}
                {/*          id="testymonials-button"*/}
                {/*          className="button wow fadeInUp page-scroll margin-top-50"> {t.testimonials.button} </Link>*/}
                {/*</div>*/}
            </div>
        </section>
}

function Trainer({img, name, publicKey, description}: { img: string, name: string, publicKey: string, description: string }) {
    return <div className="flex-item trainer-trainers wow fadeInLeft flex-container--column flex-direction-row">
        <div className="flex-container--column">
            <div className="flex-item--image-container">
                <img className="round-photo round-photo-small"
                     style={{height: "200px", width: "200px"}}
                     src={img}
                     alt={`${name} - Kt.Academy references`}/>
            </div>
            <div className="flex-item margin-top-20">
                <h2 className="margin-bottom-20"> {name} </h2>
                <h5 className="margin-bottom-20"> {description} </h5>
                <Link to={`/user/${publicKey}`} className="margin-top-20">
                    <div className="button light">
                        See profile
                    </div>
                </Link>
            </div>
        </div>
    </div>;
}
