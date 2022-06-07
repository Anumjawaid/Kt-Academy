import {registerPage} from "../src/Utils";
import {Lang, useTranslations} from "../src/Translations";
import {useUserSelf} from "../src/Hooks";
import React from "react";
import {LoadingPage} from "../src/Loading";
import Header from "../components/section/Header";
import {VideoView} from "../components/component/course/VideoView";
import FooterSection from "../components/section/FooterSection";
import Link from "../src/Link";
import {isAdmin} from "../src/Model";


export default function MaterialsPage() {
    registerPage(`materials`)
    const t = useTranslations();
    const user = useUserSelf()

    if (user === undefined) {
        return <LoadingPage/>
    }

    if (user === null) {
        return <div style={{textAlign: "center"}}>
            Log in to see the materials (using floating action menu on the right-bottom corner)
        </div>
    }

    if (!(isAdmin(user) || user.tags.includes("KOTLIN_WORKSHOP_ATTENDEE"))) {
        return <>
            <div style={{textAlign: "center"}}>Sorry, you are not allowed to access this section.</div>
            <div style={{textAlign: "center"}}>
                If you attended any workshop by Kt. Academy or by Marcin Moskała, contact us using "Send private
                feedback"
                on the floating action menu.
            </div>
        </>
    }

    return <>
        <Header allowedLangs={[Lang.EN]}/>
        <div className="content-container" style={{paddingTop: "80px"}}>
            <h1>Materials</h1>
            <p>Here are materials exclusive for Kt. Academy workshop attendees</p>
            <div>
                <LinkParagraph text="Cheat Sheet" to="/Kotlin_Cheat_Sheet_Full.pdf"/>
                <LinkParagraph text="Coroutines Cheat Sheet" to="/Kotlin_Coroutines_Cheat_Sheet.pdf"/>
            </div>

            <div>
                <ExpandableTitle title="To stay up to date:">
                    <LinkParagraph text="Kotlin Twitter" to="https://twitter.com/kotlin"/>
                    <LinkParagraph text="Kotlin Reddit" to="https://www.reddit.com/r/Kotlin/"/>
                    <LinkParagraph text="Kotlin Slack"
                                   to="https://surveys.jetbrains.com/s3/kotlin-slack-sign-up?_ga=2.250217858.500119251.1600534868-1993516589.1588749989"/>
                    <LinkParagraph text="Kotlin Talks" to="https://kotlinlang.org/community/talks.html?time=all"/>
                    <LinkParagraph text="JetBrains blog" to="https://blog.jetbrains.com/kotlin/"/>
                    <LinkParagraph text="Kotlin Weekly" to="http://www.kotlinweekly.net/"/>
                    <LinkParagraph text="Kt. Academy blog" to="https://blog.kotlin-academy.com/"/>
                </ExpandableTitle>
            </div>

            <div>
                <h2>Kotlin Development</h2>
                <LinkParagraph text="Workshop slides"
                               to="https://docs.google.com/presentation/d/1w_qcoA4uKBv35ehPaQsDdCwzxC3qlnHuucLPBB7vuCk/edit?usp=sharing"/>
                <ExpandableTitle title="Recordings:">
                    <VideoView title="Functions" videoKey="fVxIaolQIjI"/>
                    <VideoView title="Control Structures" videoKey="hhFKZVLbPDk"/>
                    <VideoView title="Null safety" videoKey="MwCFwpWAvio"/>
                    <VideoView title="Classes and properties" videoKey="zGJB1NS2nmc"/>
                    <VideoView title="Extension Functions" videoKey="BNB7_fYz8Xo"/>
                    <VideoView title="Typing System" videoKey="rvROB5eiztw"/>
                    <VideoView title="Collection processing" videoKey="qc35Vog9YDs"/>
                    <VideoView title="Operator overloading" videoKey="gF4BmcRABi0"/>
                    <VideoView title="DSL and Scope Functions" videoKey="uZc6qpXxsHc"/>
                    <VideoView title="Delegation" videoKey="1h4GLIP-rEo"/>
                    <VideoView title="Kotlin and Java interoperability" videoKey="Au29CtEPZi4"/>
                    <VideoView title="Generics" videoKey="FYZ0Dbr292A"/>
                    <VideoView title="Extra: Multiplatform Development" videoKey="_TaQO2O_V0Y"/>
                </ExpandableTitle>
            </div>
            <div>
                <h2>Kotlin Coroutines</h2>

                <LinkParagraph text="Workshop slides"
                               to="https://docs.google.com/presentation/d/13Ue3hTEUdRAwFOV5ShumwZBStbHz39YW3SjVMizNPQg/edit?usp=sharing"/>

                <p>To learn coroutines by yourself, here are my recommendations:</p>

                <ExpandableTitle title="To learn by practice:">
                    <LinkParagraph text="JetBrains hand-on's"
                                   to="https://play.kotlinlang.org/hands-on/Introduction%20to%20Coroutines%20and%20Channels/01_Introduction"/>
                    <LinkParagraph text="Google Labs: Use Kotlin Coroutines in your Android App"
                                   to="https://codelabs.developers.google.com/codelabs/kotlin-coroutines/index.html"/>
                    <LinkParagraph text="Google Labs: Learn advanced coroutines with Kotlin Flow and LiveData"
                                   to="https://codelabs.developers.google.com/codelabs/advanced-kotlin-coroutines/index.html"/>
                </ExpandableTitle>

                <ExpandableTitle title="To learn theory:">
                    <LinkParagraph text="All presentations by Roman Elizarov"
                                   to="https://www.youtube.com/results?search_query=kotlin+coroutines+roman+elizarov+"/>
                    <LinkParagraph text="Android Docs about coroutines performance"
                                   to="https://developer.android.com/kotlin/coroutines-adv"/>

                    <p> Google IO about coroutines in Android:</p>
                    <VideoView videoKey="BOHK_w09pVA"/>
                    <VideoView videoKey="B8ppnjGPAGE"/>
                    <VideoView videoKey="KMb0Fs8rCRs"/>

                    <VideoView title="Great presentation about testing coroutines" videoKey="hMFwNLVK8HU"/>
                    <VideoView title="To understand how do they work under the hood" videoKey="DOoJnJJnAG4"/>
                    <VideoView title="Making a KTX library" videoKey="pUtC4nLEXjI"/>
                    <VideoView title="Introduction to flow" videoKey="xV1XRakSoWI"/>
                </ExpandableTitle>

            </div>

        </div>
        <FooterSection/>
    </>;
};

const ExpandableTitle: React.FunctionComponent<{ title?: string }> = ({children, title}) => {
    const [expanded, setExpanded] = React.useState<boolean>(false);

    return <>
        <h4 onClick={() => setExpanded(!expanded)}>{title + " " + (expanded ? "(click to hide)" : "(click to show)")}</h4>
        {expanded && children}
    </>
}

const LinkParagraph = ({to, text}: { to: string, text: string }) => <p><Link to={to}>{text}</Link></p>;