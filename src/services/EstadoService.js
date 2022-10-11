import { axiosConfig } from '../configuration/axiosConfig';

/**
 * Obtiene todos los tipos de equipo
 */
const obtenerEstados = (estado = true) => {
	return axiosConfig.get(
		// 'estadoequipo?estadoequipo=' + estado,
		'estados',
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
};

/**
 * Crea tipo de equipo
 */
const crearEstado = (data) => {
	return axiosConfig.post(
		'estadoequiponuevo',
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
const editarEstadoPorID = (estadoId, data) => {
	return axiosConfig.put(
		'estadoequipo/' + estadoId,
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
const borrarEstadoPorID = (tipoId) => {
	return axiosConfig.delete(
		'estados/' + tipoId,
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
const obtenerEstadoPorID = (tipoId) => {
	return axiosConfig.get('estados/' + tipoId, {
		headers: {
			'Content-type': 'application/json',
		},
	});
};

export {
	obtenerEstados,
	crearEstado,
	editarEstadoPorID,
	borrarEstadoPorID,
	obtenerEstadoPorID,
};
