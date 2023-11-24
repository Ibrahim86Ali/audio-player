import { useRef, useState } from "react";
import DisplayTrack from "./DisplayTrack.jsx";
import Controls from "./Controls.jsx";
import ProgressBar from "./ProgressBar.jsx";

// const tracks = [
//   {
//     title: 'test',
//     src: 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3',
//     author: 'pop',
//     thumbnail:
//       'https://www.topspeed.sk/userfiles/articles/22-01/4793/gallery/crop_640_480_01-hennessey-venom-gt-gray.jpg',
//   },
// ];

const AudioPlayer = ({ tracks }) => {
  // states
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();
  console.log("audioplayer", audioRef, { tracks });

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <>
      <div className="audio-player">
        <div className="inner">
          <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
