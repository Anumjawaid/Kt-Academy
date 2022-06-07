import {registerPage} from "../../../../src/Utils";
import React, {useState} from "react";
import {PrevNextBar} from "../../../../components/component/course/PrevNextBar";
import FooterSection from "../../../../components/section/FooterSection";
import Header from "../../../../components/section/Header";
import {VideoView} from "../../../../components/component/course/VideoView";
import {useRouter} from "next/router";
import {changeCourseStepVideoStatus, requestCourse} from "../../../../src/Network";
import {getUserUUIDFromRequest} from "../../../../src/userUuid";
import {Course} from "../../../../src/Model";
import {Lang} from "../../../../src/Translations";

export async function getServerSideProps({params, locale, req, res}) {
    const {courseKey} = params
    const course = await requestCourse(courseKey, {lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return {props: {course}}
}

export default function VideoPage({course}: { course: Course }) {
    const videoKey = useRouter().query.videoKey as string
    registerPage(`video-${videoKey}`);
    const video = course.steps.find(it => it.type === "VIDEO" && it.key === videoKey)
    const videoMarkedAsFinished = video.state === "FINISHED"
    const [done, setDone] = useState(videoMarkedAsFinished)

    if (!video) {
        return <div>Video not found</div>
    }

    const changeState = done ? {
        text: "Mark as undone",
        action: () => {
            setDone(false)
            changeCourseStepVideoStatus(videoKey, "INITIAL")
        }
    } : {
        text: "Mark as done",
        action: () => {
            setDone(true)
            changeCourseStepVideoStatus(videoKey, "SOLVED")
        }
    }

    return <>
        <Header allowedLangs={[Lang.EN]}/>
        <div className="content-container text-align-left" style={{paddingTop: "80px"}}>
            <h1>{video.title}</h1>
            <VideoView videoKey={videoKey}/>
            <div style={{display: "flex", margin: "10px"}}>
                {done &&
                <div style={{flex: 1, textAlign: "right", color: "#4dbb5f"}}>
                    Watched <i className="far fa-check-circle"/>
                </div>
                }
            </div>
            <PrevNextBar course={course} stepKey={videoKey} stepType={"VIDEO"} changeState={changeState}/>
        </div>
        <FooterSection/>
    </>;
};
