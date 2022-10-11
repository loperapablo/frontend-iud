import { axiosConfig } from '../configuration/axiosConfig';

/**
 * Obtiene todos los tipos de equipo
 */
const obtenerTiposEquipos = (
	estado = true
) => {
	return axiosConfig.get('tipoequipo', {
		headers: {
			'Content-type': 'application/json',
		},
	});
};

/**
 * Crea tipo de equipo
 */
const crearTipoEquipo = (data) => {
	return axiosConfig.post(
		'tipoequiponuevo',
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
const editarTipoEquipoPorID = (
	tipoId,
	data
) => {
	return axiosConfig.put(
		'tipoequipo/' + tipoId,
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
const borrarTipoEquipoPorID = (tipoId) => {
	return axiosConfig.delete(
		'tipoequipo/' + tipoId,
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
const obtenerTipoEquipoPorID = (tipoId) => {
	return axiosConfig.get(
		'tipoequipo/' + tipoId,
		{
			headers: {
				'Content-type': 'application/json',
			},
		}
	);
};

export {
	obtenerTiposEquipos,
	crearTipoEquipo,
	editarTipoEquipoPorID,
	borrarTipoEquipoPorID,
	obtenerTipoEquipoPorID,
};
