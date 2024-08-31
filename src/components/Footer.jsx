import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Footer.css';
import mouseClickSound from '../assets/audios/mouseclick.mp3';
import musicBg from '../assets/audios/fight-made-with-Voicemod.mp3';
import instructorImg from '../assets/imgs/instructor.webp';

import { useSoundContext } from './SoundContext';

export default function Footer() {
  const soundRef = useSoundContext();
  const [isSoundOn, setIsSoundOn] = useState(true);

  const mouseClickSoundRef = useRef(null);
  const musicBgRef = useRef(null);
  
  const [isMusicBgOn, setIsMusicBgOn] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);

  const handlePlayMouseSound = () => {
    if (mouseClickSoundRef.current && soundRef.current) {
      mouseClickSoundRef.current.currentTime = 0;
      mouseClickSoundRef.current.play();
    }
  };

  const handlePlayMusicBg = () => {
    const newStatus = !isMusicBgOn;
    setIsMusicBgOn(newStatus);
    handlePlayMouseSound();
    if (newStatus) {
      musicBgRef.current.currentTime = 0;
      musicBgRef.current.play();
    } else {
      musicBgRef.current.pause();
    }
  };

  const handleShowInstruction = () => {
    handlePlayMouseSound();
    setShowInstruction(!showInstruction);
  };

  return (
    <footer className='footer'>
      <div className='section-sounds'>
        <button
          aria-label={isSoundOn ? 'turn off sound' : 'turn on sound'}
          onClick={() => {
            setIsSoundOn(!isSoundOn);
            soundRef.current = !isSoundOn;
            handlePlayMouseSound();
          }}
        >
          {isSoundOn ? (
            <FontAwesomeIcon icon='fa-solid fa-volume-high' />
          ) : (
            <FontAwesomeIcon icon='fa-solid fa-volume-xmark' />
          )}
        </button>
        <button
          aria-label={isMusicBgOn ? 'turn off music background' : 'turn on music background'}
          onClick={handlePlayMusicBg}
        >
          {isMusicBgOn ? (
            <FontAwesomeIcon icon='fa-solid fa-music' />
          ) : (
            <svg
              viewBox='0 0 700 600'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              className='svg'
              width='30px'
              height='30px'
            >
              <g>
                <path
                  d='m275.18 373.65c21.504 0 41.531 5.1914 58.281 14.113v-81.816l-202.93-202.95 34.156-34.156 404.82 404.8-34.156 34.156-153.55-153.57v106.14c0 47.914-47.73 86.738-106.6 86.738-58.867 0-106.6-38.824-106.6-86.738 0-47.898 47.73-86.738 106.6-86.738zm58.281-193.93v-145.34c0-6.6523 2.7227-12.398 7.8633-16.617 5.1562-4.2344 11.324-5.7617 17.859-4.4531l154.64 30.98c10.148 2.0312 17.27 10.734 17.27 21.066v107.55c0 6.6523-2.7031 12.398-7.8633 16.617-5.1562 4.2344-11.305 5.7617-17.84 4.4531l-123.6-24.762v58.801l-48.316-48.316z'
                  fillRule='evenodd'
                ></path>
              </g>
            </svg>
          )}
        </button>
      </div>

      <div className='section-help'>
        <button
          aria-label={showInstruction ? 'Hide instruction' : 'Show instruction'}
          onClick={handleShowInstruction}
        >
          {showInstruction ? (
            <FontAwesomeIcon icon='fa-solid fa-xmark' />
          ) : (
            <FontAwesomeIcon icon='fa-solid fa-question' />
          )}
        </button>
        <div className={showInstruction ? 'instructions show' : 'instructions'}>
          <div className='text'>
            <span>Don't click on the same card twice!</span>
            <span>Click on the LOGO to go back.</span>
          </div>
          <div
            className='instructor'
            onClick={handleShowInstruction}
          >
            <img
              src={instructorImg}
              alt='instructor image'
            />
          </div>
        </div>
      </div>

      <audio
        src={mouseClickSound}
        ref={mouseClickSoundRef}
      ></audio>
      <audio
        src={musicBg}
        ref={musicBgRef}
        loop
        muted={!isMusicBgOn}
      ></audio>
    </footer>
  );
}
