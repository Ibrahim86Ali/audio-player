import { useEffect, useState } from "react";

const SearchBar = () => {
  const [soundList, setSoundList] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div className="input">
      <input
        className="search-bar"
        type="text"
        placeholder="search..."
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {/* {input.length > 0 && (
        <div>
          {soundList
            .filter((item) =>
              item.title.toLowerCase().includes(input.toLowerCase())
            )
            .map((item) => (
              <div className="audio-container" key={item.id}>
                <h2>{item.title}</h2>
                <h2>{item.genre}</h2>
                <img src={item.thumbnail} alt={`${item.title} thumbnail`} />
              </div>
            ))}
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
