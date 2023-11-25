import { useState, useRef, useEffect } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import PropTypes from "prop-types";
import "../styles/player.css";

export default function AudioPlayer({ track }) {
  const progressBarJumpValue = 5;

  const { title, src, genre, thumbnail } = track ?? {
    title: "Please select a track",
    genre: "from the sound list...",
    src: null,
    thumbnail: "src/assets/logo.png",
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    // Reset play state and progress bar when track changes
    setIsPlaying(false);
    setCurrentTime(0);
    progressBar.current.value = 0;
    progressBar.current.style.setProperty("--seek-before-width", "0%");

    // Set the audio source when the component mounts or when the src prop changes
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [
    track,
    audioPlayer?.current?.loadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  const backThirty = () => {
    const actualValue = Number(progressBar.current.value);
    progressBar.current.value = actualValue - progressBarJumpValue;
    changeRange();
  };

  const forwardThirty = () => {
    const actualValue = Number(progressBar.current.value);
    const resVal = actualValue + progressBarJumpValue;
    progressBar.current.value = resVal;
    changeRange();
  };

  return (
    <div className="audioPlayer">
      <div>
        <img src={thumbnail} width="5" height="5" alt={`${title} thumbnail`} />
        <h2>{title}</h2>
        <p>{genre}</p>
      </div>
      <audio
        ref={audioPlayer}
        src={src}
        preload="metadata"
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      ></audio>
      <button className="forwardBackward" onClick={backThirty}>
        <BsArrowLeftShort /> 5
      </button>
      <button onClick={togglePlayPause} className="playPause">
        {isPlaying ? <FaPause /> : <FaPlay className="play" />}
      </button>
      <button className="forwardBackward" onClick={forwardThirty}>
        5 <BsArrowRightShort />
      </button>

      {/* current time */}
      <div className="currentTime">{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          type="range"
          className="progressBar"
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>

      {/* duration */}
      <div className="duration">
        {duration ? calculateTime(duration) : "00:00"}
      </div>
    </div>
  );
}

AudioPlayer.propTypes = {
  track: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      genre: PropTypes.string,
      src: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ),
};
