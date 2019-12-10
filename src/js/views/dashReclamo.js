import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
import { ListaReclamos } from "../component/listaReclamos";
import ModalDelete from "../component/modalDelete";
import ModalDeleteDocumento from "../component/modalDeleteDocumento";
import ModalServicioUpdate from "../component/modalServicioUpdate";
import ModalViewServicio from "../component/modalViewServicio";

export class DashReclamo extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.getProveedoresAutocompletar();
		this.actionsContext.getaccount();
		this.actionsContext.getFormulario();
		// this.actionsContext.getDocumentoAll();
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
							<div className="gtco-container">
								<div className="row justify-content-center">
									<div className="col-md-10 ">
										<ListaReclamos />
									</div>
								</div>
							</div>
							<ModalServicioUpdate />
							<ModalDelete />
							<ModalDeleteDocumento />
							<ModalViewServicio />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
