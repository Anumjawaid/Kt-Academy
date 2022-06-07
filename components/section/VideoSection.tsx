import React from "react";

export function VideoSection({title, videoKeys, index = 0, id = "video"}: { title: string, videoKeys: string[], index: number, id?: string }) {
    return <section id={id} className={index % 2 == 0 ? "section--white" : ""}>
        <div className="content-container left">
            <h2>{title}</h2>

            {videoKeys.map((videoKey, keyIndex) =>
                <div className="videoWrapper margin-top-30">
                    <iframe src={"https://www.youtube-nocookie.com/embed/" + videoKey}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>
            )}
        </div>
    </section>;
}