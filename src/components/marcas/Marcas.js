import dayjs from 'dayjs';
import React, {
	useEffect,
	useState,
} from 'react';
import {
	crearMarca,
	editarMarcaPorID,
	// obtenerMarcaPorID,
	obtenerMarcas,
	borrarMarcaPorID,
} from '../../services/MarcaService';
import HeaderTable from '../ui/HeaderTable';
import Modal from '../ui/Modal';

export default function Marcas() {
	const [marcas, setMarcas] = useState([]);
	const [editando, setEditando] =
		useState(false);
	const [creando, setCreando] =
		useState(false);
	const [loading, setLoading] =
		useState(false);
	const [query, setQuery] = useState(true);
	const [error, setError] = useState(false);
	const [marca, setMarca] = useState({
		nombre: '',
		estado: true,
	});
	const [errorSend, setErrorSend] = useState({
		status: false,
		msg: '',
	});
	//const [tipoId, setTipoId] = useState('')

	const listMarcas = async () => {
		setLoading(true);
		try {
			setError(false);
			const { data } = await obtenerMarcas(
				query
			);
			setMarcas(data);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		listMarcas();
	}, [query]);

	const cambiarSwitche = () => {
		setQuery(!query);
	};

	const guardarMarca = async () => {
		setErrorSend({ status: false, msg: '' });
		setLoading(true);
		try {
			const res = await crearMarca(marca);
			console.log(res);
			setLoading(true);
			setMarca({ nombre: '' });
			listMarcas();
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
		setMarca({
			...marca,
			[e.target.name]: e.target.value,
		});
	};

	const borrarMarca = async (e) => {
		setLoading(true);
		try {
			setError(false);
			const id = e.target.id;
			console.log(id);
			const res = await borrarMarcaPorID(id);
			console.log(res);
			listMarcas();
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	};

	const editarMarca = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			setError(false);

			const resp = await editarMarcaPorID(
				marca.id_marcas,
				marca
			);
			console.log(resp);
			resetMarca();
			listMarcas();
			setEditando(false);
		} catch (e) {
			setLoading(false);
			console.log(e);
			setError(true);
		}
	};

	const setMarcaPorId = (e) => {
		setEditando(true);
		console.log(e.target.id);
		const marcasFilter = marcas.filter(
			(t) => t.id_marcas == e.target.id
		);
		const est = marcasFilter[0];
		console.log(est);
		setMarca(est);
	};

	const resetMarca = () => {
		setMarca({
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
									Editar Marca
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
									onClick={resetMarca}
								></button>
							</div>
							<div className='modal-body'>
								<form onSubmit={editarMarca}>
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
											value={marca.nombre}
											name='nombre'
										/>
										<select
											class='form-select'
											aria-label='Default select example'
											name='estado'
											value={marca.estado}
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
										onClick={resetMarca}
									>
										Cerrar
									</button>
									<button
										type='submit'
										className='btn btn-primary'
										disabled={
											marca.nombre.length <= 0
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
					titulo={'Marca'}
					guardar={guardarMarca}
					element={marca}
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
					{marcas.map((marca, index) => {
						return (
							<tr key={marca.id_marcas}>
								<th scope='row'>
									{index + 1}
								</th>
								<td>{marca.nombre}</td>
								<td>
									{marca.estado
										? 'Activo'
										: 'Inactivo'}
								</td>
								<td>
									{dayjs(
										marca.fechaCreacion
									).format('YYYY-MM-DD')}
								</td>
								<td>
									{dayjs(
										marca.fechaActualizacion
									).format('YYYY-MM-DD')}
								</td>
								<td>
									<button
										id={marca.id_marcas}
										type='button'
										className='btn btn-success'
										onClick={setMarcaPorId}
										data-bs-toggle='collapse'
										data-bs-target='#collapseWidthExample'
										aria-expanded='false'
										aria-controls='collapseWidthExample'
									>
										Editar
									</button>
									<button
										id={marca.id_marcas}
										type='button'
										className='btn btn-danger'
										onClick={borrarMarca}
									>
										Borrar
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
