import gokurunning from '../assets/imgs/gokurunning.gif';
export default function ProgressBar({ progress }) {

  return (
    <div
      className="bar-container"
      style={{
        "--progress": `${progress}%`,
      }}
    >
      <div className="progress-bar">
        <span className="progress-text">{progress}%</span>
        <div className="progress-indicator">
          <div className="img-container">
            <img src={gokurunning} alt="Goku running gif" />
          </div>
        </div>
      </div>
    </div>
  );
}
