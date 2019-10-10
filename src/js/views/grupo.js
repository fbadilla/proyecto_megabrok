import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

export class Grupo extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		//this.actionsContext.getMiembro();
		//this.actionsContext.getGrupos();
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;
					const grupo = store.grupos.filter((item, i) => {
						return store.miembro.gruponame == item.id;
					});
					console.log(grupo);
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
										<Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
											<div className="col-md-12 col-md-offset-0 text-left">
												<div className="row row-mt-15em">
													<div className="col-md-7 mt-text">
														<span className="intro-text-small">Bienvenido</span>
														<h1>{store.miembro.userAccount}</h1>
													</div>
												</div>
											</div>
										</Animated>
									</div>
								</div>
							</header>
							<div id="gtco-counter" className="gtco-section">
								<div className="gtco-container">
									<div className="row">
										<Animated
											animationIn="bounceInLeft"
											animationOut="fadeOut"
											isVisible={true}
											data-animate-effect="fadeInLeft">
											<div className="col-md-8 col-md-offset-2 text-center gtco-heading ">
												<h2>Perteneces a la comunidad :</h2>

												<h1> {!!grupo[0] && grupo[0].grupoName}</h1>
												<p>Aqui encontras toda la informacion de tu comunidad.</p>
											</div>
										</Animated>
									</div>
									<div className="row">
										<Animated
											animationIn="bounceInLeft"
											animationOut="fadeOut"
											isVisible={true}
											data-animate-effect="fadeInLeft">
											<div className="col-md-4 col-sm-6">
												<div className="feature-center">
													<span className="icon">
														<i className="ti-pulse" />
													</span>
													<span
														className="counter js-counter"
														data-from="0"
														data-to="4"
														data-speed="500"
														data-refresh-interval="10">
														4
													</span>
													<span className="counter-label">miembros activos</span>
												</div>
											</div>

											<div className="col-md-4 col-sm-6">
												<div className="feature-center">
													<span className="icon">
														<i className="ti-comments-smiley" />
													</span>
													<span
														className="counter js-counter"
														data-from="0"
														data-to="4"
														data-speed="5000"
														data-refresh-interval="50">
														4
													</span>
													<span className="counter-label">anuncios emitidos</span>
												</div>
											</div>
											<div className="col-md-4 col-sm-6 ">
												<div className="feature-center">
													<span className="icon">
														<i className="ti-announcement" />
													</span>
													<span
														className="counter js-counter"
														data-from="0"
														data-to="3"
														data-speed="5000"
														data-refresh-interval="10">
														3
													</span>
													<span className="counter-label">Eventos realizados</span>
												</div>
											</div>
										</Animated>
									</div>
									<div className="col-md-12">
										<div className="feature-center">
											<span className="icon">
												<i className="ti-check" />
											</span>
											<div className="feature-copy">
												<h1>Terminos de la comunidad:</h1>
												<h3>
													<i className="ti-pencil" />
													me comprometo a programar por el resto de mi vida...{" "}
												</h3>
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
