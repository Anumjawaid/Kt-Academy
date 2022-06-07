import { createElement } from "react";
import styles from './headingRenderer.module.scss';
import withComments from '../comment/withComments.hoc';

interface HeadingRendererPropsI {
    commentComponent: JSX.Element;
    children: JSX.Element;
    level: number;
}

const HeadingRenderer = ({ level, children, commentComponent }: HeadingRendererPropsI): JSX.Element => {
    return createElement('h' + level, {
        className: styles.headingRenderer,
    }, <><span>{children}</span>{commentComponent}</>);
};

export default withComments(HeadingRenderer);