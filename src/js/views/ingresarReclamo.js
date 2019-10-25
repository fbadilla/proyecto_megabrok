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

export class ingresarReclamo extends React.Component {
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<Fragment>
							<header
								id="gtco-header"
								className="gtco-cover gtco-cover-sm"
								role="banner"
								style={{ backgroundImage: "url(images/img_1.jpg)" }}>
								<div className="overlay" />
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12 col-md-offset-0 text-left">
											<div className="row row-mt-15em">
												<div className="col-md-7 mt-text ">
													<h1>Formulario de Reclamacion</h1>
													<span className="intro-text-small"> Por favor asegurese de:</span>
													<span className="intro-text-small">
														<li>
															<i className="ti-check" />
															Completar un formulario por evento
														</li>
														<li>
															<i className="ti-check" />
															Enviar y completar este formulario en su totalidad
														</li>
														<li>
															<i className="ti-check" />
															Enviar facturas originales, detallando todos los servicios
														</li>
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							</header>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12">
											<div className="col-md-10 ">
												<h2>Bucar datos del cliente por poliza</h2>
												<SearchComponent />
												<h3>Resultados </h3>
												<ListaAsegurados />
												<h3>Generar Reclamo</h3>
												<FormReclamo />
											</div>
											<div className="col-md-10 ">
												<h2>Ingresar Formulario</h2>
												<form
													action="#"
													onSubmit={e => actions.handleevento(e, this.props.history)}>
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
																		//onChange={e => actions.handleMiembro(e)}
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
																		placeholder="ejemplo: 5555"
																		//onChange={e => actions.handleMiembro(e)}
																		type="text"
																		className="form-control"
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
																	<input
																		name="detalle_diagnostico"
																		id="mail"
																		placeholder="Diagnóstico o Tipo de Accidente"
																		//onChange={e => actions.handleMiembro(e)}
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
																Ingresar
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
															<div className="col-md-3">
																<Link to="/" className="btn btn-primary">
																	Guardar formulario
																</Link>
															</div>

															<div className="form-group">
																<input
																	type="submit"
																	value="modificar"
																	className="btn btn-primary"
																/>
															</div>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<ModalDocumento />
							<ModalEvento />
							<ModalAviso />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
ingresarReclamo.propTypes = {
	history: PropTypes.object
};
