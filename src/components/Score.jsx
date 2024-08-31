import '../styles/Score.css'

export default function Score({score, bestScore}) {
  return (
    <div className='score-container'>
      <div className='score'>
        <p>Score: {score}</p>
      </div>
      <div className='best-score'>
        <p>Best score: {bestScore}</p>
      </div>
    </div>
  );
}
