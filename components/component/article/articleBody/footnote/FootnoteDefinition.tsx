import React from "react";
import { getFootnoteId } from './helper';
import style from './footnoteDefinition.module.scss';

const FootnoteDefinition = (props): JSX.Element => {
    const id = getFootnoteId(props);

    return (
        <div id={"definition-" + id} className={style.footnoteDefinitionContainer}>
            <a href={"#use-" + id} className={style.footnoteDefinitionLink}>{id}:</a>
            {props.children}
        </div>
    );
}

export default FootnoteDefinition;