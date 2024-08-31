import { useEffect, useRef, useState } from 'react';
import CardsList from '../components/CardsList';
import Logo from '../components/Logo';
import Score from '../components/Score';
import Popup from '../components/Popup';

import getRandomCharacters from '../scripts/getRandomCharacters';
import flipCardSound from '../assets/audios/flipcard-91468.mp3';

import '../styles/GamePage.css';

import { useSoundContext } from '../components/SoundContext';

function checkExist(characters, character) {
  return characters.findIndex((c) => c.id === character.id) !== -1;
}

export default function GamePage({ characters, level, onClickBack }) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const flipCardSoundRef = useRef(null);
  const soundRef = useSoundContext();

  const { goals, randomCharacters } = getRandomCharacters(characters, selectedCharacters, level);

  useEffect(() => {
    const id = setTimeout(() => {
      if (flipped) setFlipped(false);
    }, 600);
    return () => clearTimeout(id);
  }, [flipped]);

  const handlePlayFlipCardSound = () => {
    if (flipCardSoundRef.current && soundRef.current) {
      flipCardSoundRef.current.currentTime = 0;
      flipCardSoundRef.current.play();
    }
  };

  const handleOnClickCard = (character) => {
    // Game over
    if (checkExist(selectedCharacters, character)) {
      setGameOver(true);
      return;
    }

    // Add character to selected characters
    setSelectedCharacters((prevCharacters) => [...prevCharacters, { ...character }]);

    // Increase the score
    const newScore = score + 1;
    setScore(newScore);

    // Update the best score
    if (newScore > bestScore) setBestScore(newScore);

    // Check win
    if (newScore === goals) {
      setGameOver(true);
      return;
    }
    handlePlayFlipCardSound();
    setFlipped(true);
  };

  const handleRestart = () => {
    handlePlayFlipCardSound();
    setScore(0);
    setGameOver(false);
    setSelectedCharacters([]);
    setFlipped(true);
  };

  return (
    <div className='game-page'>
      <header className='header'>
        <Logo onClickBack={onClickBack} />
        <Score
          score={score}
          bestScore={bestScore}
        />
      </header>
      <main className='main'>
        <p className='goals'>
          {selectedCharacters.length}/{goals}
        </p>
        <CardsList
          characters={randomCharacters}
          level={level}
          flipped={flipped}
          gameOver={gameOver}
          onClickCard={handleOnClickCard}
        />
      </main>
      {gameOver && (
        <Popup
          isWin={score === goals}
          onClickRestart={handleRestart}
        />
      )}
      <audio
        src={flipCardSound}
        ref={flipCardSoundRef}
        style={{ display: 'none' }}
      ></audio>
    </div>
  );
}
