import { useForm } from "react-hook-form";
import { useSimpleCookieState } from "../../../../../src/UseSimpleCookieState";
import { useTranslations } from "../../../../../src/Translations";
import { sendFeedback } from "../../../../../src/Network";
import Swal from "sweetalert2";
import React from "react";

type Answer = { answer: string }

const ArticleQuestion = ({pageKey, question}: { pageKey: string, question: string }) => {
    const {register, handleSubmit} = useForm<Answer>();
    const [answered, setAnswered] = useSimpleCookieState<boolean>(false, pageKey + "-question")
    const t = useTranslations()

    const onSubmit = (data: Answer) => {
        sendFeedback(pageKey, `Question: ${question}\n\nAnswer: ${data.answer}`)
            .then(() => Swal.fire(t.feedback.thankYou))
            .then(
                (_) => {
                    setAnswered(true)
                },
                (error) => {
                    setAnswered(true)
                    console.log(error)
                }
            )
    }

    return <>
        {!answered && <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>

                <fieldset style={{marginBottom: "5px"}}>
                    <label htmlFor="answer">{question}</label>
                    <textarea name="answer" rows={7} id="answer" ref={register} placeholder=""/>
                </fieldset>

                <input type="submit" className="button button--mini" id="submit"
                       style={{position: "relative", right: "50%", left: "45%", marginBottom: "20px"}}
                       value={t.form.submit}/>
            </form>
        </div>}
    </>
};

export default ArticleQuestion;