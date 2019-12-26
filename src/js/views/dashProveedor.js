import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { ListaProveedores } from "../component/proveedores/listaProveedores";
import ModalProveedor from "../component/proveedores/modalProveedor";
import ModalDeleteProveedor from "../component/proveedores/modalDeleteProveedor";
import ModalProveedorUpdate from "../component/proveedores/modalProveedorUpdate";

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
							<div className="gtco-container ">
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
