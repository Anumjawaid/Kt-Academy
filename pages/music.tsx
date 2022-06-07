import useSound from "use-sound";
// More hee: https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
import {registerPage, useDidUpdateEffect} from "../src/Utils";
import {useTranslations} from "../src/Translations";
import React, {useEffect, useRef} from "react";
import {makeTimer, Timer} from "../components/component/music/Timer";
import {PlusMinusPicker} from "../components/component/music/PlusMinusPicker";
import ReactPlayer from 'react-player'
import {useCookieMusicConfigState} from "../src/music/MusicCookieConfig";
import pretty from 'pretty-time';
import Header from "../components/section/Header";
import {FeedbackButton} from "../components/component/FeedbackButton";
import {RecommendedMusicVideos} from "../components/component/music/RecommendedMusicVideos";
import FooterSection from "../components/section/FooterSection";

type YouTubePlayer = {
    playVideo: () => void
    pauseVideo: () => void
    stopVideo: () => void
    seekTo: (seconds: number, allowSeekAhead: boolean) => void
    setVolume: (volume: number) => void
    getVolume: () => number
}

export default function Music() {
    let pageKey = `programming-music-timer`;
    registerPage(pageKey)
    const t = useTranslations();
    const [playSound] = useSound("/sounds/boop.mp3");

    const [youtubeVideoKey, setYoutubeVideoKey] = useCookieMusicConfigState("IWZktANV-D8", "chosenVideo");
    const [workTimeMin, setWorkTime] = useCookieMusicConfigState(25, "workTime");
    const [breakTimeMin, setBreakTime] = useCookieMusicConfigState(5, "breakTime");
    const [volume, setVolume] = useCookieMusicConfigState(5, "volume");

    useDidUpdateEffect(() => {
        const player = getCurrentPlayer()
        if (player) player?.setVolume(volume)
    }, [volume])

    const [phase, setPhase] = React.useState<"work" | "break">("work");
    const isWorkTime = phase === "work"

    const [secPassed, setSecPassed] = React.useState<number>(0);
    const [totalConcentrationSec, setTotalConcentrationSec] = useCookieMusicConfigState(0, "totalSecPassed");
    const timer = useRef<Timer>(makeTimer(setSecPassed))

    let playerRef = useRef<ReactPlayer>(null)

    const getCurrentPlayer = () => (playerRef.current?.getInternalPlayer() as YouTubePlayer)

    const secUntilNext = (isWorkTime ? workTimeMin : breakTimeMin) * 60 - secPassed
    useEffect(() => {
        if (secUntilNext <= 0) togglePhase()
    }, [secUntilNext])

    useEffect(() => {
        timer.current.pause()
    }, [youtubeVideoKey])

    const togglePhase = () => {
        if (isWorkTime && breakTimeMin === 0) {
            return
        }
        if (isWorkTime) {
            setPhase("break")
            getCurrentPlayer()?.pauseVideo()
        } else {
            setPhase("work")
            getCurrentPlayer()?.playVideo()
        }
        playSound()
        timer.current.restart()
    }

    useEffect(() => {
        if (isWorkTime) setTotalConcentrationSec(totalConcentrationSec + 1)
        if (secUntilNext <= 0) togglePhase()
    }, [secPassed])

    const onVideoStarted = () => {
        if (isWorkTime) {
            getCurrentPlayer()?.playVideo()
            timer.current.start()
        }
    }

    const onVideoPaused = () => {
        if (isWorkTime) {
            getCurrentPlayer()?.pauseVideo()
            timer.current.pause()
        }
    }

    const timeDisplay = (seconds: number) => pretty(Math.max(0, seconds * 1000_000_000), 's')

    return <>
        <Header/>
        <div className="content-container">
            <style jsx>{`
.videoWrapper {
    position: relative;
    padding-bottom: calc(0.5625 * 100%);
    height: 0;
}
.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
            `}</style>
            <div className="videoWrapper">
                <ReactPlayer volume={0.05}
                             key={youtubeVideoKey}
                             url={'https://www.youtube.com/watch?v=' + youtubeVideoKey}
                             onPlay={onVideoStarted}
                             onPause={onVideoPaused}
                             onReady={() => getCurrentPlayer().setVolume(volume)}
                             ref={playerRef}
                             loop={true}
                />
            </div>

            <div>
                <PlusMinusPicker value={volume} setValue={setVolume} step={1} min={0} unit="%"
                                 title={t.music.volume}/>
                <PlusMinusPicker value={workTimeMin} setValue={setWorkTime} step={5} min={1} unit="min"
                                 title={t.music.pickerWorkTime}/>
                <PlusMinusPicker value={breakTimeMin} setValue={setBreakTime} step={5} min={0} unit="min"
                                 title={t.music.pickerBreakTime}/>
            </div>
            <div>
                <div>{(isWorkTime ? t.music.displayWorkTime : t.music.displayBreakTime)}</div>
                <div>{t.music.sessionTime + timeDisplay(secPassed)}</div>
                <div>{(isWorkTime ? t.music.timeUntilBreak : t.music.timeUntilWork) + timeDisplay(secUntilNext)}</div>
                <div>{t.music.totalConcentrationTime + timeDisplay(totalConcentrationSec)}</div>
                <div className="clickable"
                     onClick={togglePhase}>{isWorkTime ? t.music.startBreak : t.music.startWork}</div>
                <FeedbackButton pageKey={pageKey}/>
            </div>
            <br/>
            <br/>
            <RecommendedMusicVideos youtubeVideoKey={youtubeVideoKey} setYoutubeVideoKey={setYoutubeVideoKey}/>
        </div>
        <FooterSection/>
    </>;
};

