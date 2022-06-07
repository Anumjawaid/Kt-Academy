import {useTranslations} from "../../../../../src/Translations";
import React from "react";
import Swal from "sweetalert2";
import { markdownPropsToText } from "../helper";
import { sendFeedback } from "../../../../../src/Network";
import CommentComponent from "./Comment";

const withComments =  (WrappedComponent) => (articleKey: string, contentMd: string) => (props) => {
    const t = useTranslations();
    const showCommentPopup = () => Swal.fire<string>({
        input: 'textarea',
        inputPlaceholder: t.feedback.prompt,
        inputAttributes: {
            'aria-label': t.feedback.placeholder
        },
        showCancelButton: true
    }).then((text) => {
        const fragment = contentMd.split("\n")
            .slice(props.node.position.start.line - 1, props.node.position.end.line)
            .join("\n")
        if (text.value) {
            const feedback = `Fragment z node:${markdownPropsToText(props)}\n\nFragment z MD: ${fragment}\n\nComment: ${text.value}`;
            sendFeedback(`article-${articleKey}`, feedback)
                .then(() => Swal.fire(t.feedback.thankYou))
        }
    });

    return <WrappedComponent {...props} commentComponent={<CommentComponent showCommentPopup={showCommentPopup}/>} articleKey={articleKey}/>
}

export default withComments;