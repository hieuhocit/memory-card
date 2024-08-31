import logo from '../assets/imgs/logo.png';
import '../styles/StartingPage.css';

export default function StartingPage({ onClickLevel, onPlaySound }) {
  const handleClick = (level) => {
    onPlaySound();
    onClickLevel(level);
  };
  return (
    <div className='start-page'>
      <main>
        <div className='container-logo'>
          <img
            src={logo}
            alt='Logo'
            className='logo'
          />
        </div>
        <h2>Memory Game</h2>
        <div className='buttons'>
          <button
            onClick={() => handleClick('easy')}
            className='btn'
          >
            Easy
          </button>
          <button
            onClick={() => handleClick('medium')}
            className='btn'
          >
            Medium
          </button>
          <button
            onClick={() => handleClick('hard')}
            className='btn'
          >
            Hard
          </button>
        </div>
      </main>

    </div>
  );
}
