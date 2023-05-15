import React, { useState, useEffect } from "react";
import MemesData from "../MemesData";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState(MemesData);

  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function getMemeImage() {
    // const memesArray = allMemes.data.memes;
    const randNum = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randNum].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <main className="meme-container">
      <div className="form">
        <input
          type="text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
          placeholder="Top text"
          className="form--input"
        />
        <input
          type="text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
          placeholder="Bottom text"
          className="form--input"
        />
        <button onClick={getMemeImage} className="form--button">
          Get a new meme image 🖼
        </button>
        <pre>{JSON.stringify(setAllMemes, null, 2)}</pre>
      </div>

      <div className="meme">
        <img className="meme--image" src={meme.randomImage} alt=""></img>
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
};

export default Meme;
