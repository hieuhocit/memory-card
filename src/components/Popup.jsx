import { useRef, useEffect } from 'react';
import '../styles/Popup.css';
import punchSound from '../assets/audios/dragon-ball-z-punch-sound-effect-made-with-Voicemod.mp3';
import dripSound from '../assets/audios/goku-drip-made-with-Voicemod.mp3';

import { useSoundContext } from './SoundContext';

export default function Popup({ isWin, onClickRestart }) {
  const punchSoundRef = useRef(null);
  const soundRef = useSoundContext();
  useEffect(() => {
    if (punchSoundRef.current && soundRef.current) {
      punchSoundRef.current.currentTime = 0;
      punchSoundRef.current.play();
    }
  });

  return (
    <div className='popup-container'>
      <div className={isWin ? 'popup win' : 'popup lose'}>
        <p>You {isWin ? 'win' : 'lose'}!</p>
        <button onClick={onClickRestart}>Restart</button>
      </div>
      <audio
        src={isWin ? dripSound : punchSound}
        ref={punchSoundRef}
      ></audio>
    </div>
  );
}
