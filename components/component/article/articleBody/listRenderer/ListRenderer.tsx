import withComments from "../comment/withComments.hoc";
import style from "./listRenderer.module.scss";

interface ListRendererPropsI {
    commentComponent: JSX.Element;
    children: JSX.Element[],
}

const ListRenderer =  ({ children, commentComponent}: ListRendererPropsI): JSX.Element => {
    const renderList = () => children.map(el => {
        const elChildren = el.props.children
        if (elChildren[0].props.node?.type.includes("paragraph")) {
            return el
        }
        let className = style.listElement

        if (elChildren[elChildren.length - 1].props.node?.type.includes("list")) {
            className = style.listParent
        }

        return (
            <div className={className}>
                {el}
                {commentComponent}
            </div>
        )
    })

    return (
        <div className={style.listRenderer}>
            <ul>
                {renderList()}
            </ul>
        </div>
    )
}

export default withComments(ListRenderer);