function randomIndex(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCharacter(characters, selectedCharacters) {
  if (Math.random() >= 0.5 && selectedCharacters.length > 0) {
    return selectedCharacters[randomIndex(0, selectedCharacters.length)];
  }
  return characters[randomIndex(0, characters.length)];
}

export default function getRandomCharacters(characters, selectedCharacters, level) {
  const getCharacters = (quantity) => {
    const randomCharacters = [];
    randomCharacters.push(
      getRandomCharacter(
        characters.filter((c) => selectedCharacters.find((slc) => slc.id === c.id) === undefined),
        []
      )
    );

    for (let i = 0; i < quantity - 1; i++) {
      let character = getRandomCharacter(characters, selectedCharacters);
      while (randomCharacters.find((c) => c.id === character.id)) {
        character = getRandomCharacter(characters, selectedCharacters);
      }
      randomCharacters.push(character);
    }
    return randomCharacters;
  };

  switch (level) {
    case 'easy':
      return {
        randomCharacters: getCharacters(3),
        goals: 10,
      };
    case 'medium':
      return {
        randomCharacters: getCharacters(4),
        goals: 15,
      };
    case 'hard':
      return {
        randomCharacters: getCharacters(5),
        goals: 20,
      };
    default:
      throw new Error('Invalid level');
  }
}
