import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ModalDocumento from "../component/modalDocumento";
import { ListaDocumentos } from "../component/listaDocumentos";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";

export class FormDoc extends React.Component {
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
		this.actionsContext.getDocumentoId();
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
														<h2>Servicios Prestados</h2>
														<span className="intro-text-small">
															{" "}
															Por favor ingrese los servicios prestados:
														</span>
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
												<h2>
													Reclamo Nº <h1>{store.formulario.id}</h1>
												</h2>
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
																		readOnly
																		className="form-control"
																		id="static"
																		placeholder={store.formulario.nameReclamo}
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-4">
															<div className="feature-left">
																<div className="feature-copy">
																	<input
																		name="rut"
																		id="disabledTextInput"
																		placeholder={store.formulario.rut}
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
																	<input
																		name="numpoliza"
																		id="disabledTextInput"
																		placeholder={store.formulario.numpoliza}
																		type="text"
																		className="form-control"
																		readOnly
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
																		placeholder={
																			store.formulario.detalle_diagnostico
																		}
																		type="text"
																		readOnly
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="row form-group">
														<div className="col-md-6">
															<h4>Datos sobre los Servicios Prestados</h4>
														</div>
														<div className="col-md-6">
															<button
																type="button"
																className="btn btn-primary"
																data-toggle="modal"
																data-target="#modaldocumento">
																Agregar Servicio
															</button>
														</div>
													</div>
													<div className="row">
														<div className="col-md-8">
															<ListaDocumentos />
														</div>
													</div>
													<div className="row">
														<div className="form-group">
															<Link to="/reclamos" className="btn btn-primary">
																Ver Reclamos
															</Link>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<ModalDocumento />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
FormDoc.propTypes = {
	history: PropTypes.object
};
