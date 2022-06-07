export const VideoView = ({title, videoKey}: { title?: string, videoKey: string }) => <div className="videoWrapper">
    <iframe src={"https://www.youtube-nocookie.com/embed/" + videoKey}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen/>
    {title && <p>{title}</p>}
</div>