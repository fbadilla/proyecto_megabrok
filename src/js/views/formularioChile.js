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
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					return (
						<Fragment>
							<Animated
								animationIn="bounceInLeft"
								animationOut="fadeOut"
								isVisible={true}
								data-animate-effect="fadeInLeft">
								<header
									id="gtco-header"
									className="gtco-cover gtco-cover-sm"
									role="banner"
									style={{ backgroundImage: "url(images/img_6.jpg)" }}>
									<div className="overlay" />
									<div className="gtco-container" />
								</header>
							</Animated>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12">
											<div className="col-md-10 ">
												<h2>Ingresar Formulario</h2>
												<form
													action="#"
													onSubmit={e => actions.handleFormulario(e, this.props.history)}>
													<div className="row form-group">
														<div className="col-md-8">
															<h4>Datos Personales del Paciente</h4>
														</div>
														<div className="col-md-6">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-user" />
																</span>
																<div className="feature-copy">
																	<label>Nombre Completo Paciente</label>
																	<input
																		name="nameReclamo"
																		id="nameReclamo"
																		value={store.formulario.nameReclamo}
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																		readOnly
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-3">
															<div className="feature-left">
																<div className="feature-copy">
																	<label> Rut</label>
																	<input
																		name="rut"
																		id="rut"
																		value={store.formulario.rut}
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																		readOnly
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-3">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Numero Poliza</label>
																	<input
																		name="numpoliza"
																		id="numpoliza"
																		readOnly
																		value={store.formulario.numpoliza}
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="row form-group">
														<div className="col-md-6">
															<h4>Detalles del Diagnostico / Accidente</h4>
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-clipboard" />
																</span>
																<div className="feature-copy">
																	<textarea
																		name="detalle_diagnostico"
																		id="mail"
																		rows="5"
																		placeholder="Diagnóstico o Tipo de Accidente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																	/>
																	<label>
																		<i className="ti-link" />
																		En caso de accidente, incluir el Reporte
																		Policial
																	</label>
																</div>
															</div>
														</div>
													</div>
													<div className="row">
														<div className="form-group">
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
