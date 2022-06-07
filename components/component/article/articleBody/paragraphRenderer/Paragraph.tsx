import withComments from '../comment/withComments.hoc';
import style from './paragraph.module.scss';

const Paragraph = ({ children, commentComponent}): JSX.Element => {
    return (
        <div className={style.paragraphContainer}>
            <p className={style.paragraph}>
                {children}
            </p>
            {commentComponent}
        </div>
    );
}

export default Paragraph;