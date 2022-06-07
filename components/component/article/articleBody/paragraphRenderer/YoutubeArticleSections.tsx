interface YouTubeArticleSectionI {
    videoKey: string;
}

const YouTubeArticleSection = ({ videoKey }: YouTubeArticleSectionI): JSX.Element => {
    return <>
        <div className="videoWrapper margin-top-30">
            <iframe src={"https://www.youtube-nocookie.com/embed/" + videoKey}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen/>
        </div>
    </>
};

export default YouTubeArticleSection;