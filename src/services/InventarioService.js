import { axiosConfig } from '../configuration/axiosConfig';

/**
 * Obtiene todos los tipos de equipo
 */
const obtenerinventarios = (estado = true) => {
	return axiosConfig.get('inventarios', {
		headers: {
			'Content-type': 'application/json',
		},
	});
};

const crearinventario = (data) => {
	return axiosConfig.post(
		'inventarionuevo',
		data,
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
};

/**
 * Actualiza un tipo de equipo por ID
 */
const editarinventarioPorID = (
	tipoId,
	data
) => {
	return axiosConfig.put(
		'inventario/' + tipoId,
		data,
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
};

/**
 * Borra un tipo de equipo por ID
 */
const borrarinventarioPorID = (tipoId) => {
	return axiosConfig.delete(
		'inventario/' + tipoId,
		{},
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
};

/**
 * Consulta un tipo de equipo por ID
 */
const obtenerinventarioPorID = (tipoId) => {
	return axiosConfig.get(
		'inventario/' + tipoId,
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
};

export {
	obtenerinventarios,
	crearinventario,
	editarinventarioPorID,
	borrarinventarioPorID,
	obtenerinventarioPorID,
};
