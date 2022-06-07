import React, {useMemo} from 'react';
import Swal from "sweetalert2";
import ReactMarkdown from "react-markdown";
import {registerPage} from "../../../../src/Utils";
import {Challenge, ChallengeStatus, Course} from "../../../../src/Model";
import {requestChallenge, requestCourse, saveUserChallenge} from "../../../../src/Network";
import FooterSection from "../../../../components/section/FooterSection";
import {PrevNextBar} from "../../../../components/component/course/PrevNextBar";
import Header from "../../../../components/section/Header";
import {useFeedbackPopup} from "../../../../src/Popups";
import KotlinPlayground from "../../../../components/component/KotlinPlayground";
import {getUserUUIDFromRequest} from "../../../../src/userUuid";
import {Lang} from "../../../../src/Translations";

type CodeEditorInstance = {
    state: string,
    getCode: () => string
}

export async function getServerSideProps({params, locale, req, res}) {
    const {courseKey, challengeKey} = params
    const course = await requestCourse(courseKey, {lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    const challenge = await requestChallenge(challengeKey, {lang: locale, userUuid: getUserUUIDFromRequest(req, res)})
    return {props: {course, challenge}}
}

export default function ChallengePage({course, challenge}: { course: Course, challenge: Challenge }) {
    const pageKey = `challenge-${course.key}-${challenge.key}`
    registerPage(pageKey)

    const showFeedbackPopup = useFeedbackPopup(pageKey)
    const [code, setCode] = React.useState<string>(dropTestsCode(challenge.code));
    const [showCode, setShowCode] = React.useState<string>(dropTestsCode(challenge.code));

    const [platform, setPlatform] = React.useState<"junit" | "java">("junit");
    const [challengeStatus, setChallengeStatus] = React.useState<ChallengeStatus | undefined>(challenge?.status);

    const options = useMemo(() => {
        let codeEditorInstance: CodeEditorInstance
        let codeVariable: string
        let differences: number = 0
        return {
            version: '1.4.00',
            onChange: (visibleCode: string) => {
                const realCode = dropTestsCode(visibleCode)
                setCode(realCode)
                if (codeVariable && realCode) {
                    differences += Math.abs(codeVariable.length - realCode.length)
                    if (differences > 10) {
                        differences = 0
                        saveUserChallenge(challenge.key, {code: realCode})
                    }
                }
                codeVariable = realCode
            },
            onTestPassed: () => {
                saveUserChallenge(challenge.key, {code: codeVariable, status: "SOLVED"})
                    .then(r => {
                        if (r.status === 401) {
                            Swal.fire("Congratulations", "To save your progress, you need to login using right-bottom floating button")
                        }
                    })
                    .then((_) => setChallengeStatus("SOLVED"))

            },
            getInstance: (instance: CodeEditorInstance) => {
                if (instance) codeEditorInstance = instance
            }
        }
    }, [])

    const onSave = () => {
        if (code) saveUserChallenge(challenge.key, {code: dropTestsCode(code), status: challengeStatus})
            .then(r => {
                if (r.status === 401) {
                    Swal.fire("To save your code, you need to login using right-bottom floating button")
                }
            })
    }

    const onRestore = () => {
        Swal.fire({
            title: 'Are you sure that you want to restore?',
            text: "You will lose all the progress you made!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, restore'
        }).then((_) => {
            saveUserChallenge(challenge.key, {code: challenge?.originalCode, status: "INITIAL"})
                .then((_) => window.location.reload())
        })
    }

    const switchPlatform = () => {
        if (platform !== "junit") {
            setPlatform("junit")
        } else {
            let newCode = code ?? ""
            if (!newCode.includes("fun main(")) {
                newCode += EXTRA_MAIN_SUFFIX
            }
            setShowCode(newCode);
            setPlatform("java")
        }
    }

    const addTests = () => {
        setShowCode(code + EXTRA_TESTS_SUFFIX);
    }
    const showAddTests = !(code?.includes("class MoreTests"))

    // noinspection HtmlUnknownAttribute
    return <>
        <Header allowedLangs={[Lang.EN]}/>
        <div className="content-container text-align-left" style={{paddingTop: "80px"}}>
            <h1>{challenge.title}</h1>

            <KotlinPlayground key={challenge.key + "-" + showCode + "-" + platform}
                              dataTargetPlatform={platform} options={options}>
                {`
${challenge.codeTests}
${SPLITTING_COMMENT}
//sampleStart
${showCode}
//sampleEnd
                `}
            </KotlinPlayground>

            <div style={{display: "flex", margin: "10px"}}>
                <div style={{flex: 1}}>
                    <a onClick={(_) => onSave()}>Save</a> <a onClick={(_) => onRestore()}>Restore</a> {showAddTests &&
                <a
                    onClick={(_) => addTests()}>Add own tests</a>} <a onClick={(_) => switchPlatform()}>Switch
                    to {platform === "junit" ? "main" : "tests" /*Use https://www.npmjs.com/package/react-switch*/}</a>
                    <a onClick={showFeedbackPopup}>{" Feedback"}</a>
                </div>
                {challengeStatus === "SOLVED" &&
                <div style={{flex: 1, textAlign: "right", color: "#4dbb5f"}}>
                    Solved <i className="far fa-check-circle"/>
                </div>
                }
            </div>

            <br/>

            <ReactMarkdown source={challenge.description}/>

            <br/>

            <PrevNextBar course={course} stepKey={challenge.key} stepType={"CHALLENGE"}/>
        </div>
        <FooterSection/>
    </>;
}

function dropTestsCode(code: string) {
    const splittingCodeIndex = code.indexOf(SPLITTING_COMMENT);
    if (splittingCodeIndex == -1) {
        return code
    }
    const realCodeStart = splittingCodeIndex + SPLITTING_COMMENT.length + 1 // (\n)
    return code.substr(realCodeStart)
}

const SPLITTING_COMMENT = "// Your code starts here"

const EXTRA_TESTS_SUFFIX = `

class MoreTests() {
    @Test fun \`your test here\`() {
        assertEquals(true, false)
    }
}
`

const EXTRA_MAIN_SUFFIX = `

fun main() {
    println("Hello, world")
}
`
