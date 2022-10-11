import { axiosConfig } from '../configuration/axiosConfig';

const obtenerMarcas = () => {
	return axiosConfig.get('marcas', {
		headers: {
			'Content-type': 'application/json',
		},
	});
};

const crearMarca = (data) => {
	return axiosConfig.post('marcanueva', data, {
		headers: {
			'Content-type': 'application/json',
		},
	});
};

const editarMarcaPorID = (marcaId, data) => {
	return axiosConfig.put(
		'marca/' + marcaId,
		data,
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
};

const borrarMarcaPorID = (marcaId) => {
	return axiosConfig.delete(
		'marca/' + marcaId,
		{},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
};

// const obtenerMarcaPorID = (tipoId) => {
// 	return axiosConfig.get(
// 		'marcapor/' + tipoId,
// 		{
// 			headers: {
// 				'Content-type': 'application/json',
// 			},
// 		}
// 	);
// };

export {
	crearMarca,
	editarMarcaPorID,
	// obtenerMarcaPorID,
	obtenerMarcas,
	borrarMarcaPorID,
};
