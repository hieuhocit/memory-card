import { useRef } from 'react';
import gokurunning from '../assets/imgs/gokurunning.gif';
export default function ProgressBar({ progress }) {
  const progressBarRef = useRef(null);

  let progressPx;
  if (progressBarRef.current) {
    progressPx = (progress / 100) * progressBarRef.current.offsetWidth + 'px';
  }

  return (
    <div
      className='bar-container'
      style={{
        '--progress': progressPx,
      }}
    >
      <div
        className='progress-bar'
        ref={progressBarRef}
      >
        <span className='progress-text'>{progress}%</span>
        <div className='progress-indicator'></div>
      </div>

      <div className='img-container'>
        <img
          src={gokurunning}
          alt='Goku running gif'
        />
      </div>
    </div>
  );
}
