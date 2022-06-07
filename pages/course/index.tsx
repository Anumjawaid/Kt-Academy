import React, {useEffect, useState} from "react";
import {Course, CourseState} from "../../src/Model";
import Header from "../../components/section/Header";
import ContactSection from "../../components/section/ContactSection";
import FooterSection from "../../components/section/FooterSection";
import {CourseListItem, CourseListItemAction} from "../../components/component/course/CourseListItem";
import {requestCourses} from "../../src/Network";
import {getUserUUID, getUserUUIDFromRequest} from "../../src/userUuid";
import {Width} from "../../components/section/Banner";
import {Lang, useLang} from "../../src/Translations";
import {useGlobalState} from "../../src/GlobalState";

export async function getServerSideProps({locale, req, res}) {
    const courses = await requestCourses({lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return {props: {courses}}
}

export default function CoursesPage(prop: { courses: Course[] }) {
    const {user} = useGlobalState()
    const [courses, setCourses] = useState<Course[]>(prop.courses)
    const lang = useLang()

    useEffect(() => {
        console.log("Updating courses")
        requestCourses({lang: lang.key, userUuid: getUserUUID()})
            .then(setCourses)
    }, [user])

    return <>
        <Header allowedLangs={[Lang.EN]} banner={{
            img: "background-img/1-1920x702.png",
            width: Width.Half,
            title: "Courses",
            subtitle: "Our special learning place"
        }}/>

        <div className="content-container text-align-left">
            {courses.map(course =>
                <CourseListItem title={course.name}
                                link={`/course/${course.key}`}
                                action={getAction(course.state)}
                                hint={getHint(course.state)}
                                key={course.key}/>
            )}
        </div>

        <ContactSection/>
        <FooterSection/>
    </>;
}

function getAction(state: CourseState): CourseListItemAction {
    switch (state) {
        case "LOCKED":
            return "locked";
        case "READY":
            return "play";
        case "STARTED":
            return "play";
        case "FINISHED":
            return "finished";
    }
    return "locked"
}


function getHint(state: CourseState): string | null {
    if (state === "LOCKED") {
        return "This course is only for Kt. Academy workshop attendees. You can see a list of resources, but you cannot access them."
    } else {
        return null
    }
}
