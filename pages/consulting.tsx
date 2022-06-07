import React from 'react';
import ReactMarkdown from "react-markdown";
import Swal from "sweetalert2";
import {registerPage} from "../src/Utils";
import {TitledSection} from "../components/section/TitledSection";
import Header from "../components/section/Header";
import FooterSection from "../components/section/FooterSection";

const MarcinPic = "./images/Marcin_Moskala.jpg";
const BartoszPic = "./images/BartoszAllegro.jpeg";
const MarekPic = "./images/MarekK.jpg";
const WlodekPic = "./images/Wlodek_Krakowski.jpg";

export default function ConsultingPage() {
    registerPage("consulting")
    return <>
        <Header/>
        <TitledSection title={"Consulting"}
                       text={"Get the expertise you need to solve your biggest IT challenges! Our experts are ready to help you with any programming problems, they will advice how to deploy the right technology to respond quickly to market needs and will guide you at the beginning of your professional career as a developer.\n" +
                       "\n" +
                       "Do you have questions? Do you need support? Book an online consultation or invite our consultant to your company."}/>
        <div>
            <ConsultingSection title="A/B testing" imgSrc={BartoszPic}
                               description="A/B testing allows you to test business hypotheses in a fast and reliable way. Our consultants have extensive experience in this topic as they’ve implemented the A/B testing process and platform for Allegro, the biggest tech company in Poland and one of the biggest in the world."/>

            <ConsultingSection title="System Design" imgSrc={MarcinPic}
                               description="Complex projects require proper architecture design that both supports dividing parts of the project between teams and easier testing. Here we often need microservices, proper asynchronous messaging, distributed databases. In Allegro, we made such a transition and we can help you make a similar one in your company too."/>

            <ConsultingSection title="Software Architecture" imgSrc={WlodekPic}
                               description="Cleaning the code and maintaining its quality is the best way to improve your work and productivity. What’s more, refactoring towards design patterns will make code architecture more extendable, readable and testable. If you want to make cleaning the code your daily habit, our consultant is ready to show you how to do it."/>

            <ConsultingSection title="Kotlin" imgSrc={MarcinPic}
                               description="For companies introducing or willing to introduce Kotlin. Our consultant is an experienced Android developer, an official Jetbrains' Kotlin training partner and the author of the book “Effective Kotlin”. He will answer any questions you may have about Kotlin in terms of both basic and advanced content."/>

            <ConsultingSection title="Basic programming" imgSrc={MarekPic}
                               description="Becoming a programmer is a difficult task, so it’s good to have some support. Our experienced consultant will help you get started, guide you and give you lessons. He will also answer any questions, clarify your doubts, as well as provide your code review."/>

        </div>

        <FooterSection/>
    </>;
};

function ConsultingSection({title, imgSrc, description}: { title: string, imgSrc: string, description: string }) {
    return <section className="requirements short-section short-list">
        <div className="content-container short-content-container">
            <h2>{title}</h2>
            <PersonImage src={imgSrc}/>
            <ReactMarkdown source={description}/>
            <a onClick={() => showApplicationForm()} className="button margin-top-20">
                Schedule a meeting
            </a>
        </div>
    </section>;
}

export function PersonImage({src = MarcinPic, alt = "Person image"}: { src?: string, alt?: string }) {
    return <div className="flex-item--image-container margin-bottom-20">
        <img className="round-photo round-photo-middle wow zoomIn" src={src} alt={alt}/>
    </div>;
}

async function showApplicationForm() {
    const {value: formValues} = await Swal.fire({
        title: 'Meeting request',
        html:
            '<div>Email</div>' +
            '<input id="swal-input1" class="swal2-input">' +
            '<div>When can we meet?</div>' +
            '<input id="swal-input2" class="swal2-input">' +
            '<div>More about your case</div>' +
            '<input id="swal-input3" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                // @ts-ignore
                document.getElementById('swal-input1')!.value,
                // @ts-ignore
                document.getElementById('swal-input2')!.value
            ]
        }
    })

    // if (formValues) {
    //     Swal.fire(JSON.stringify(formValues))
    // }
}