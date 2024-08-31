import { useRef } from 'react';
import calculateRotate from '../utils/calculateRotate';

export default function Card({ character, onClickCard }) {
  const cardRotateRef = useRef(null);

  const handlePointerMove = (e) => {
    const { rotateX, rotateY } = calculateRotate(e, cardRotateRef.current.offsetParent);
    cardRotateRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handlePointerLeave = () => {
    cardRotateRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      className='card-container'
      onClick={() => onClickCard(character)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className='card'
        ref={cardRotateRef}
      >
        <div className='front'>
          <div className='character-img'>
            <img
              src={character.image}
              alt={character.description}
            />
          </div>
          <p className='character-name'>{character.name}</p>
        </div>
        <div className='back'></div>
      </div>
    </div>
  );
}
