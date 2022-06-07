import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {Tooltip} from "react-tippy";
import {RecommendationElement} from "../../../src/Model";
import {AddRatingBody, callAddRating, callAddRecommendation, requestVideoRecommendations} from "../../../src/Network";
import {useTranslations} from "../../../src/Translations";
import Rating from '@material-ui/lab/Rating';

type RecommendedMusicVideosProps = {
    youtubeVideoKey: string,
    setYoutubeVideoKey: (string) => void
}

export const RecommendedMusicVideos = ({youtubeVideoKey, setYoutubeVideoKey}: RecommendedMusicVideosProps) => {
    const [rating, setRating] = useState<number>(0);
    const [recommendations, setRecommendations] = React.useState<RecommendationElement[]>();

    useEffect(() => {
        requestVideoRecommendations()
            .then(
                (result) => setRecommendations(result.elements),
                (error) => console.log(error)
            )
    }, [])

    const currentVideo = recommendations?.find(v => v.key === youtubeVideoKey)
    const t = useTranslations();

    useEffect(() => {
        if (currentVideo && currentVideo.yourRating) setRating(currentVideo.yourRating)
    }, [currentVideo])

    const onYoutubeValueChange = (event) => {
        setYoutubeVideoKey(event.target.value);
    };

    const onRecommend = () => {
        postRecommend(youtubeVideoKey)
            .then(() => {
                Swal.fire(t.music.recommendationAdded)
                window.location.reload()
            })
    };

    const sendRate = (key: string, body: AddRatingBody) => {
        callAddRating(key, body)
            .then(
                (result) => setRecommendations(result.elements),
                (error) => console.log(error)
            )
    }

    return <div>
        {currentVideo && <>
            <div>{t.music.ratePrompt}</div>
            <Rating name="size-medium"
                    value={rating}
                    onChange={(event, newValue) => {
                        if (!newValue) return
                        setRating(newValue);
                        sendRate(youtubeVideoKey, {rating: newValue})
                    }}/>
            <br/>
        </>}
        <br/>
        {t.music.youtubeKey}<input name="VideoKey" value={youtubeVideoKey} onChange={onYoutubeValueChange} min="1"/>
        {recommendations && <>
            <br/>
            <br/>
            {!recommendations.find(r => r.key === youtubeVideoKey) && <>
                <button onClick={onRecommend}>{t.music.recommendButton}</button>
                <br/>
                <br/>
            </>}
            <div>{t.music.recommendationsList}</div>
            {recommendations.map(r => <Recommendation key={`${r.key}-${r.blocked}-${r.favourite}`} recommendation={r}
                                                      setYoutubeVideoKey={setYoutubeVideoKey} sendRate={sendRate}/>)}
        </>}
    </div>;
};

type RecommendationProps = {
    recommendation: RecommendationElement,
    setYoutubeVideoKey: (youTubeKey: string) => void,
    sendRate: (key: string, body: AddRatingBody) => void
};

function Recommendation({recommendation, setYoutubeVideoKey, sendRate}: RecommendationProps) {
    const key = recommendation.key
    const [favourite, setFavouriteVar] = useState(recommendation.favourite);
    const [blocked, setBlockedVar] = useState(recommendation.blocked);
    const [hover, setHover] = useState(false);
    const t = useTranslations();

    const setBlocked = (value: boolean) => {
        setBlockedVar(value)
        sendRate(key, {blocked: value})
    }
    const setFavourite = (value: boolean) => {
        setFavouriteVar(value)
        sendRate(key, {favourite: value})
    }

    return <div
        className="margin-top-10"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>

        {blocked &&
        <Tooltip title={t.music.blocked} trigger="mouseenter">
            <i className="fas fa-minus-circle margin-right-5 clickable" onClick={() => setBlocked(false)}/>
        </Tooltip>
        }

        {hover && !blocked &&
        <Tooltip title={t.music.block} trigger="mouseenter">
            <i className="fas fa-minus-circle margin-right-5 clickable" onClick={() => setBlocked(true)}/>
        </Tooltip>
        }

        {favourite &&
        <Tooltip title={t.music.favourite} trigger="mouseenter">
            <i className="fas fa-heart margin-right-5 clickable" onClick={() => setFavourite(false)}/>
        </Tooltip>
        }

        {hover && !favourite &&
        <Tooltip title={t.music.makeFavourite} trigger="mouseenter">
            <i className="far fa-heart margin-right-5 clickable" onClick={() => setFavourite(true)}/>
        </Tooltip>
        }

        <div className="clickable inline"
             onClick={() => setYoutubeVideoKey(recommendation.key)}>
            {`${recommendation.data.title} ${recommendation.averageRating.toFixed(1)}/5 (${recommendation.ratingsNum})`}
        </div>
    </div>;
}

type YouTubeResponse = {
    thumbnail_url: string,
    url: string,
    title: string,
}

function fetchVideoData(key: string): Promise<YouTubeResponse> {
    return fetch("https://noembed.com/embed?url=https://www.youtube.com/watch?v=" + key, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());
}

async function postRecommend(key) {
    let r = await fetchVideoData(key);
    return await callAddRecommendation({
        key: key,
        data: {
            title: r.title,
            url: r.url,
            img: r.thumbnail_url,
        }
    });
}