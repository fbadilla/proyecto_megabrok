import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";

export class FormularioChile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			nameReclamo: "",
			rut: "",
			numpoliza: "",
			detalle_diagnostico: ""
		};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	componentDidMount() {
		this.actionsContext.getaccount();
		this.actionsContext.getServicios();
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					return (
						<Fragment>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row justify-content-center">
										<div className="col-md-10 ">
											<div className="row">
												<div className="col-md-10 ">
													<h2>Ingresar Formulario</h2>
												</div>
											</div>
											<form
												action="#"
												onSubmit={e => actions.handleFormulario(e, this.props.history)}>
												<div className="row form-group">
													<div className="col-md-12">
														<h4>Datos Personales del Paciente</h4>
													</div>
													<div className="col-md-4">
														<div className="feature-left">
															<span className="icon">
																<i className="ti-user" />
															</span>
															<div className="feature-copy">
																<label>Nombre Completo Paciente</label>
																<input
																	name="nameReclamo"
																	id="nameReclamo"
																	value={
																		store.formulario.nombreReclamante +
																		" " +
																		store.formulario.apellidoReclamante
																	}
																	onChange={e => actions.handleForm(e)}
																	type="text"
																	className="form-control"
																	readOnly
																/>
															</div>
														</div>
													</div>
													<div className="col-md-2">
														<div className="feature-left">
															<div className="feature-copy">
																<label>Numero Poliza</label>
																<input
																	name="numPoliza"
																	id="numPoliza"
																	readOnly
																	value={store.formulario.numPoliza}
																	onChange={e => actions.handleForm(e)}
																	type="text"
																	className="form-control"
																/>
															</div>
														</div>
													</div>
												</div>

												<div className="row form-group">
													<div className="col-md-12">
														<h4>Detalles del Diagnostico / Accidente</h4>
													</div>
													<div className="col-md-4">
														<div className="feature-left">
															<span className="icon">
																<i className="ti-clipboard" />
															</span>
															<div className="feature-copy">
																<label>Diagnostico o tipo de Accidente</label>
																<input
																	name="detalle_diagnostico"
																	id="detalle_diagnostico"
																	onChange={e => actions.handleForm(e)}
																	value={store.formulario.detalle_diagnostico}
																	type="text"
																	className="form-control"
																/>
															</div>
														</div>
													</div>
													<div className="col-md-2">
														<div className="feature-left">
															<div className="feature-copy">
																<label>Fecha de Recepción</label>
																<input
																	name="Fecha_recepcion"
																	id="Fecha_recepcion"
																	value={store.formulario.Fecha_recepcion}
																	onChange={e => actions.handleForm(e)}
																	type="date"
																	className="form-control"
																/>
															</div>
														</div>
													</div>
												</div>
												<div className="row form-group">
													<div className="col-md-3 offset-md-7">
														<input
															type="submit"
															value="aceptar"
															className="btn btn-primary"
														/>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
FormularioChile.propTypes = {
	history: PropTypes.object
};
