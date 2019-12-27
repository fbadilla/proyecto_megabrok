import React, { Component, Fragment } from "react";
import { Context } from "../../store/appContext";
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
						let reclamos = {};
						if (store.formularios.length > 0) {
							if (store.filtro) {
								reclamos = store.coleccion
									.slice(0)
									.reverse()
									.map((item, i) => {
										return (
											<tr key={i} className={item.estado == "Pendiente" ? "danger" : "primary"}>
												<td scope="row">{item.numPoliza}</td>
												<td>{item.username}</td>
												<th>{item.estado}</th>
												<th>{item.num_claim}</th>
												<td>{item.nombreReclamante + " " + item.apellidoReclamante}</td>
												<td>{item.detalle_diagnostico}</td>
												<td>{item.date}</td>
												<td>{actions.restafecha(item.date)}</td>
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
														onClick={() => actions.handleDelete(item.reclamo_id)}>
														<i className="ti-trash" />
													</button>
												</td>
											</tr>
										);
									});
							} else {
								reclamos = store.formularios
									.slice(0)
									.reverse()
									.map((item, i) => {
										return (
											<tr key={i} className={item.estado == "Pendiente" ? "danger" : "primary"}>
												<td scope="row">{item.numPoliza}</td>
												<td>{item.username}</td>
												<th>{item.estado}</th>
												<th>{item.num_claim}</th>
												<td> {item.nombreReclamante + " " + item.apellidoReclamante}</td>
												<td>{item.detalle_diagnostico}</td>
												<td>{item.date}</td>
												<td>{actions.restafecha(item.date)}</td>
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
														onClick={() => actions.handleDelete(item.reclamo_id)}>
														<i className="ti-trash" />
													</button>
												</td>
											</tr>
										);
									});
							}
							return (
								<div className="gtco-section ">
									<div className="col-md-12">
										<div className="table-responsive">
											<table className="table table-hover">
												<thead>
													<tr>
														<th scope="col">Poliza</th>
														<th scope="col">Realizado por</th>
														<th scope="col">Estado</th>
														<th scope="col">Nº Claim</th>
														<th scope="col">Reclamante</th>
														<th scope="col">Detalle</th>
														<th scope="col">Fecha</th>
														<th scope="col">Dias</th>
														<th scope="col">Editar</th>
														<th scope="col">Eliminar</th>
													</tr>
												</thead>
												<tbody>{reclamos}</tbody>
											</table>
										</div>
									</div>
								</div>
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
