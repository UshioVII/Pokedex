import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components';
import { PokemonContext } from '../context/PokemonContext';

export const PokemonPage = () => {
	const { getPokemonByID } = useContext(PokemonContext);

	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState({});

	const { id } = useParams();

	const fetchPokemon = async id => {
		const data = await getPokemonByID(id);
		setPokemon(data);
		setLoading(false);
	};

	useEffect(() => {
		fetchPokemon(id);
	}, []);

	const calculateStatWidth = statValue => {
		const maxStatValue = 255; // Valor máximo posible para el "counter-stat"
		const percentage = (statValue / maxStatValue) * 100;
		return `${percentage}%`;
	};

	const getTypeClassName = type => {
		return type.type.name.toLowerCase();
	};

	return (
		<main className='main-pokemon'>
			{loading ? (
				<Loader />
			) : (
				<>
					<div className='header-main-pokemon'>
						<svg className='pokeball' width='206' height='208' viewBox='0 0 206 208' fill='none'>
							<g opacity='0.1'>
								<path
									d='M127.762 104C127.762 117.676 116.676 128.762 103 128.762C89.3244 128.762 78.2381 117.676 78.2381 104C78.2381 90.3244 89.3244 79.2381 103 79.2381C116.676 79.2381 127.762 90.3244 127.762 104Z'
									fill='white'
								/>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M103 208C155.393 208 198.738 169.257 205.947 118.857H145.035C138.917 136.169 122.407 148.571 103 148.571C83.5933 148.571 67.0835 136.169 60.9648 118.857H0.0532056C7.26233 169.257 50.6067 208 103 208ZM60.9648 89.1429H0.0532056C7.26233 38.7431 50.6067 0 103 0C155.393 0 198.738 38.7431 205.947 89.1429H145.035C138.917 71.8314 122.407 59.4286 103 59.4286C83.5933 59.4286 67.0835 71.8314 60.9648 89.1429ZM127.762 104C127.762 117.676 116.676 128.762 103 128.762C89.3244 128.762 78.2381 117.676 78.2381 104C78.2381 90.3244 89.3244 79.2381 103 79.2381C116.676 79.2381 127.762 90.3244 127.762 104Z'
									fill='white'
								/>
							</g>
						</svg>
						<span>{pokemon.name}</span>
						<p className='number-pokemon'>#{pokemon.id}</p>
					</div>

					<div className='container-info-pokemon'>
						<img
							className='container-img-pokemon'
							src={pokemon?.sprites?.other?.dream_world?.front_default}
							alt={`Pokemon ${pokemon?.name}`}
						/>
						<div className='card-types'>
							{pokemon.types.map(type => (
								<span
									key={type.type.name}
									className={`${getTypeClassName(type)} type`}
								>
									{type.type.name}
								</span>
							))}
						</div>
						<span className='title'>Estadísticas Base</span>
						<div className='info-pokemon'>
							<div className='group-info'>
								<span>{pokemon.height} M</span>
								<p>Altura</p>
							</div>
							<div className='group-info'>
								<span>{pokemon.weight} KG</span>
								<p>Peso</p>
							</div>
						</div>

						<div className='stats'>
							{pokemon.stats.map(stat => (
								<div className='stat-group' key={stat.stat.name}>
									<span>
										{stat.stat.name === 'HP'
											? 'HP'
											: stat.stat.name === 'attack'
											? 'ATK'
											: stat.stat.name === 'defense'
											? 'DEF'
											: stat.stat.name === 'special-attack'
											? 'SATK'
											: stat.stat.name === 'special-defense'
											? 'SDEF'
											: stat.stat.name === 'speed'
											? 'SPD'
											: stat.stat.name}
									</span>
									<div className='stat-value'>
										<p className='counter-stat'>{stat.base_stat}</p>
										<div className='line'>
											<div className='background' />
											<div
												className={`secondLine ${getTypeClassName(
													pokemon.types[0]
												)}`}
												style={{ width: calculateStatWidth(stat.base_stat) }}
											/>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='about-pokemon'>
							<span className='title'>Sobre {pokemon.name}</span>
							<p>{pokemon.species?.flavor_text_entries?.[0]?.flavor_text}</p>
						</div>
						<div>Proximamente...</div>
					</div>
				</>
			)}
		</main>
	);
};
