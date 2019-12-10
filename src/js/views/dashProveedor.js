import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
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
							<div className="gtco-container">
								<div className="col-10 offset-1">
									<ListaProveedores />
								</div>
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