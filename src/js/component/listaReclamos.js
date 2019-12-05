import React, { Component, Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";

export class ListaReclamos extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}

	render() {
		return (
			<Animated animationIn="fadeInLeft" animationOut="bounceOutLeft" animationInDuration={500} isVisible={true}>
				<Context.Consumer>
					{({ store, actions }) => {
						const foo = () => {
							if (store.filtro) {
								return store.coleccion
									.slice(0)
									.reverse()
									.map((item, i) => {
										return (
											<tr
												key={i}
												className={item.name_estado == "Pendiente" ? "danger" : "primary"}>
												<td scope="row">{item.asociacion_id__id_poliza__nun_poliza}</td>
												<td>{item.asociacion_id__id_poliza__numPolizaLegacy}</td>
												<td>{item.account_id__name_Account}</td>
												<th>{item.name_estado}</th>
												<td>
													{" "}
													{item.asociacion_id__id_persona__nombre +
														" " +
														item.asociacion_id__id_persona__apellido}
												</td>
												<td>{item.asociacion_id__id_persona__rut}</td>
												<td>{item.detalle_diagnostico}</td>
												<td>{item.date}</td>
												<td>{actions.restafecha(item.date)}</td>

												<td>
													<button
														type="button"
														className="btn btn-primary2"
														data-toggle="modal"
														data-target="#modalviewdocumento"
														onClick={() => actions.getDocumentoId2(item.id)}>
														<i className="ti-eye" />
													</button>
												</td>
												<td>
													<Link
														to="/update"
														className="btn btn-primary2"
														onClick={() => actions.handleModReclamo(item)}>
														<i className="ti-marker-alt" />
													</Link>
												</td>
												<td>
													<button
														type="button"
														className="btn btn-primary3"
														data-toggle="modal"
														data-target="#modaldelete"
														onClick={() => actions.handleDeleteReclamo(item.id)}>
														<i className="ti-trash" />
													</button>
												</td>
											</tr>
										);
									});
							} else {
								return store.formularios
									.slice(0)
									.reverse()
									.map((item, i) => {
										return (
											<tr
												key={i}
												className={item.name_estado == "Pendiente" ? "danger" : "primary"}>
												<td scope="row">{item.asociacion_id__id_poliza__nun_poliza}</td>
												<td>{item.asociacion_id__id_poliza__numPolizaLegacy}</td>
												<td>{item.account_id__name_Account}</td>
												<th>{item.name_estado}</th>
												<td>
													{" "}
													{item.asociacion_id__id_persona__nombre +
														" " +
														item.asociacion_id__id_persona__apellido}
												</td>
												<td>{item.asociacion_id__id_persona__rut}</td>
												<td>{item.detalle_diagnostico}</td>
												<td>{item.date}</td>
												<td>{actions.restafecha(item.date)}</td>

												<td>
													<button
														type="button"
														className="btn btn-primary2"
														data-toggle="modal"
														data-target="#modalviewdocumento"
														onClick={() => actions.getDocumentoId2(item.id)}>
														<i className="ti-eye" />
													</button>
												</td>
												<td>
													<Link
														to="/update"
														className="btn btn-primary2"
														onClick={() => actions.handleModReclamo(item)}>
														<i className="ti-marker-alt" />
													</Link>
												</td>
												<td>
													<button
														type="button"
														className="btn btn-primary3"
														data-toggle="modal"
														data-target="#modaldelete"
														onClick={() => actions.handleDelete(item.id)}>
														<i className="ti-trash" />
													</button>
												</td>
											</tr>
										);
									});
							}
						};
						// -------------------------------------------------------------
						if (store.formularios.length > 0) {
							return (
								<Fragment>
									<div className="gtco-section ">
										<div className="col-md-12">
											<input
												name="filtro_reclamo"
												type="text"
												className="form-control"
												placeholder="Filtro"
												onChange={e => actions.handleFiltroReclamo(e)}
											/>
										</div>
									</div>
									<div className="gtco-section ">
										<div className="col-md-12">
											<table className="table">
												<thead>
													<tr>
														<th scope="col">Poliza</th>
														<th scope="col">Poliza Legacy</th>
														<th scope="col">Realizado por</th>
														<th scope="col">Estado</th>
														<th scope="col">Reclamante</th>
														<th scope="col">Rut</th>
														<th scope="col">Detalle</th>
														<th scope="col">Fecha</th>
														<th scope="col">Dias</th>
														<th scope="col">Ver más</th>
														<th scope="col">Editar</th>
														<th scope="col">Eliminar</th>
													</tr>
												</thead>
												<tbody>{foo()}</tbody>
											</table>
										</div>
									</div>
								</Fragment>
							);
						} else {
							return "";
						}
					}}
				</Context.Consumer>
			</Animated>
		);
	}
}
ListaReclamos.propTypes = {
	history: PropTypes.object
};
