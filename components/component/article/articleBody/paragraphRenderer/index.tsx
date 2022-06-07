import { markdownPropsToText } from "../helper";
import Paragraph from './Paragraph';
import withComments from '../comment/withComments.hoc';
import YouTubeArticleSection from "./YoutubeArticleSections";
import ArticleQuestion from "./ArticleQuestion";

const questionKeyword = `article-question`
const youtubeKeyword = `youtube`

const ParagraphRenderer = (props) => {
    const commandText = markdownPropsToText(props).trim();

    if (commandText && commandText.startsWith(questionKeyword)) {
        return <ArticleQuestion
            pageKey={props.articleKey}
            question={commandText.substr(questionKeyword.length + 1)}/>
    }
    if (commandText && commandText.startsWith(youtubeKeyword)) {
        return <YouTubeArticleSection
            videoKey={commandText.substr(youtubeKeyword.length + 1).trim()}/>
    }

    return <Paragraph {...props} /> ;
}

export default withComments(ParagraphRenderer);