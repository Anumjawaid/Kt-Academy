import React from "react";
import {useTranslations} from "../../src/Translations";
import {CommentElement, CommentsCollection, User} from "../../src/Model";
import {useComments} from "../../src/Hooks";
import {MultilineTextEdit} from "../component/form/TextEdit";
import {useForm} from "react-hook-form";
import {showErrorDialog} from "../../src/Popups";
import {requestAddComment, requestDeleteComment} from "../../src/Network";
import {useGlobalState} from "../../src/GlobalState";
import {LoginButton} from "../page/LoginRequiredPage";
import {AuthorBox} from "../component/AuthorBox";
import ReactMarkdown from "react-markdown";

export default function CommentsSection({collectionKey}: { collectionKey: string }) {
    const [comments, setComments] = useComments(collectionKey)
    const {user} = useGlobalState()
    const t = useTranslations();

    return <section className="comments section--white">
        {user
            ? <AddComment collectionKey={collectionKey} setComments={setComments}/>
            : <div style={{margin: "auto", textAlign: "center"}}>
                <LoginButton text={t.comment.login}/>
            </div>
        }
        {comments && comments.elements.length > 0 &&
            <div className="content-container content-container--full-width">
                <h2> {t.comment.title} </h2>
                <div className="comments">

                    {comments.elements.map((comment) =>
                        <Comment
                            key={comment.id}
                            comment={comment}
                            user={user}
                            setComments={setComments}/>
                    )}

                </div>
            </div>}
    </section>
}

type AddCommentForm = {
    comment: string
}

function AddComment({
                        collectionKey,
                        setComments
                    }: { collectionKey: string, setComments: (col: CommentsCollection) => void }) {
    const t = useTranslations();
    const [buttonEnabled, setButtonEnabled] = React.useState(true);
    const {register, handleSubmit, errors, reset} = useForm<AddCommentForm>()
    const onSubmit = (data: AddCommentForm) => {
        if (!buttonEnabled) {
            return
        }
        setButtonEnabled(false)
        requestAddComment(collectionKey, data)
            .then(
                (comments) => {
                    setButtonEnabled(true)
                    setComments(comments)
                    reset()
                },
                (error) => {
                    setButtonEnabled(true)
                    console.log(error)
                    showErrorDialog(t.form.dialogError)
                }
            )
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="form">
        <MultilineTextEdit
            question={t.comment.prompt}
            fieldName="comment"
            register={register}
            errors={errors}/>

        <input type="submit" className="button button--mini" id="submit"
               style={{position: "relative", right: "50%", left: "40%"}}
               value={t.form.submit}/>
    </form>
}

function Comment({
                     comment,
                     user,
                     setComments
                 }: { comment: CommentElement, user: User | null, setComments: (col: CommentsCollection) => void }) {
    const t = useTranslations();
    const onDelete = () => {
        requestDeleteComment(comment.collectionKey, comment.id)
            .then(
                (comments) => {
                    setComments(comments)
                },
                (error) => {
                    console.log(error)
                    showErrorDialog(t.form.dialogError)
                }
            )
    }
    return <div className="flex-container--column left comment">
        <AuthorBox author={comment.user} publicationDate={comment.date}/>
        <div className="flex-item margin-top-20">
            {user && comment.user.publicKey === user.publicKey &&
                <a className="margin-bottom-20" onClick={onDelete}>{t.comment.delete}</a>
            }
            <ReactMarkdown className="margin-bottom-20" source={comment.comment}/>
        </div>
    </div>
}
