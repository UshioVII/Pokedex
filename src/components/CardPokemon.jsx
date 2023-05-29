import React from 'react';
import { Link } from 'react-router-dom';

export const CardPokemon = ({ pokemon, showDeleteButton, onDelete }) => {
	return (
		<div className='card-pokemon'>
			<Link to={`/pokemon/${pokemon.id}`} className='card-img'>
				<span className='pokemon-id'>N° {pokemon.id}</span>
				<img
					src={
						pokemon?.sprites?.other?.dream_world?.front_default ||
						pokemon?.sprites?.front_default
					}
					alt={pokemon?.name}
				/>
			</Link>
			<div className='card-info'>
				<h3>{pokemon.name}</h3>
				<div className='card-types'>
					{pokemon.types.map(type => (
						<span key={type.type.name} className={type.type.name}>
							{type.type.name}
						</span>
					))}
				</div>
			</div>
			{showDeleteButton && (
				<button className='delete-button' onClick={onDelete}>
					Eliminar Tarjeta
				</button>
			)}
		</div>
	);
};
