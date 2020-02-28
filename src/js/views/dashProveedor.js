import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { ListaProveedores } from "../component/proveedores/listaProveedores";
import ModalProveedor from "../component/proveedores/modalProveedor";
import ModalDeleteProveedor from "../component/proveedores/modalDeleteProveedor";
import ModalProveedorUpdate from "../component/proveedores/modalProveedorUpdate";
import ModalGrupo from "../component/proveedores/modalgrupo";

export class DashProveedor extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.getProveedores();
		this.actionsContext.getGruposAutocompletar();
		this.actionsContext.proveedorVacio();
		this.actionsContext.grupoVacio();
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
									<div className="gtco-section ">
										<div className="row">
											<div className="col-md-8">
												<p>Aca puedes ver y editar todos los proveedores</p>
											</div>
										</div>
										<div className="row">
											<div className="col-md-6">
												<div className="input-group  input-group-lg">
													<div className="input-group-prepend">
														<span className="input-group-text" id="basic-addon1">
															<i className="ti-search" />
														</span>
													</div>
													<input
														name="filtroValue"
														type="text"
														className="form-control"
														placeholder="Buscar proveedor"
														onChange={e => actions.handleFiltroProveedor(e)}
													/>
												</div>
											</div>
											<div className="col-md-3 offset-3">
												<div className="float-right">
													<button
														type="button"
														className="btn btn-primary"
														data-toggle="modal"
														data-target="#ModalAddProveedor">
														Agregar proveedor
													</button>
												</div>
											</div>
										</div>
									</div>
									<ListaProveedores />
								</div>
							</div>
							<ModalProveedor />
							<ModalGrupo />
							<ModalProveedorUpdate />
							<ModalDeleteProveedor />
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
