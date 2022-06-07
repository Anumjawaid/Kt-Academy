import React from "react";
import {Tooltip} from 'react-tippy';
import Link from "../../../src/Link";

export type CourseListItemAction = "locked" | "play" | "finished" | "link" | "code";

type CourseListItemParams = {
    title: string,
    smallText?: string,
    action: CourseListItemAction,
    link: string | null,
    hint?: string | null
}

export const CourseListItem = ({title, smallText = "", action, link, hint}: CourseListItemParams) => <>
    <Tooltip
        title={hint ?? ""}
        position="bottom"
        trigger="mouseenter"
        disabled={!hint}>
        <Link style={{
            display: "inline-block",
            width: "calc(100% - 16px)",
            margin: "8px",
            fontSize: "16px",
            backgroundColor: "#f5f5f5",
            borderRadius: "2px",
            boxShadow: "inset 0 1px #fff, inset 0 -1px rgba(119,110,110,0.4), 0 3px 7px rgba(27,43,106,0.16)",
            position: "relative",
            transition: "box-shadow 0.3s, background-color 0.3s, -webkit-box-shadow 0.3s",
            minHeight: "56px",
            minWidth: "56px",
            verticalAlign: "top"
        }}
              to={link}
              tabIndex={0}>
              <span style={{
                  "padding": "16px",
                  "width": "805px",
                  "maxWidth": "100%",
                  "WebkitBoxSizing": "border-box",
                  "boxSizing": "border-box",
                  "overflowWrap": "break-word",
                  "color": "var(--blue-color)",
                  "font": "600 16px / 24px Montserrat, Arial, sans-serif",
                  "textDecoration": "none",
                  "position": "relative",
                  "WebkitTransition": "color 0.3s",
                  "transition": "color 0.3s",
                  "minHeight": "24px",
                  "display": "inline-block",
                  "WebkitTapHighlightColor": "transparent",
                  "outline": "none"
              }}>
                  {title}
              </span>
            <div style={{
                "color": "rgb(66, 66, 66)",
                "cursor": "pointer",
                "display": "flex",
                "float": "right",
                "fontFamily": "Roboto, Arial, sans-serif",
                "fontSize": "16px",
                "fontStretch": "100%",
                "fontStyle": "normal",
                "fontVariantCaps": "normal",
                "fontVariantEastAsian": "normal",
                "fontVariantLigatures": "normal",
                "fontVariantNumeric": "normal",
                "lineHeight": "24px",
                "marginBottom": "4px",
                "marginLeft": "4px",
                "marginRight": "4px",
                "marginTop": "4px",
                "textSizeAdjust": "100%",
                "WebkitFontSmoothing": "antialiased",
                "WebkitTapHighlightColor": "rgba(0, 0, 0, 0)"
            }}>
                <span style={{
                    "padding": "0",
                    "color": "rgba(66,66,66,0.54)",
                    "font": "700 16px / 24px Roboto, Arial, sans-serif",
                    "height": "24px",
                    "margin": "12px"
                }}>{smallText}</span>
                <div style={{
                    "height": "40px",
                    "width": "40px",
                    "margin": "4px",
                    "position": "relative",
                    "display": "inline-flex",
                    "WebkitBoxPack": "center",
                    "justifyContent": "center",
                    "WebkitBoxAlign": "center",
                    "alignItems": "center",
                    "borderRadius": "50%",
                    "backgroundPosition": "center",
                    "verticalAlign": "top",
                    "font": "600 16px Montserrat, Arial, sans-serif",
                    "cursor": "inherit"
                }}>
                    <div style={{
                        "height": "40px",
                        "width": "40px",
                        "margin": "4px",
                        "position": "relative",
                        "display": "inline-flex",
                        "WebkitBoxPack": "center",
                        "justifyContent": "center",
                        "WebkitBoxAlign": "center",
                        "alignItems": "center",
                        "backgroundPosition": "center",
                        "verticalAlign": "top",
                        "font": "600 26px Montserrat, Arial, sans-serif",
                        "cursor": "inherit"
                    }}>
                        <i className={getRightIcon(action)}/>
                    </div>
                </div>
            </div>
        </Link>
    </Tooltip>
</>;

function getRightIcon(action: CourseListItemAction): string {
    switch (action) {
        case "locked":
            return "fas fa-lock";
        case "play":
            return "far fa-play-circle";
        case "code":
            return "fas fa-code";
        case "finished":
            return "far fa-check-circle";
        case "link":
            return "fas fa-link";
    }
}