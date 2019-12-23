import React, { Component, Fragment } from "react";
import { Context } from "../../store/appContext";
import PropTypes from "prop-types";

export class ListaServiciosDetalle extends Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					if (store.servicios.length > 0) {
						let columnas = store.servicios.map((servicio, i) => {
							return (
								<div className="col-md-8" key={i}>
									<div className="row row2 border rounded">
										<div className="col-md-5 mt-4">
											<h6>{servicio.proveedor_id__nombre_proveedor}:</h6>
										</div>
										<div className="col-md-auto mt-5 offset-md-2 ">
											<button
												type="button"
												className="btn btn-primary2"
												data-toggle="modal"
												data-target="#modalArchivo"
												onClick={() => actions.handleSelectedArchivo(servicio)}>
												<i className="ti-pencil" />
												Modificar
											</button>
											<button
												type="button"
												className="btn btn-primary2"
												data-dismiss="modal"
												data-toggle="modal"
												data-target="#modalDetalleServicioUpdate"
												onClick={() => actions.handleSelectedServicioUpdate(servicio)}>
												<i className="ti-plus" /> Nuevo Detalle
											</button>
										</div>
										<div className="col-md-12">
											<table className="table2 table-striped table-sm">
												<thead>
													<tr>
														<th>Detalle </th>
														<th>Documentos</th>
														<th>Monto</th>
														<th>Pago</th>
														<th>Editar</th>
														<th>Eliminar</th>
													</tr>
												</thead>
												<tbody>
													{servicio.DetalleServicio.map(row => {
														const { detalle, documentos, pago, id, servicioid } = row;
														return (
															<tr key={i}>
																<td>{detalle}</td>
																<td>
																	{documentos.map((doc, i) => doc.numdoc).join(" - ")}
																</td>
																<td>
																	{documentos
																		.map((doc, i) => doc.montodoc)
																		.reduce((a, b) => parseInt(a) + parseInt(b), 0)}
																</td>
																<td>{pago}</td>
																<td>
																	<button
																		type="button"
																		className="btn btn-primary2"
																		data-toggle="modal"
																		data-target="#modalservicioupdate"
																		onClick={() =>
																			actions.handleSelectedServicio(
																				{ id },
																				row,
																				servicio.id
																			)
																		}>
																		<i className="ti-pencil" />
																	</button>
																</td>
																<td>
																	<button
																		type="button"
																		className="btn btn-primary2"
																		data-toggle="modal"
																		data-target="#modaldeleteservicio"
																		onClick={() => actions.handleDelete({ id })}>
																		<i className="ti-trash" />
																	</button>
																</td>
															</tr>
														);
													})}
												</tbody>
											</table>
										</div>
									</div>
									<div className="row justify-content-end">
										<div className="col-1">
											<img
												src="images/PDF.png"
												className="rounded-sm w-100 "
												onClick={() =>
													servicio.archivoServicio.length < 1 ||
													servicio.archivoServicio.length == null
														? alert("no existe el documento")
														: window.open(
																store.apiUrl + "/media/" + servicio.archivoServicio
														  )
												}
											/>
										</div>
										<div className="col-3">
											<span
												onClick={() =>
													servicio.archivoServicio.length < 1 ||
													servicio.archivoServicio.length == null
														? alert("no existe el documento")
														: window.open(
																store.apiUrl + "/media/" + servicio.archivoServicio
														  )
												}>
												{servicio.archivoServicio.slice(11)}
											</span>
										</div>
									</div>
								</div>
							);
						});

						return (
							<Fragment>
								{columnas}
								<div className="row justify-content-end">
									<div className="col-md-6 ">
										<div className="feature-left">
											<button
												type="button"
												className="btn btn-primary"
												onClick={e =>
													actions.handlePDFFormulario(e, store.formulario.reclamo_id)
												}>
												CREAR FORMULARIO
											</button>
										</div>
									</div>
								</div>
							</Fragment>
						);
					} else {
						return "";
					}
				}}
			</Context.Consumer>
		);
	}
}
ListaServiciosDetalle.propTypes = {
	history: PropTypes.array
};
