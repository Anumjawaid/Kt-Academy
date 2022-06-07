import React, {useMemo} from 'react';
import {registerPage} from "../src/Utils";
import {useTranslations} from "../src/Translations";
import Header from "../components/section/Header";
import FooterSection from "../components/section/FooterSection";
import KotlinPlayground from "../components/component/KotlinPlayground";
import {Width} from "../components/section/Banner";

type Puzzler = {
    code: string
    question: string,
    possibleAnswers: string[],
    correctAnswer: string,
    explanation: string,
}

export default function Puzzler() {
    registerPage("puzzler")
    const t = useTranslations();
    const PUZZLERS: Puzzler[] = useMemo(() => [
        {
            code: `fun main() {
    val x: Int? = 2
    val y: Int = 3

    val sum = x?:0 + y
    println(sum)
}`,
            possibleAnswers: [
                t.puzzler.puzzle1Answers.a,
                t.puzzler.puzzle1Answers.b,
                t.puzzler.puzzle1Answers.c,
                t.puzzler.puzzle1Answers.d,
            ],
            question: t.puzzler.whatPrint,
            correctAnswer: "c) 2",
            explanation: t.puzzler.puzzle1Explanation
        },
        {
            code: `open class C

class D: C()

fun C.foo() = "c"

fun D.foo() = "d"

fun printFoo(c: C) {
    println(c.foo())
}

fun main() {
    printFoo(D())
}`,
            possibleAnswers: [
                t.puzzler.puzzle2Answers.a,
                t.puzzler.puzzle2Answers.b,
                t.puzzler.puzzle2Answers.c,
                t.puzzler.puzzle2Answers.d,
            ],
            question: t.puzzler.whatDisplay,
            correctAnswer: "c) c",
            explanation: t.puzzler.puzzle2Explanation
        }
    ], [t])

    let puzzlerBanner = {
        img: "/background-img/8-1920x702.png",
        width: Width.Half,
        title: t.puzzler.title,
        subtitle: t.puzzler.subtitle,
    };
    return <>
        <Header banner={puzzlerBanner}/>
        <section className="puzzler short-section">
            <div className="content-container">
                <h1>{t.puzzler.whatArePuzzlers}</h1>
                <p>{t.puzzler.description}</p>
                <h1 className="margin-top-30">{t.puzzler.examplesTitle}</h1>
                {PUZZLERS.map((p, i) => <PuzzlerExample key={i} puzzler={p}/>)}
            </div>
        </section>
        <FooterSection/>
    </>;
};

function PuzzlerExample({puzzler}: { puzzler: Puzzler }) {
    const t = useTranslations();
    const {code, question, possibleAnswers, correctAnswer, explanation} = puzzler;

    const [showAnswer, setShowAnswer] = React.useState<boolean>(false);
    const showAnswerClicked = (e) => {
        e.preventDefault()
        setShowAnswer(true)
    }

    let codeLines = code.split(/\r\n|\r|\n/).length;

    return <div className="content-rectangle content-rectangle--white margin-top-30">
        <p className="orange">{t.puzzler.puzzle1Title}</p>
        <div className="flex-container--row">
            <div className="flex-item text-align-left margin-bottom-30" style={{height: codeLines * 15 + 45}}>
                <KotlinPlayground>{code}</KotlinPlayground>
            </div>
            <div className="flex-item">
                <h3> {question} </h3>
                <p className="text-align-left margin-left-50">
                    {possibleAnswers.map((a, i) => <p key={i}>{a}</p>)}
                </p>
            </div>
        </div>
        {showAnswer ?
            <>
                <h3>{t.puzzler.correctAnswer}</h3>
                <p>{correctAnswer}</p>
                <h3>{t.puzzler.explanation}</h3>
                <p>{explanation}</p>
            </>
            :
            <a className="button margin-top-10" onClick={showAnswerClicked}> {t.puzzler.showAnswers} </a>
        }
    </div>;
}
