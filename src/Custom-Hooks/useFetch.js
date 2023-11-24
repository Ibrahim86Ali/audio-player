import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = () => {
  const [ready, setReady] = useState(false);
  const [tracks, setTracks] = useState([
    {
      title: null,
      src: null,
      genre: null,
      thumbnail: null,
    },
  ]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:5010/audio")
        .then((res) => {
          console.log(res.data);
          setMyData(res.data.result);
          setTracks(
            res.data.result.map(({ title, audioUrl, genre, imageUrl }) => ({
              title,
              src: audioUrl,
              genre,
              thumbnail: imageUrl,
            }))
          );
          console.log(tracks, "ooo");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return { mydata, setMyData, setReady, ready, tracks, setTracks };
};

export default useFetch;
