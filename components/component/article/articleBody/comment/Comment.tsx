import React from "react";
import style from './comment.module.scss';

const CommentComponent = ({ showCommentPopup }): JSX.Element => (
    <i className={`article-comment far fa-comment ${style.commentIcon}`} onClick={showCommentPopup} />
);

export default CommentComponent;