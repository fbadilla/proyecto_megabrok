import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
import { ListaReclamos } from "../component/listaReclamos";

export class DashReclamo extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.getFormulario();
		this.actionsContext.getDocumentoAll();
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
									style={{ backgroundImage: "url(images/img_2.jpg)" }}>
									<div className="overlay" />
									<div className="gtco-container">
										<div className="row">
											<div className="col-md-12 col-md-offset-0 text-left">
												<div className="row row-mt-15em">
													<div className="col-md-7 mt-text ">
														<span className="intro-text-small">
															Aqui estan los reclamos ingresados
														</span>
														<h1>Reclamos </h1>
													</div>
												</div>
											</div>
										</div>
									</div>
								</header>
							</Animated>
							<div id="gtco-features" className="border-bottom">
								<div className="gtco-container">
									<ListaReclamos />
								</div>
							</div>
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
