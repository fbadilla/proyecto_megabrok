import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

export class Usuarios extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
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
							<div className="gtco-section border-bottom">
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-8 text-left gtco-heading">
											<h2>Mis Datos</h2>
											<div className="form-group">
												<Link to="/modprofile">
													<input
														type="submit"
														value="Modificar cuenta"
														className="btn btn-primary"
													/>
												</Link>
											</div>
										</div>
									</div>
									<div className="row">
										<Animated
											animationIn="bounceInLeft"
											animationOut="fadeOut"
											isVisible={true}
											data-animate-effect="fadeInLeft">
											<div className="col-md-6">
												<img
													src="images/user2.png"
													className="img-responsive"
													alt="Free HTML5 Bootstrap Template"
												/>
											</div>
											<div className="col-md-6 mt-sm">
												<div className="feature-left">
													<span className="icon">
														<i className="ti-user" />
													</span>
													<div className="feature-copy">
														<h3>Nombre</h3>
														<p>{store.account.name_Account} </p>
													</div>
												</div>
												<div className="feature-left">
													<span className="icon">
														<i className="ti-email" />
													</span>
													<div className="feature-copy">
														<h3>Correo</h3>
														<p>{store.account.mail}</p>
													</div>
												</div>

												<div className="feature-left ">
													<span className="icon">
														<i className="ti-calendar" />
													</span>
													<div className="feature-copy">
														<h3>Fecha de nacimiento</h3>
														<p>{store.account.fecha_nacimiento}</p>
													</div>
												</div>

												<div className="feature-left">
													<span className="icon">
														<i className="ti-tablet" />
													</span>
													<div className="feature-copy">
														<h3>Telefono</h3>
														+569
														<p>{store.account.phone}</p>
													</div>
												</div>

												<div className="feature-left">
													<span className="icon">
														<i className="ti-bolt" />
													</span>
													<div className="feature-copy">
														<h3>ID Grupo</h3>
														<p>{store.account.gruponame}</p>
													</div>
												</div>
											</div>
										</Animated>
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
