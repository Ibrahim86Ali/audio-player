import { useState, useEffect } from 'react';
import Category from './components/category/Category.jsx';
import SoundList from './components/SoundList.jsx';
import AudioPlayer from './components/AudioPlayer.jsx';
import SearchBar from './components/SearchBar.jsx';
import axios from 'axios';

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState(null);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState(null);

  const fetchTracks = async () => {
    let params = {};
    if (category) {
      params = { filterBy: category };
    }

    if (title) {
      params = { pattern: title };
    }

    try {
      const response = await axios.get('http://localhost:5010/audio', {
        params,
      });
      const data = response.data.result;

      setTracks([...data]);
    } catch (error) {
      console.error('Error fetching records:', error);
      return;
    }
  };

  useEffect(() => {
    fetchTracks();
  }, [category]);
  return (
    <>
      <SearchBar />
      <Category setCategory={setCategory} />
      <SoundList tracks={tracks} setTrack={(track) => setTrack(track)} />
      <AudioPlayer track={track} />
    </>
  );
}
