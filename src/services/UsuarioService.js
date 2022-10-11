import { axiosConfig } from '../configuration/axiosConfig';

/**
 * Obtiene todos los tipos de equipo
 */
const obtenerUsuarios = (estado = true) => {
	return axiosConfig.get('usuarios', {
		headers: {
			'Content-type': 'application/json',
		},
	});
};

const crearusuario = (data) => {
	return axiosConfig.post(
		'usuarionuevo',
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
const editarusuarioPorID = (tipoId, data) => {
	return axiosConfig.put(
		'usuario/' + tipoId,
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
const borrarusuarioPorID = (tipoId) => {
	return axiosConfig.delete(
		'usuario/' + tipoId,
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
const obtenerusuarioPorID = (tipoId) => {
	return axiosConfig.get('usuario/' + tipoId, {
		headers: {
			'Content-type': 'application/json',
		},
	});
};

export {
	obtenerUsuarios,
	crearusuario,
	editarusuarioPorID,
	borrarusuarioPorID,
	obtenerusuarioPorID,
};
