import AudioPlayer from "./AudioPlayer.jsx";
import "../styles/App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const _tracks = [
  {
    title: "some title",
    // audioUrl
    src: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
    genre: "pop",
    //imageUrl
    thumbnail:
      "https://www.topspeed.sk/userfiles/articles/22-01/4793/gallery/crop_640_480_01-hennessey-venom-gt-gray.jpg",
  },
  {
    title: "some titlwe",
    // audioUrl
    src: "https://samplelib.com/lib/preview/mp3/sample-3s.mp3",
    genre: "pop",
    //imageUrl
    thumbnail:
      "https://sun9-60.userapi.com/impf/c638322/v638322415/61ef6/WILnuVxX2yM.jpg?size=604x427&quality=96&sign=80ba7270bb8d52dc49e8eec0ea006be9&c_uniq_tag=Jk7ouXAkt-ugAFU217Q5EUpkwZSOP2G3E83AyXvdNG0&type=album",
  },
];

function mapRecords(data) {
  return data.map(({ title, genre, audioUrl, imageUrl }) => ({
    title,
    src: audioUrl,
    genre,
    thumbnail: imageUrl,
  }));
}

function ListPlayer() {
  const [mydata, setMyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [tracks, setTracks] = useState([
    {
      title: null,
      src: null,
      genre: null,
      thumbnail: null,
    },
  ]);

  const fetchRecords = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:5010/audio");
      console.log({ data: response.data.result });
      setTracks(mapRecords(response.data.result));
    } catch (e) {
      console.error(e);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlayer = (id) => {
    const index = mydata.findIndex((item) => item.id === id);
    if (!index) return;

    const newRecord = mapRecords([mydata[index]]);
    console.log("loadPlayer");
    setTracks(() => {
      return [newRecord];
    });

    setIsReload(true);
  };

  const loadPlayer2 = () => {
    console.log("loadPlayer2");

    setTracks(() => {
      return [_tracks[1]];
    });

    setIsReload(true);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    setIsReload(false);
  }, [isReload]);

  console.log({ tracks });
  return (
    <>
      <div>
        <div>
          {/* <button onClick={loadPlayer(id)}>click me1</button> */}
          <button onClick={loadPlayer2}>click me2</button>
        </div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && !isReload && <AudioPlayer tracks={tracks} />}
        {isReload && <AudioPlayer tracks={tracks} />}
      </div>
    </>
  );
}

export default ListPlayer;
