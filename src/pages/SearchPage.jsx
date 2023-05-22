import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CardPokemon } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const SearchPage = () => {
	const location = useLocation();
	const { globalPokemons } = useContext(PokemonContext);

	const filteredPokemons = globalPokemons.filter(pokemon =>
		pokemon.name.includes(location.state.toLowerCase())
	);

	return (
		<div className="search-page">
			{filteredPokemons.length > 0 ? (
				<>
					<p className='p-search'>
						Se encontraron <span>{filteredPokemons.length}</span> resultados:
					</p>
					<div className='card-list-pokemon'>
						{filteredPokemons.map(pokemon => (
							<CardPokemon pokemon={pokemon} key={pokemon.id} />
						))}
					</div>
				</>
			) : (
				<div className='alert'>
					<div>
						<section className='error-section'>
							<h3 className='error-message'>No hay ningún Pokémon que coincida con tu búsqueda.</h3>
							<p className='search-tips'>Intenta lo siguiente para encontrar resultados:</p>
							<ul className='search-tips-list'>
								<li>Busca al Pokémon por su número de la Pokédex Nacional.</li>
								<li>Haz búsquedas de tipos de Pokémon de uno en uno.</li>
								<li>Utiliza el filtro por tipo de Pokémon.</li>
							</ul>
						</section>
					</div>
				</div>
			)}
		</div>
	);
};
