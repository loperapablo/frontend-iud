import dayjs from 'dayjs';
import React, {
	useEffect,
	useState,
} from 'react';
import {
	crearTipoEquipo,
	// obtenerTipoEquipoPorID,
	obtenerTiposEquipos,
	editarTipoEquipoPorID,
	borrarTipoEquipoPorID,
} from '../../services/TipoEquipoService';
import HeaderTable from '../ui/HeaderTable';
import Modal from '../ui/Modal';

export default function TipoEquipos() {
	const [tipoEquipos, settipoEquipos] =
		useState([]);
	const [editando, setEditando] =
		useState(false);
	const [creando, setCreando] =
		useState(false);
	const [loading, setLoading] =
		useState(false);
	const [query, setQuery] = useState(true);
	const [error, setError] = useState(false);
	const [tipoEquipo, settipoEquipo] = useState(
		{
			nombre: '',
			estado: true,
		}
	);
	const [errorSend, setErrorSend] = useState({
		status: false,
		msg: '',
	});
	//const [tipoId, setTipoId] = useState('')

	const listtipoEquipos = async () => {
		setLoading(true);
		try {
			setError(false);
			const { data } =
				await obtenerTiposEquipos(query);
			settipoEquipos(data);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		listtipoEquipos();
	}, [query]);

	const cambiarSwitche = () => {
		setQuery(!query);
	};

	const guardartipoEquipo = async () => {
		setErrorSend({ status: false, msg: '' });
		setLoading(true);
		try {
			const res = await crearTipoEquipo(
				tipoEquipo
			);
			console.log(res);
			setLoading(true);
			settipoEquipo({ nombre: '' });
			listtipoEquipos();
			setCreando(false);
		} catch (e) {
			const { status, data } = e.response;
			setErrorSend({
				status: true,
				msg: data.msg,
			});
			console.log(e);
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		settipoEquipo({
			...tipoEquipo,
			[e.target.name]: e.target.value,
		});
	};

	const borrartipoEquipo = async (e) => {
		setLoading(true);
		try {
			setError(false);
			const id = e.target.id;
			console.log(id);
			const res = await borrarTipoEquipoPorID(
				id
			);
			console.log(res);
			listtipoEquipos();
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	};

	const editartipoEquipo = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			setError(false);

			const resp = await editarTipoEquipoPorID(
				tipoEquipo.idtipo_equipo,
				tipoEquipo
			);
			console.log(resp);
			resettipoEquipo();
			listtipoEquipos();
			setEditando(false);
		} catch (e) {
			setLoading(false);
			console.log(e);
			setError(true);
		}
	};

	const settipoEquipoPorId = (e) => {
		setEditando(true);
		console.log(e.target.id);
		const tipoEquiposFilter =
			tipoEquipos.filter(
				(t) => t.idtipo_equipo == e.target.id
			);
		const est = tipoEquiposFilter[0];
		console.log(est);
		settipoEquipo(est);
	};

	const resettipoEquipo = () => {
		settipoEquipo({
			nombre: '',
			estado: 1,
		});
	};

	return (
		<div>
			{editando && (
				<div id='collapseWidthExample'>
					<div className='modal-dialog'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5
									className='modal-title'
									id='exampleModal2Label'
								>
									Editar tipoEquipo
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
									onClick={resettipoEquipo}
								></button>
							</div>
							<div className='modal-body'>
								<form
									onSubmit={editartipoEquipo}
								>
									<div className='mb-3'>
										<label
											for='recipient-name'
											className='col-form-label'
										>
											Nombre:
										</label>
										<input
											type='text'
											className='form-control'
											id='recipient-name'
											onChange={handleChange}
											value={tipoEquipo.nombre}
											name='nombre'
										/>
										<select
											class='form-select'
											aria-label='Default select example'
											name='estado'
											value={tipoEquipo.estado}
											onChange={handleChange}
										>
											<option value={0}>
												Inactivo
											</option>
											<option value={1}>
												Activo
											</option>
										</select>
									</div>
									<button
										type='button'
										className='btn btn-secondary'
										data-bs-dismiss='modal'
										onClick={resettipoEquipo}
									>
										Cerrar
									</button>
									<button
										type='submit'
										className='btn btn-primary'
										disabled={
											tipoEquipo.nombre
												.length <= 0
										}
										data-bs-dismiss='modal'
									>
										Enviar
									</button>
								</form>
							</div>
							<div className='modal-footer'></div>
						</div>
					</div>
				</div>
			)}

			{creando && (
				<Modal
					titulo={'tipoEquipo'}
					guardar={guardartipoEquipo}
					element={tipoEquipo}
					change={handleChange}
				/>
			)}
			<button
				type='button'
				className='btn btn-primary'
				data-bs-toggle='modal'
				data-bs-target='#exampleModal'
				onClick={setCreando}
			>
				Nuevo
			</button>

			{loading && (
				<div className='d-flex justify-content-center'>
					<div
						className='spinner-border'
						role='status'
					>
						<span className='visually-hidden'>
							Loading...
						</span>
					</div>
				</div>
			)}
			{errorSend.status && (
				<div
					className='alert alert-danger'
					role='alert'
				>
					{errorSend.msg}
				</div>
			)}
			{error && (
				<div
					className='alert alert-danger'
					role='alert'
				>
					Error al cargar datos
				</div>
			)}
			<table className='table'>
				<HeaderTable />
				<tbody>
					{tipoEquipos.map(
						(tipoEquipo, index) => {
							return (
								<tr
									key={
										tipoEquipo.idtipo_equipo
									}
								>
									<th scope='row'>
										{index + 1}
									</th>
									<td>{tipoEquipo.nombre}</td>
									<td>
										{tipoEquipo.estado
											? 'Activo'
											: 'Inactivo'}
									</td>
									<td>
										{dayjs(
											tipoEquipo.fechaCreacion
										).format('YYYY-MM-DD')}
									</td>
									<td>
										{dayjs(
											tipoEquipo.fechaActualizacion
										).format('YYYY-MM-DD')}
									</td>
									<td>
										<button
											id={
												tipoEquipo.idtipo_equipo
											}
											type='button'
											className='btn btn-success'
											onClick={
												settipoEquipoPorId
											}
											data-bs-toggle='collapse'
											data-bs-target='#collapseWidthExample'
											aria-expanded='false'
											aria-controls='collapseWidthExample'
										>
											Editar
										</button>
										<button
											id={
												tipoEquipo.idtipo_equipo
											}
											type='button'
											className='btn btn-danger'
											onClick={
												borrartipoEquipo
											}
										>
											Borrar
										</button>
									</td>
								</tr>
							);
						}
					)}
				</tbody>
			</table>
		</div>
	);
}
