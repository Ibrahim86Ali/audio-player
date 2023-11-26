import { useState, useEffect } from "react";
import Category from "./components/category/Category.jsx";
import SoundList from "./components/SoundList.jsx";
import AudioPlayer from "./components/AudioPlayer.jsx";
import NavigationBar from "./components/NavigationBar.jsx";
import axios from "axios";

export default function App() {
  const [records, setRecords] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState(null);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5010/audio");
      const data = response.data.result;

      setRecords(data);
      setTracks([...data]);
    } catch (error) {
      console.error("Error fetching records:", error);
      return;
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <>
      <Category records={records} setTracks={setTracks} />
      <SoundList tracks={tracks} setTrack={(track) => setTrack(track)} />
      <AudioPlayer track={track} />
      {/* <NavigationBar /> */}
    </>
  );
}
