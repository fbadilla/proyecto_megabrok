import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
import { ListaReclamos } from "../component/listaReclamos";
import ModalViewDocumento from "../component/modalViewDocumento";
import ModalDocumento from "../component/modalDocumento";
import ModalDocumentoUpdate from "../component/modalDocumentoUpdate";
import ModalDelete from "../component/modalDelete";
import { ListaProveedores } from "../component/listaProveedores";
import ModalProveedor from "../component/modalProveedor";
import ModalDeleteProveedor from "../component/modalDeleteProveedor";
import ModalProveedorUpdate from "../component/modalProveedorUpdate";

export class DashProveedor extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.getProveedores();
		this.actionsContext.proveedorVacio();
		this.actionsContext.getaccount();
		this.actionsContext.vaciarFiltro();
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
								<ListaProveedores />
							</div>
							<ModalProveedor />
							<ModalProveedorUpdate />
							<ModalDeleteProveedor />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
