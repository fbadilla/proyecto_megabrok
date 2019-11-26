import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import ModalDocumento from "../component/modalDocumento";
import { ListaDocumentos } from "../component/listaDocumentos";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";
import ModalDocumentoUpdate from "../component/modalDocumentoUpdate";

export class FormDocUpdate extends React.Component {
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
									<div className="gtco-container" />
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
													onSubmit={e => actions.handleEnvioMod(e, this.props.history)}>
													<div className="row form-group">
														<h4>Datos Personales del Paciente</h4>
														<div className="col-md-6">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-user" />
																</span>
																<div className="feature-copy">
																	<label>Nombre Completo Paciente</label>
																	<input
																		name="nameReclamo"
																		className="form-control"
																		id="nameReclamo"
																		onChange={e => actions.handleForm(e)}
																		value={store.formulario.nameReclamo}
																		type="text"
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
																		id="disabledTextInput"
																		onChange={e => actions.handleForm(e)}
																		value={store.formulario.rut}
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
																		id="disabledTextInput"
																		onChange={e => actions.handleForm(e)}
																		value={store.formulario.numpoliza}
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
														<div className="col-md-6">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-clipboard" />
																</span>
																<div className="feature-copy">
																	<textarea
																		name="detalle_diagnostico"
																		id="mail"
																		rows="5"
																		onChange={e => actions.handleForm(e)}
																		value={store.formulario.detalle_diagnostico}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-3">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Estado Reclamo </label>
																	<select
																		className="form-control"
																		id="name_estado"
																		name="name_estado"
																		value={store.formulario.name_estado}
																		onChange={e => actions.handleForm(e)}>
																		<option>Pendiente</option>
																		<option>Aprobada</option>
																		<option>Rechazada</option>
																		<option>Anulada</option>
																	</select>
																</div>
															</div>
														</div>
														<div className="col-md-3">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Crear formulario </label>
																	<button
																		type="button"
																		className="btn btn-primary"
																		onClick={e =>
																			actions.handlePDFFormulario(
																				e,
																				store.formulario.id
																			)
																		}>
																		Crear
																	</button>
																</div>
															</div>
														</div>
														<div className="col-md-4 offset-md-4">
															<input
																type="submit"
																value="Modificar"
																className="btn btn-primary"
															/>
														</div>
													</div>
													<div className="row form-group">
														<div className="col-md-8">
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
															<button
																type="button"
																className="btn btn-primary"
																onClick={() => actions.getDocumentoId()}>
																<i className="ti-reload" />
																Actualizar Servicios
															</button>
														</div>
													</div>
													<div className="row">
														<div className="col-md-12">
															<ListaDocumentos />
														</div>
													</div>
													<div className="row">
														<Link to="/reclamos" className="btn btn-primary">
															Ver Reclamos
														</Link>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<ModalDocumentoUpdate />
							<ModalDocumento />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
FormDocUpdate.propTypes = {
	history: PropTypes.object
};
