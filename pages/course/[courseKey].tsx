import {registerPage} from "../../src/Utils";
import React from "react";
import {Course, CourseStep, getLink} from "../../src/Model";
import Header from "../../components/section/Header";
import {CourseListItem, CourseListItemAction} from "../../components/component/course/CourseListItem";
import ContactSection from "../../components/section/ContactSection";
import FooterSection from "../../components/section/FooterSection";
import {requestCourse} from "../../src/Network";
import {getUserUUIDFromRequest} from "../../src/userUuid";
import {Width} from "../../components/section/Banner";
import MediaHeaders from "../../components/MediaHeaders";
import {Lang} from "../../src/Translations";

export async function getServerSideProps({params, locale, req, res}) {
    const course = await requestCourse(params.courseKey, {lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return {props: {course}}
}

export default function CoursePage({course}: { course: Course }) {
    registerPage(`course-${course.key}`);
    const firstClickableStep = course.steps
        .find(step => step.type !== "LINK" && step.state !== "FINISHED")
    const firstClickableStepLink = firstClickableStep && getLink(course.key, firstClickableStep)
    return <>
        <MediaHeaders
            title={course.name}
            description={course.description}
        />
        <Header allowedLangs={[Lang.EN]} banner={{
            img: "/background-img/1-1920x702.png",
            width: Width.Half,
            title: course.name,
            ...(firstClickableStepLink && {
                button: {
                    text: "Start now",
                    to: firstClickableStepLink
                }
            })
        }}/>

        <div className="content-container text-align-left">
            <div style={{marginBottom: "40px"}}>{course.description}</div>
            {course.steps.map(step =>
                <CourseListItem title={step.title}
                                link={getLink(course.key, step)}
                                action={getAction(step)}
                                hint={getHint(step)}/>
            )}

        </div>

        <ContactSection/>
        <FooterSection/>
    </>;
}

function getAction(step: CourseStep): CourseListItemAction {
    if (step.state === "LOCKED") {
        return "locked";
    }
    switch (step.type) {
        case "VIDEO":
            switch (step.state) {
                case "FINISHED":
                    return "finished";
                default:
                    return "play";
            }
        case "LINK":
            return "link";
        case "CHALLENGE":
            switch (step.state) {
                case "READY":
                    return "code";
                case "STARTED":
                    return "code";
                case "FINISHED":
                    return "finished";
            }
    }
    return "play";
}

function getHint(step: CourseStep): string | null {
    if (step.state === "LOCKED") {
        return "This course is only for Kt. Academy workshop attendees. You can find our workshop offer in the workshops section."
    } else {
        return null
    }
}
