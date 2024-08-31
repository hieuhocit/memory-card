import { useEffect, useState, useRef } from 'react';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, faTwitter, faFontAwesome);

// Styles
import './styles/App.css';

// Assets
import videoBgc from './assets/videos/goku-super-saiyan-rose-dragon-ball-moewalls-com.mp4';

// Pages
import LoadingPage from './pages/LoadingPage';
import StartingPage from './pages/StartingPage';
import GamePage from './pages/GamePage';
import Footer from './components/Footer.jsx';

// Scripts
import fetchData from './scripts/fetchData.js';

// Sounds
import teleportSound from './assets/audios/dbz-teleport.mp3';

// Context
import { SoundContext } from './components/SoundContext.jsx';

function useFetchCharacters() {
  const [progress, setProgress] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      setProgress(0);
      let ignore = false;
      const data = await fetchData('https://dragonball-api.com/api/characters?limit=58', setProgress);

      if (!ignore) {
        setCharacters(data);
        setLoading(false);
      }

      return () => {
        ignore = true;
      };
    }
    getData();
  }, []);
  return {
    loading,
    progress,
    characters,
  };
}

function App() {
  const [level, setLevel] = useState(null);

  // Sounds Ref
  const teleportSoundRef = useRef(null);
  const soundRef = useRef(true);

  // Fetch data
  const { loading, progress, characters } = useFetchCharacters();

  const handlePlayTeleportSound = () => {
    if (teleportSoundRef.current && soundRef.current) {
      teleportSoundRef.current.currentTime = 0;
      teleportSoundRef.current.play();
    }
  };

  const handleClickBack = () => {
    handlePlayTeleportSound();
    setLevel(null);
  };

  return (
    <>
      <SoundContext.Provider value={soundRef}>
        <div id='app'>
          {loading ? (
            <LoadingPage progress={progress} />
          ) : (
            !level && (
              <StartingPage
                onClickLevel={setLevel}
                onPlaySound={handlePlayTeleportSound}
              />
            )
          )}

          {level && (
            <GamePage
              characters={characters}
              level={level}
              onClickBack={handleClickBack}
            />
          )}
          {!loading && <Footer />}
        </div>
      </SoundContext.Provider>
      <video
        autoPlay
        loop
        muted
        id='video-bgc'
      >
        <source
          src={videoBgc}
          type='video/mp4'
        />
      </video>
      <audio
        src={teleportSound}
        ref={teleportSoundRef}
        style={{ display: 'none' }}
      ></audio>
    </>
  );
}

export default App;
