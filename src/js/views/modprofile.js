import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export class modificarUsuario extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	componentDidMount() {
		this.actionsContext.getMiembro();
		this.actionsContext.getGrupos();
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
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-12 col-md-offset-0 text-left">
											<div className="row row-mt-15em">
												<div className="col-md-7 mt-text">
													<h1>{store.miembro.userAccount}</h1>
													<span className="intro-text-small">
														manten actualizado tus datos, recuerda que la comunicacion debe
														ser fluida
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
											<div className="col-md-6 ">
												<h3>Mis Datos</h3>
												<form
													action="#"
													onSubmit={e => actions.handleUser(e, this.props.history)}>
													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-user" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="name">
																		nombre
																	</label>
																	<input
																		name="userAccount"
																		id="userAccount"
																		placeholder={store.miembro.userAccount}
																		onChange={e => actions.handleMiembro(e)}
																		type="text"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-email" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="email">
																		Email
																	</label>
																	<input
																		name="mail"
																		id="mail"
																		placeholder={store.miembro.mail}
																		onChange={e => actions.handleMiembro(e)}
																		type="email"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-calendar" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="subject">
																		Fecha de Nacimiento
																	</label>
																	<input
																		name="fecha_nacimiento"
																		id="fecha_nacimiento"
																		placeholder={store.miembro.fecha_nacimiento}
																		onChange={e => actions.handleMiembro(e)}
																		type="date"
																		className="form-control"
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-tablet" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="subject">
																		Telefono
																	</label>
																	<input
																		name="phone"
																		id="phone"
																		onChange={e => actions.handleMiembro(e)}
																		type="text"
																		className="form-control"
																		placeholder={store.miembro.phone}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="row form-group">
														<div className="col-md-12">
															<div className="feature-left">
																<span className="icon">
																	<i className="ti-bolt" />
																</span>
																<div className="feature-copy">
																	<label className="sr-only" htmlFor="subject">
																		grupo
																	</label>
																	<select
																		name="gruponame"
																		id="gruponame"
																		onChange={e => actions.handleMiembro(e)}
																		type="text"
																		className="form-control">
																		<option value="1">Seleccione</option>
																		{store.grupos.length > 0 &&
																			store.grupos.map((item, i) => {
																				const selected =
																					store.miembro.gruponame == item.id
																						? "selected"
																						: "";
																				return (
																					<option
																						value={item.id}
																						key={i}
																						selected={selected}>
																						{item.grupoName}
																					</option>
																				);
																			})}
																	</select>
																</div>
															</div>
														</div>
													</div>
													<div className="form-group">
														<input
															type="submit"
															value="modificar"
															className="btn btn-primary"
														/>
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
modificarUsuario.propTypes = {
	history: PropTypes.object
};
