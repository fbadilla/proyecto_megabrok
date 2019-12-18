import React, { Component, Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class ListaServicios extends Component {
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
						let columnas = Object.entries(
							store.servicios.reduce((acc, c) => {
								acc[c.proveedor_id] = (acc[c.proveedor_id] || []).concat(c);
								return acc;
							}, {})
						).sort((a, b) => a[0] < b[0]);

						console.log("esta esta", columnas);
						columnas = columnas.map((servicio, i) => {
							console.log("aqui estoy", servicio);
							<h3>Servicios:</h3>;

							return (
								<div className="row" key={i}>
									<div className="col-md-4">
										<h6>{servicio[1][0].proveedor_id__nombre_proveedor}:</h6>
									</div>
									<div className="col-md-4 offset-md-2">
										<button
											type="button"
											className="btn btn-primary2"
											data-toggle="modal"
											data-target="#modalArchivo"
											onClick={() => actions.handleSelectedServicio(servicio[1][0], i)}>
											<i className="ti-plus" />
											Subir archivo
										</button>
										<button
											type="button"
											className="btn btn-primary2"
											onClick={() =>
												servicio[1][0].archivoServicio.length < 1 ||
												servicio[1][0].archivoServicio.length == null
													? alert("no existe el documento")
													: window.open(
															store.apiUrl + "/media/" + servicio[1][0].archivoServicio
													  )
											}>
											<i className="ti-image" />
										</button>
									</div>
									<div className="col-md-8">
										<table className="table2 table-striped table-sm">
											<thead>
												<tr>
													<th>Detalle </th>
													<th>Documentos</th>
													<th>Monto</th>
													<th>Pago</th>
													<th>Editar</th>
												</tr>
											</thead>
											<tbody>
												{servicio[1].map(row => {
													const { detalle, documentos, pago, id } = row;
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
																	onClick={() => actions.handleSelectedServicio(id)}>
																	<i className="ti-pencil" />
																</button>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
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
ListaServicios.propTypes = {
	history: PropTypes.array
};
