import { useState } from 'react';
import Card from './Card';

export default function CardsList({ characters, flipped, gameOver, level, onClickCard }) {
  const [prevCharacters, setPrevCharacters] = useState(characters);
  if (!gameOver && !Object.is(prevCharacters, characters)) setPrevCharacters(characters);

  return (
    <div className={'cards-list ' + level + (flipped ? ' flipped' : '')}>
      {prevCharacters.map((character) => {
        return (
          <Card
            key={character.id}
            character={character}
            onClickCard={() => onClickCard(character)}
          />
        );
      })}
    </div>
  );
}
