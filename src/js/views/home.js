import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Animated } from "react-animated-css";

export class Home extends React.Component {
	constructor(props) {
		super(props);
		this.props.history;
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					return (
						<Fragment>
							<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
								<header
									id="gtco-header"
									className="gtco-cover"
									role="banner"
									style={{ backgroundImage: "url(images/img_6.jpg)" }}>
									<div className="overlay" />
									<div className="gtco-container">
										<div className="row">
											<div className="col-md-12 col-md-offset-0 text-left">
												<div className="row row-mt-15em2">
													<div className="col-md-7 mt-text">
														<br />
														<span className="intro-text-small">bienvenido</span>
														<h2>Gestiona tu informacion</h2>
													</div>

													<div className="col-md-4 col-md-push-1 ">
														<div className="form-wrap">
															<div className="tab">
																<ul className="tab-menu">
																	<li className="gtco-second">
																		<a href="#" data-tab="signup">
																			Registrate
																		</a>
																	</li>
																	<li className="active gtco-first">
																		<a href="#" data-tab="login">
																			iniciar sesion
																		</a>
																	</li>
																</ul>
																<div className="tab-content">
																	<div
																		className="tab-content-inner "
																		data-content="signup">
																		<form
																			action="#"
																			onSubmit={e => actions.handleRegister(e)}>
																			<div className="row form-group">
																				<div className="col-md-12">
																					<label htmlFor="username">
																						usuario
																					</label>
																					<input
																						type="text"
																						className="form-control"
																						name="username"
																						id="username"
																						value={store.username}
																						onChange={e =>
																							actions.handleChange(e)
																						}
																					/>
																				</div>
																			</div>
																			<div className="row form-group">
																				<div className="col-md-12">
																					<label htmlFor="email">Email</label>
																					<input
																						type="email"
																						className="form-control"
																						name="email"
																						id="email"
																						value={store.email}
																						onChange={e =>
																							actions.handleChange(e)
																						}
																					/>
																				</div>
																			</div>
																			<div className="row form-group">
																				<div className="col-md-12">
																					<label htmlFor="password">
																						Contraseña
																					</label>
																					<input
																						type="password"
																						className="form-control"
																						name="password"
																						id="password"
																						value={store.password}
																						onChange={e =>
																							actions.handleChange(e)
																						}
																					/>
																				</div>
																			</div>
																			<div className="row form-group">
																				<div className="col-md-12">
																					<label htmlFor="password2">
																						Confirmar Contraseña
																					</label>
																					<input
																						type="password"
																						className="form-control"
																						name="password2"
																						id="password2"
																						value={store.password2}
																						onChange={e =>
																							actions.handleChange(e)
																						}
																					/>
																				</div>
																			</div>

																			<div className="row form-group">
																				<div className="col-md-12">
																					<input
																						type="submit"
																						className="btn btn-primary"
																						value="Sign up"
																					/>
																				</div>
																			</div>
																		</form>
																	</div>

																	<div
																		className="tab-content-inner active"
																		data-content="login">
																		<form
																			action="#"
																			onSubmit={e =>
																				actions.handleLogin(
																					e,
																					this.props.history
																				)
																			}>
																			<div className="row form-group">
																				<div className="col-md-12">
																					<label htmlFor="username">
																						usuario
																					</label>
																					<input
																						type="text"
																						className="form-control"
																						name="username"
																						id="username"
																						value={store.username}
																						onChange={e =>
																							actions.handleChange(e)
																						}
																					/>
																				</div>
																			</div>
																			<div className="row form-group">
																				<div className="col-md-12">
																					<label htmlFor="password">
																						Contraseña
																					</label>
																					<input
																						type="password"
																						className="form-control"
																						name="password"
																						id="password"
																						value={store.password}
																						onChange={e =>
																							actions.handleChange(e)
																						}
																					/>
																				</div>
																			</div>

																			<div className="row form-group">
																				<div className="col-md-12">
																					<input
																						type="submit"
																						className="btn btn-primary"
																						value="Login"
																					/>
																				</div>
																			</div>
																		</form>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</header>
							</Animated>
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
Home.propTypes = {
	history: PropTypes.object
};
