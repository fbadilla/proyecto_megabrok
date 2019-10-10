import React, { Fragment } from "react";
import { Context } from "../store/appContext";

export class Evento extends React.Component {
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
													<span className="intro-text-small">Acá nos reunimos!</span>
													<h1>Eventos </h1>
												</div>
											</div>
										</div>
									</div>
								</div>
							</header>
							<div id="gtco-features" className="border-bottom">
								<div className="gtco-container">
									<div className="row">
										<div className="col-md-8 col-md-offset-2 text-center gtco-heading ">
											<h2>Eventos</h2>
											<p>
												La comunicacion debe ser fluida, mantente siempre al dia con la
												informacion de tu grupo
											</p>
										</div>
									</div>
									<div className="row">
										<div className="col-md-4 col-sm-6">
											<div className="feature-center ">
												<span className="icon">
													<i className="ti-announcement" />
												</span>
												<h3>Celebracion pitch day</h3>
												<p>creador del evento</p>
												<h3>fbadilla</h3>
												<button type="button" className="btn btn-danger">
													Ver <i className="ti-eye" />
												</button>
											</div>
										</div>
										<div className="col-md-4 col-sm-6">
											<div className="feature-center ">
												<span className="icon">
													<i className="ti-rocket" />
												</span>
												<h3>Viaje a la playa fulltime</h3>
												<p>creador del evento</p>
												<h3>hugor</h3>
												<button type="button" className="btn btn-danger">
													Ver <i className="ti-eye" />
												</button>
											</div>
										</div>
										<div className="col-md-4 col-sm-6">
											<div className="feature-center ">
												<span className="icon">
													<i className="ti-announcement" />
												</span>
												<h3>workshop react Native</h3>
												<p>creador del evento</p>
												<h3>luis</h3>
												<button type="button" className="btn btn-danger">
													Ver <i className="ti-eye" />
												</button>
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
