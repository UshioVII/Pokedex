import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../context/PokemonContext';

export const Navigation = () => {
	const { onInputChange, valueSearch, onResetForm } =
		useContext(PokemonContext);

	const navigate = useNavigate();

	const onSearchSubmit = e => {
		e.preventDefault();
		const searchTerm = valueSearch.trim();
		const searchTermNumber = parseInt(searchTerm);

		if (!isNaN(searchTermNumber)) {
			navigate(`/pokemon/${searchTermNumber}`);
		} else {
			navigate('/search', {
				state: searchTerm,
			});
		}

		onResetForm();
	};

	return (
		<>
			<header>
				<Link to='/' className='logo'>
					<img src='https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png' alt='Logo Pokedex' />
				</Link>


			</header>
			<div className='container'>
				<label>Nombre o número</label>
				<form onSubmit={onSearchSubmit} className='center'>
					<div className='form-group'>
						<input type='search' name='valueSearch' id='' value={valueSearch} onChange={onInputChange} />
						<button className='btn-search'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='icon-search'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
								/>
							</svg>
						</button>
					</div>
					
				</form>
			</div>
			<p className='subtitle'>¡Usa la búsqueda avanzada para encontrar los Pokémon por su tipo!</p>
			<Outlet />
		</>
	);
};
