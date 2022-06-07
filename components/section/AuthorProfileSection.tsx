import React from "react";
import ReactMarkdown from "react-markdown";
import {useBio, User, Video} from "../../src/Model";
import {isBrowser} from "../../src/Utils";
import {SocialMediaIcons} from "../component/SocialMediaIcons";

type Props = {
    title: string
    user: User
    titleIcon?: string
    bioOverride?: string
};

export default function AuthorProfileSection({title, user, titleIcon, bioOverride}: Props) {
    const bio = bioOverride ?? useBio(user)
    return <section className="trainer gradient--full-section" id="trainer">
        <div className="content-container flex-container--row">
            <div className="flex-item--image-container">
                {user.trainer && user.trainer.promotionVideos && user.trainer.promotionVideos.length !== 0 &&
                <Videos videos={user.trainer.promotionVideos!}/> ||
                user.imageUrl &&
                <img className="round-photo wow zoomIn" src={user.imageUrl} alt={user.displayName}/>}
            </div>
            <div className="flex-item--right padding-left-40">
                <div className="flex-container--row title margin-bottom-20">
                    {titleIcon && <i className={titleIcon}/>}
                    <h2>{title}</h2>
                </div>
                <h3>{user.displayName}</h3>
                <SocialMediaIcons socialMedia={user.socialMedia}/>
                <ReactMarkdown source={bio}/>
            </div>
        </div>
    </section>
}

declare global {
    interface Window {
        displayModal(any): void;
    }
}

type VideosProps = {
    videos: Video[]
};

function Videos({videos}: VideosProps) {
    const [currentVideos, setVideos] = React.useState(videos);

    const swapVideo = (video: Video) => {
        const list = [...videos!]
        const pos = list.indexOf(video)
        const temp = list[0];
        list[0] = list[pos];
        list[pos] = temp;
        setVideos(list)
    }

    return (<div>
        <div className="video-container">
            <iframe id="yt-big" width="500" height="280"
                    src={"https://www.youtube.com/embed/" + currentVideos[0].ytCode}
                    onClick={(any) => {
                        if (isBrowser()) window.displayModal(any)
                    }}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    style={{zIndex: "auto"}}
                    allowFullScreen/>
        </div>
        <div className="flex-container--row space-between margin-top-20 yt-movies">
            {currentVideos.slice(1).map((v, i) => <VideoIcon key={i} onClick={swapVideo} video={v}/>)}
        </div>
    </div>);
}

function VideoIcon({video, onClick}: { video: Video, onClick: (Video) => void }) {
    return (
        <video className="margin-top-10 margin-right-5" width="140" height="80"
               src={"https://www.youtube.com/embed/" + video.ytCode}
               onClick={() => onClick(video)} autoPlay poster={"/images/yt_banners/" + video.posterImg}/>
    );
}