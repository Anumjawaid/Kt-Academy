import { Children } from 'react';

const flatten = (text, child) =>
    typeof child === 'string'
        ? text + child
        : Children.toArray(child.props.children).reduce(flatten, text);

export const markdownPropsToText = (props): string => {
    const children = Children.toArray(props.children)
    return children.reduce(flatten, '');
}