import React from 'react';

export default function Modal({
	titulo,
	guardar,
	element,
	change,
}) {
	const guadarElement = (e) => {
		e.preventDefault();
		guardar();
	};

	const handleChange = (e) => {
		change(e);
	};

	return (
		<div
			// className='modal fade'
			id='exampleModal'
			tabIndex={-1}
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'

			// className='modal fade'
			// tabindex='-1'
			// aria-labelledby='exampleModalLabel'
			// aria-hidden='true'
		>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5
							className='modal-title'
							id='exampleModalLabel'
						>
							Nuevo Inventario
						</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div className='modal-body'>
						<form onSubmit={guadarElement}>
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
									value={element.precio}
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
									value={element.estado}
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
									value={element.marca}
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
									value={element.usuario}
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
									value={element.fechaCompra}
									name='fechaCompra'
								/>
							</div>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
							>
								Cerrar
							</button>
							<button
								type='submit'
								className='btn btn-primary'
								disabled={
									element.precio.length <= 0
								}
							>
								Enviar
							</button>
						</form>
					</div>
					<div className='modal-footer'></div>
				</div>
			</div>
		</div>
	);
}
