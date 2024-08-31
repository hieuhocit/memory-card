import ProgressBar from '../components/ProgressBar';
import '../styles/LoadingPage.css';

export default function LoadingPage({ progress }) {
  return (
    <div className='loading-page'>
      <ProgressBar progress={progress} />
      <div className='wave-text'>
        <span className='wave-letter'>L</span>
        <span className='wave-letter'>o</span>
        <span className='wave-letter'>a</span>
        <span className='wave-letter'>d</span>
        <span className='wave-letter'>i</span>
        <span className='wave-letter'>n</span>
        <span className='wave-letter'>g</span>
        <span className='wave-letter'>.</span>
        <span className='wave-letter'>.</span>
        <span className='wave-letter'>.</span>
      </div>
    </div>
  );
}
