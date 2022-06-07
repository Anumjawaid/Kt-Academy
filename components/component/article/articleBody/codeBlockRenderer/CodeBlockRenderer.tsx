import KotlinPlayground from "../../../KotlinPlayground";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import withComments from "../comment/withComments.hoc";
import style from './codeBlockRenderer.module.scss';

const CodeBlock =  ({language, value, articleKey, commentComponent}): JSX.Element => {
    if (language === 'kotlin') {
        return value.trim().startsWith("import") || value.trim().startsWith("fun main() {") ?
            <div className={style.codeBlock}>
                <KotlinPlayground
                    args={articleKey} // to prevent keeping the same snippet when moving between articles with Next/Prev
                    className="code">
                    {value}
                </KotlinPlayground>
                {commentComponent}
            </div>
            :
            <div className={style.codeBlock}>
                <KotlinPlayground
                    readOnly={true}
                    args={articleKey} // to prevent keeping the same snippet when moving between articles with Next/Prev
                    className="code">
                    {value}
                </KotlinPlayground>
                {commentComponent}
            </div>

    }

    return (
        <div className={style.codeBlock}>
            <SyntaxHighlighter language={language} className="code">
                {value}
            </SyntaxHighlighter>
            {commentComponent}
        </div>
    )
}

export default withComments(CodeBlock);



