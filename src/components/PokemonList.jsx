import React, { useContext, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { CardPokemon } from './CardPokemon';
import { Loader } from './Loader';

export const PokemonList = () => {
  const {
    allPokemons,
    loading,
    filteredPokemons,
    deletePokemonCard, 
  } = useContext(PokemonContext);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const handleDeleteCard = (pokemonId) => {
    deletePokemonCard(pokemonId); // Llama a la función deletePokemonCard del context
  };

  const handleCardClick = (pokemonId) => {
    setSelectedPokemonId(pokemonId);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='card-list-pokemon'>
          {filteredPokemons.length ? (
            <>
              {filteredPokemons.map(pokemon => (
                <CardPokemon
                  pokemon={pokemon}
                  key={pokemon.id}
                  showDeleteButton
                  onDelete={() => handleDeleteCard(pokemon.id)}
                  onClick={() => handleCardClick(pokemon.id)}
                  isSelected={selectedPokemonId === pokemon.id}
                />
              ))}
            </>
          ) : (
            <>
              {allPokemons.map(pokemon => (
                <CardPokemon
                  pokemon={pokemon}
                  key={pokemon.id}
                  showDeleteButton
                  onDelete={() => handleDeleteCard(pokemon.id)}
                  onClick={() => handleCardClick(pokemon.id)}
                  isSelected={selectedPokemonId === pokemon.id}
                />
              ))}
            </>
          )}
        </div>
      )}
    </>
  );
};
