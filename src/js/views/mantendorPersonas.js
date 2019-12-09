import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class MantenedorPersonas extends React.Component {
	constructor(props) {
		super(props);
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
							<header
								id="gtco-header"
								className="gtco-cover gtco-cover-sm"
								role="banner"
								style={{ backgroundImage: "url(images/img_2.jpg)" }}>
								<div className="overlay" />
							</header>
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12">
											<div className="col-md-10 ">
												<h3>Datos Personales</h3>
												<form
													action="#"
													//onSubmit={e => actions.handleEnvioMod(e, this.props.history)}
												>
													<div className="row form-group">
														<div className="col-md-12">
															<h4>Datos Personales</h4>
														</div>
														<div className="col-md-2">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-user" />
																</span>
															</div>
														</div>
														<div className="col-md-4">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Nombres</label>
																	<input
																		name="nombreCliente"
																		className="form-control"
																		id="nombreCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-3">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Apellidos</label>
																	<input
																		name="apellidoCliente"
																		id="apellidoCliente"
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
																	<label> Rut</label>
																	<input
																		name="rut"
																		id="rut"
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
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-folder" />
																</span>
																<div className="feature-copy">
																	<label>Nombre de Pila</label>
																	<input
																		name="nombrePilaCliente"
																		className="form-control"
																		id="nombrePilaCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>

														<div className="col-md-3">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Fecha Nacimiento</label>
																	<input
																		name="fecha_nacimiento_persona"
																		id="fecha_nacimiento_persona"
																		onChange={e => actions.handleForm(e)}
																		type="date"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-3">
															<div className="feature-left">
																<div className="feature-copy">
																	<label> Isapre</label>
																	<input
																		name="isapre"
																		id="isapre"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="row form-group">
														<div className="col-md-8">
															<h4>Datos de Contacto</h4>
														</div>
														<div className="col-md-6">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-email" />
																</span>
																<div className="feature-copy">
																	<label>E-mail Primario</label>
																	<input
																		name="emailPrimarioCliente"
																		className="form-control"
																		id="emailPrimarioCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>E-mail Secundario</label>
																	<input
																		name="emailSecundarioCliente"
																		className="form-control"
																		id="emailSecundarioCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-home" />
																</span>
																<div className="feature-copy">
																	<label>Direccion particular</label>
																	<input
																		name="direccionParticularCliente"
																		className="form-control"
																		id="direccionParticularCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-6">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Direccion Comercial</label>
																	<input
																		name="direccionComercialCliente"
																		id="direccionComercialCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>

														<div className="col-md-4">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-mobile" />
																</span>
																<div className="feature-copy">
																	<label>Telefono Celular</label>
																	<input
																		name="nombreCliente"
																		className="form-control"
																		id="nombreCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div className="col-md-4">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Telefono Casa</label>
																	<input
																		name="apellidoCliente"
																		id="apellidoCliente"
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
																	<label> Telefono Oficina</label>
																	<input
																		name="rut"
																		id="rut"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="row form-group">
														<div className="col-md-8">
															<h4>Informacion Adicional</h4>
														</div>
														<div className="col-md-4">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-id-badge" />
																</span>
																<div className="feature-copy">
																	<label>Nombre Conyuge</label>
																	<input
																		name="nombreConyugeCliente"
																		className="form-control"
																		id="nombreConyugeCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>

														<div className="col-md-4">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>Telefono Conyuge</label>
																	<input
																		name="telefonoConyugeCliente"
																		id="telefonoConyugeCliente"
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
																	<label>E-mail Conyuge</label>
																	<input
																		name="emailConyugeCliente"
																		id="emailConyugeCliente"
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
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-briefcase" />
																</span>
																<div className="feature-copy">
																	<label>Nombre Secretaria</label>
																	<input
																		name="nombreSecretariaCliente"
																		className="form-control"
																		id="nombreSecretariaCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>

														<div className="col-md-6">
															<div className="feature-left">
																<div className="feature-copy">
																	<label>E-mail Secretaria</label>
																	<input
																		name="emailSecretariaCliente"
																		id="emailSecretariaCliente"
																		onChange={e => actions.handleForm(e)}
																		type="date"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="row form-group">
														<div className="col-md-8">
															<h4>Asociacion Poliza</h4>
														</div>
														<div className="col-md-6">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-archive" />
																</span>
																<div className="feature-copy">
																	<label>Poliza</label>
																	<input
																		name="emailPrimarioCliente"
																		className="form-control"
																		id="emailPrimarioCliente"
																		onChange={e => actions.handleForm(e)}
																		type="text"
																	/>
																</div>
															</div>
														</div>
														<div className="row form-group">
															<div className="col-md-6">
																<div className="feature-left">
																	<div className="feature-copy">
																		<label>Agente</label>
																		<input
																			name="direccionParticularCliente"
																			className="form-control"
																			id="direccionParticularCliente"
																			onChange={e => actions.handleForm(e)}
																			type="text"
																		/>
																	</div>
																</div>
															</div>

															<div className="col-md-6">
																<div className="feature-left">
																	<div className="feature-copy">
																		<label>Fecha</label>
																		<input
																			name="direccionComercialCliente"
																			id="direccionComercialCliente"
																			onChange={e => actions.handleForm(e)}
																			type="date"
																			className="form-control"
																		/>
																	</div>
																</div>
															</div>
															<div className="col-md-6">
																<div className="feature-left">
																	<div className="feature-copy">
																		<label>Fecha</label>
																		<input
																			name="direccionComercialCliente"
																			id="direccionComercialCliente"
																			onChange={e => actions.handleForm(e)}
																			type="date"
																			className="form-control"
																		/>
																	</div>
																</div>
															</div>
														</div>
														<div className="row form-group">
															<div className="col-md-6">
																<div className="feature-left">
																	<div className="feature-copy">
																		<label>Tipo de asegurado </label>
																		<select
																			className="form-control"
																			id="name_estado"
																			name="name_estado"
																			value={store.formulario.name_estado}
																			onChange={e => actions.handleForm(e)}>
																			<option>Dependiente</option>
																			<option>Conyuge</option>
																			<option>Propietario</option>
																			<option>Guardian</option>
																		</select>
																	</div>
																</div>
															</div>
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
MantenedorPersonas.propTypes = {
	history: PropTypes.object
};
