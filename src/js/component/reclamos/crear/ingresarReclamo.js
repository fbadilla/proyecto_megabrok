import React, { Fragment } from "react";
import { Context } from "../../../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";

export class ingresarReclamo extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.cargarAsegurados();
	}
	render() {
		return (
			<Animated animationIn="fadeInLeft" animationOut="bounceOutLeft" animationInDuration={500} isVisible={true}>
				<Context.Consumer>
					{({ store, actions }) => {
						let statuspoliza = item => {
							if (item.id_poliza__estado_poliza == 96005) {
								return "Activa";
							} else if (
								item.id_poliza__estado_poliza == 96002 ||
								item.id_poliza__estado_poliza == 97008 ||
								item.id_poliza__estado_poliza == 97022 ||
								item.id_poliza__estado_poliza == 97024
							) {
								return "Rechazada ";
							} else if (
								item.id_poliza__estado_poliza == 96003 ||
								item.id_poliza__estado_poliza == 97009 ||
								item.id_poliza__estado_poliza == 97010 ||
								item.id_poliza__estado_poliza == 97011 ||
								item.id_poliza__estado_poliza == 97012 ||
								item.id_poliza__estado_poliza == 97027 ||
								item.id_poliza__estado_poliza == 97025
							) {
								return "Pendiente";
							} else if (item.id_poliza__estado_poliza == 96006) {
								return "Cancelada";
							} else if (
								item.id_poliza__estado_poliza == 96007 ||
								item.id_poliza__estado_poliza == 96010
							) {
								return "Pausa";
							} else if (item.id_poliza__estado_poliza == 97015) {
								return "En Proceso";
							} else if (item.id_poliza__estado_poliza == 97020) {
								return "No Renovada";
							} else if (
								item.id_poliza__estado_poliza == 96001 ||
								item.id_poliza__estado_poliza == 97026 ||
								item.id_poliza__estado_poliza == 96004
							) {
								return "Aprobada";
							} else {
								item.id_poliza__estado_poliza == 96008;
								return "Gracia";
							}
						};
						let StatusCliente = item => {
							if (item.estado_asegurado == 1) {
								return "Activa";
							} else if (item.estado_asegurado == 2) {
								return "Pendiente ";
							} else {
								item.estado_asegurado == 3;
								return "Inactivo";
							}
						};
						let TipoAsegurado = item => {
							if (item.tipo_asegurado == 1) {
								return "Titular";
							} else if (item.tipo_asegurado == 2) {
								return "Conyugue";
							} else if (item.tipo_asegurado == 3) {
								return "Dependiente";
							} else if (item.tipo_asegurado == 4) {
								return "Tutos ";
							} else {
								item.estado_asegurado == 5;
								return "Padres";
							}
						};
						const foo = () => {
							if (store.aseguradosFiltro.length > 0) {
								const personas = store.aseguradosFiltro.map((item, i) => {
									return (
										<tr key={i}>
											<td>{item.id_poliza__nun_poliza}</td>
											<td>{item.id_persona__rut}</td>
											<td>{item.id_persona__nombre + " " + item.id_persona__apellido}</td>
											<td> {item.id_persona__emailPrimario}</td>
											<td> {item.id_poliza__id_Plan__nombre_plan}</td>
											<td> {statuspoliza(item)}</td>
											<td> {StatusCliente(item)}</td>
											<td> {TipoAsegurado(item)}</td>
											<td>
												<Link
													to="/formulariochile"
													className="btn btn-primary2"
													onClick={() => actions.handleAseguradoSelected(item)}>
													<i className="ti-marker-alt" />
												</Link>
											</td>
										</tr>
									);
								});
								return (
									<div className="gtco-section ">
										<div className="table-responsive">
											<table className="table">
												<thead>
													<tr>
														<th scope="col">N° Poliza</th>
														<th scope="col">Rut</th>
														<th scope="col">Nombre</th>
														<th scope="col">Email</th>
														<th scope="col">Plan</th>
														<th scope="col">Status Poliza</th>
														<th scope="col">Status Cliente</th>
														<th scope="col">Tipo Asegurado</th>
														<th scope="col">Generar Reclamo</th>
													</tr>
												</thead>
												<tbody>{personas}</tbody>
											</table>
										</div>
									</div>
								);
							} else {
								return "";
							}
						};
						this.storeContext = store;
						this.actionsContext = actions;
						return (
							<Fragment>
								<div className="gtco-container">
									<div className="row justify-content-center">
										<div className="col-md-10 ">
											<p>
												{" "}
												Para generar un reclamo, busca un asegurado. Puede ser por n° poliza,
												nombre y rut
											</p>
										</div>
										<div className="col-md-10 ">
											<div className="row form-group">
												<div className="col-md-5">
													<div className="input-group  input-group-lg">
														<div className="input-group-prepend">
															<span className="input-group-text" id="basic-addon1">
																<i className="ti-search" />
															</span>
														</div>
														<input
															name="busqueda"
															type="busqueda"
															className="form-control"
															placeholder="Buscar asegurado"
															onChange={e => actions.handleChange(e)}
														/>
													</div>
												</div>
												<div className="col-md-5">
													<input
														type="submit"
														value="Buscar"
														className="btn btn-primary"
														onClick={e =>
															actions.handleSearchPersona(e, this.props.history)
														}
													/>
												</div>
											</div>
											{foo()}
										</div>
									</div>
								</div>
							</Fragment>
						);
					}}
				</Context.Consumer>
			</Animated>
		);
	}
}
ingresarReclamo.propTypes = {
	history: PropTypes.object
};
