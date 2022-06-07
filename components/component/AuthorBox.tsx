import {PublicUser} from "../../src/Model";
import Link from "../../src/Link";
import React from "react";

export function AuthorBox({author, publicationDate}: { author: PublicUser, publicationDate: string | null }) {
    const date = publicationDate && new Date(publicationDate)
    return <div style={{
        fontSize: "0.8rem",
        display: "flex",
        alignItems: "center",
    }}>
                    <span style={{
                        fontSize: ".8rem",
                        display: "flex",
                        alignItems: "center",
                    }}>
                        <img src={author.imageUrl} alt={author.displayName} style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "13px",
                            borderRadius: "100%",
                        }}/>
                    </span>
        <span style={{paddingTop: "2px"}}>
                        <span className="article-name">
                            <Link to={`/user/${author.publicKey}`} style={{
                                color: "rgba(0, 0, 0, .8) !important",
                                fontSize: "15px !important",
                            }}>{author.displayName}</Link>
                        </span>
            {date && <>
              <br/>
              <span style={{
                  color: "rgba(0, 0, 0, .44)",
                  fontSize: "14.4px !important",
              }}>
                {date.toLocaleDateString()}
                </span>
            </>}
        </span>
    </div>;
}
