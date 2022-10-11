import dayjs from 'dayjs';
import React, {
	useEffect,
	useState,
} from 'react';
import {
	crearinventario,
	obtenerinventarios,
	editarinventarioPorID,
	borrarinventarioPorID,
} from '../../services/InventarioService';
import HeaderTableinventario from '../ui/HeaderTableinventario';
import Modalinventarios from '../ui/ModalInventarios';
let dollarUS = Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});
export default function Inventarios() {
	const [inventarios, setInventarios] =
		useState([]);
	const [editando, setEditando] =
		useState(false);
	const [creando, setCreando] =
		useState(false);
	const [loading, setLoading] =
		useState(false);
	const [query, setQuery] = useState(true);
	const [error, setError] = useState(false);
	const [inventario, setinventario] = useState(
		{
			precio: '',
			estado: '',
			marca: '',
			usuario: '',
			fechaCompra: '',
		}
	);
	const [errorSend, setErrorSend] = useState({
		status: false,
		msg: '',
	});
	//const [tipoId, setTipoId] = useState('')

	const listinventarios = async () => {
		setLoading(true);
		try {
			setError(false);
			const { data } =
				await obtenerinventarios(query);
			setInventarios(data);
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		listinventarios();
	}, [query]);

	const cambiarSwitche = () => {
		setQuery(!query);
	};

	const guardarinventario = async () => {
		setErrorSend({ status: false, msg: '' });
		setLoading(true);
		try {
			const res = await crearinventario(
				inventario
			);
			console.log(res);
			setLoading(true);
			setinventario({
				precio: '',
				estado: '',
				marca: '',
				usuario: '',
				fechaCompra: '',
			});
			listinventarios();
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
		setinventario({
			...inventario,
			[e.target.name]: e.target.value,
		});
	};

	const borrarinventario = async (e) => {
		setLoading(true);
		try {
			setError(false);
			const id = e.target.id;
			console.log(id);
			const res = await borrarinventarioPorID(
				id
			);
			console.log(res);
			listinventarios();
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	};

	const editarinventario = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			setError(false);

			const resp = await editarinventarioPorID(
				inventario.serial,
				inventario
			);
			console.log(resp);
			resetinventario();
			listinventarios();
			setEditando(false);
		} catch (e) {
			setLoading(false);
			console.log(e);
			setError(true);
		}
	};

	const setinventarioPorId = (e) => {
		setEditando(true);
		console.log(e.target.id);
		const inventariosFilter =
			inventarios.filter(
				(t) => t.serial == e.target.id
			);
		const est = inventariosFilter[0];
		console.log(est);
		setinventario(est);
	};

	const resetinventario = () => {
		setinventario({
			precio: '',
			estado: '',
			marca: '',
			usuario: '',
			fechaCompra: '',
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
									Editar inventario
								</h5>
								<button
									type='button'
									className='btn-close'
									data-bs-dismiss='modal'
									aria-label='Close'
									onClick={resetinventario}
								></button>
							</div>
							<div className='modal-body'>
								<form
									onSubmit={editarinventario}
								>
									<div className='mb-3'>
										<label
											for='recipient-precio'
											className='col-form-label'
										>
											Precio:
										</label>
										<input
											type='number'
											className='form-control'
											id='recipient-precio'
											onChange={handleChange}
											value={inventario.precio}
											name='precio'
										/>
										<label
											for='recipient-estado'
											className='col-form-label'
										>
											Estado:
										</label>
										<input
											type='text'
											className='form-control'
											id='recipient-estado'
											onChange={handleChange}
											value={inventario.estado}
											name='estado'
										/>
										<label
											for='recipient-marca'
											className='col-form-label'
										>
											Marca:
										</label>
										<input
											type='text'
											className='form-control'
											id='recipient-marca'
											onChange={handleChange}
											value={inventario.marca}
											name='marca'
										/>

										<label
											for='recipient-usuario'
											className='col-form-label'
										>
											usuario:
										</label>
										<input
											type='text'
											className='form-control'
											id='recipient-usuario'
											onChange={handleChange}
											value={
												inventario.usuario
											}
											name='usuario'
										/>
										<label
											for='recipient-fecha'
											className='col-form-label'
										>
											fecha:
										</label>
										<input
											type='date'
											className='form-control'
											id='recipient-fecha'
											onChange={handleChange}
											value={
												inventario.fechaCompra
											}
											name='fechaCompra'
										/>
									</div>
									<button
										type='button'
										className='btn btn-secondary'
										data-bs-dismiss='modal'
										onClick={resetinventario}
									>
										Cerrar
									</button>
									<button
										type='submit'
										className='btn btn-primary'
										// disabled={
										// 	(inventario.precio
										// 		.length ||
										// 		inventario.marca
										// 			.length) <= 0
										// }
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
				<Modalinventarios
					titulo={'inventario'}
					guardar={guardarinventario}
					element={inventario}
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
				<HeaderTableinventario />
				<tbody>
					{inventarios.map(
						(inventario, index) => {
							return (
								<tr key={inventario.serial}>
									<th scope='row'>
										{index + 1}
									</th>
									<td>
										{dollarUS.format(
											inventario.precio
										)}
										;
									</td>
									<td>
										{inventario.estado == 10
											? 'En uso'
											: 'Disponible'}
									</td>
									<td>'{inventario.marca}'</td>
									<td>
										'{inventario.usuario}'
									</td>

									<td>
										{dayjs(
											inventario.fechaCompra
										).format('YYYY-MM-DD')}
									</td>
									<td>
										<button
											id={inventario.serial}
											type='button'
											className='btn btn-success'
											onClick={
												setinventarioPorId
											}
											data-bs-toggle='collapse'
											data-bs-target='#collapseWidthExample'
											aria-expanded='false'
											aria-controls='collapseWidthExample'
										>
											Editar
										</button>
										<button
											id={inventario.serial}
											type='button'
											className='btn btn-danger'
											onClick={
												borrarinventario
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
