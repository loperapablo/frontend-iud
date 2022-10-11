import dayjs from 'dayjs';
import React, {
	useEffect,
	useState,
} from 'react';
import {
	crearusuario,
	obtenerUsuarios,
	editarusuarioPorID,
	borrarusuarioPorID,
} from '../../services/UsuarioService';
import HeaderTableUsuarios from '../ui/HeaderTableUsuarios';
import ModalUsuarios from '../ui/ModalUsuarios';

export default function Usuarios() {
	const [usuarios, setUsuarios] = useState([]);
	const [editando, setEditando] =
		useState(false);
	const [creando, setCreando] =
		useState(false);
	const [loading, setLoading] =
		useState(false);
	const [query, setQuery] = useState(true);
	const [error, setError] = useState(false);
	const [usuario, setusuario] = useState({
		nombre: '',
		email: '',
		estado: true,
	});
	const [errorSend, setErrorSend] = useState({
		status: false,
		msg: '',
	});
	//const [tipoId, setTipoId] = useState('')

	const listusuarios = async () => {
		setLoading(true);
		try {
			setError(false);
			const { data } = await obtenerUsuarios(
				query
			);
			setUsuarios(data);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		listusuarios();
	}, [query]);

	const cambiarSwitche = () => {
		setQuery(!query);
	};

	const guardarusuario = async () => {
		setErrorSend({ status: false, msg: '' });
		setLoading(true);
		try {
			const res = await crearusuario(usuario);
			console.log(res);
			setLoading(true);
			setusuario({ nombre: '', email: '' });
			listusuarios();
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
		setusuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	const borrarusuario = async (e) => {
		setLoading(true);
		try {
			setError(false);
			const id = e.target.id;
			console.log(id);
			const res = await borrarusuarioPorID(id);
			console.log(res);
			listusuarios();
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	};

	const editarusuario = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			setError(false);

			const resp = await editarusuarioPorID(
				usuario.id_usuarios,
				usuario
			);
			console.log(resp);
			resetusuario();
			listusuarios();
			setEditando(false);
		} catch (e) {
			setLoading(false);
			console.log(e);
			setError(true);
		}
	};

	const setusuarioPorId = (e) => {
		setEditando(true);
		console.log(e.target.id);
		const usuariosFilter = usuarios.filter(
			(t) => t.id_usuarios == e.target.id
		);
		const est = usuariosFilter[0];
		console.log(est);
		setusuario(est);
	};

	const resetusuario = () => {
		setusuario({
			nombre: '',
			email: '',
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
									Editar usuario
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
									onClick={resetusuario}
								></button>
							</div>
							<div className='modal-body'>
								<form onSubmit={editarusuario}>
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
											value={usuario.nombre}
											name='nombre'
										/>
										<label
											for='recipient-name'
											className='col-form-label'
										>
											Email:
										</label>
										<input
											type='text'
											className='form-control'
											id='recipient-email'
											onChange={handleChange}
											value={usuario.email}
											name='email'
										/>
										<label
											for='recipient-state'
											className='col-form-label'
										>
											Estado:
										</label>
										<select
											class='form-select'
											aria-label='Default select example'
											name='estado'
											value={usuario.estado}
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
										onClick={resetusuario}
									>
										Cerrar
									</button>
									<button
										type='submit'
										className='btn btn-primary'
										disabled={
											(usuario.nombre.length ||
												usuario.email
													.length) <= 0
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
				<ModalUsuarios
					titulo={'usuario'}
					guardar={guardarusuario}
					element={usuario}
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
				<HeaderTableUsuarios />
				<tbody>
					{usuarios.map((usuario, index) => {
						return (
							<tr key={usuario.id_usuarios}>
								<th scope='row'>
									{index + 1}
								</th>
								<td>{usuario.nombre}</td>
								<td>'{usuario.email}'</td>
								<td>
									{usuario.estado
										? 'Activo'
										: 'Inactivo'}
								</td>
								<td>
									{dayjs(
										usuario.fechaCreacion
									).format('YYYY-MM-DD')}
								</td>
								<td>
									{dayjs(
										usuario.fechaActualizacion
									).format('YYYY-MM-DD')}
								</td>
								<td>
									<button
										id={usuario.id_usuarios}
										type='button'
										className='btn btn-success'
										onClick={setusuarioPorId}
										data-bs-toggle='collapse'
										data-bs-target='#collapseWidthExample'
										aria-expanded='false'
										aria-controls='collapseWidthExample'
									>
										Editar
									</button>
									<button
										id={usuario.id_usuarios}
										type='button'
										className='btn btn-danger'
										onClick={borrarusuario}
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
