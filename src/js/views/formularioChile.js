import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ModalDocumento from "../component/modalDocumento";
import ModalEvento from "../component/modalEvento";
import ModalAviso from "../component/modalAviso";
import { ListaDocumentos } from "../component/listaDocumentos";
import { ListaAsegurados } from "../component/listaAsegurados";
import { SearchComponent } from "../component/search";
import { FormReclamo } from "../component/formReclamo";
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
								animationIn="bounceInDown"
								animationOut="fadeOut"
								isVisible={true}
								data-animate-effect="fadeInLeft">
								<header
									id="gtco-header"
									className="gtco-cover gtco-cover-sm"
									role="banner"
									style={{ backgroundImage: "url(images/img_6.jpg)" }}>
									<div className="overlay" />
									<div className="gtco-container">
										<div className="row">
											<div className="col-md-12 col-md-offset-0 text-left">
												<div className="row row-mt-15em">
													<div className="col-md-7 mt-text ">
														<h1>Formulario de Reclamacion</h1>
														<span className="intro-text-small">
															{" "}
															Por favor asegurese de:
														</span>
														<small className="intro-text-small">
															<i className="ti-check" />
															Completar en su totalidad y enviar un formulario por evento
														</small>
													</div>
												</div>
											</div>
										</div>
									</div>
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
														<h4>Datos Personales del Paciente</h4>
														<div className="col-md-5">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-user" />
																</span>
																<div className="feature-copy">
																	<input
																		name="nameReclamo"
																		id="nameReclamo"
																		placeholder="Nombre completo del paciente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-4">
															<div className="feature-left">
																<div className="feature-copy">
																	<input
																		name="rut"
																		id="rut"
																		placeholder="Ejem: 9999999-9"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-3">
															<div className="feature-left">
																<div className="feature-copy">
																	<input
																		name="numpoliza"
																		id="numpoliza"
																		placeholder="Nº poliza"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="row form-group">
														<h4>Detalles del Diagnostico / Accidente</h4>
														<div className="col-md-8">
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