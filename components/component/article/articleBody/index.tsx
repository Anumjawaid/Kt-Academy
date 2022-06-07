import ReactMarkdown from "react-markdown";
import footnotes from "remark-footnotes";
import React from "react";
import gfm from 'remark-gfm';
import math from 'remark-math';
import Tex from 'react-latex';
import HeadingRenderer from "./headingRenderer/HeadingRenderer";
import CodeBlockRenderer from "./codeBlockRenderer/CodeBlockRenderer";
import ParagraphRenderer from "./paragraphRenderer";
import FootnoteReference from "./footnote/FootnoteReference";
import FootnoteDefinition from "./footnote/FootnoteDefinition";
import ListRenderer from "./listRenderer/ListRenderer";
import ArticleImage from './articleImage/ArticleImage';

interface ArticleBodyPropsI {
    text: string;
    articleKey: string;
}

const ArticleBody = ({text, articleKey}: ArticleBodyPropsI) => {
    return <div className="article-body">
        <ReactMarkdown
            plugins={[math, gfm, [footnotes, {inlineNotes: true}]]}
            source={text}
            allowDangerousHtml={true}
            renderers={{
                heading: HeadingRenderer(articleKey, text),
                paragraph: ParagraphRenderer(articleKey, text),
                code: CodeBlockRenderer(articleKey, text),
                list: ListRenderer(articleKey, text),
                image: ArticleImage,
                footnoteReference: FootnoteReference,
                footnoteDefinition: FootnoteDefinition,
                inlineMath: ({value}) => <Tex>{`$${value}$`}</Tex>,
                math: ({value}) => <Tex displayMode={true}>{`$${value}$`}</Tex>
            }}/>
    </div>;
}

export default ArticleBody;