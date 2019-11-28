import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
import { ListaReclamos } from "../component/listaReclamos";
import ModalViewDocumento from "../component/modalViewDocumento";
import ModalDocumento from "../component/modalDocumento";
import ModalDocumentoUpdate from "../component/modalDocumentoUpdate";
import ModalDelete from "../component/modalDelete";

export class DashReclamo extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.getaccount();
		this.actionsContext.getFormulario();
		this.actionsContext.getDocumentoAll();
		this.actionsContext.vaciarFiltro();
		this.actionsContext.getPersonas();
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
									<div className="gtco-container" />
								</header>
							</Animated>
							<div className="gtco-container">
								<ListaReclamos />
							</div>

							<ModalViewDocumento />
							<ModalDocumentoUpdate />
							<ModalDocumento />
							<ModalDelete />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
