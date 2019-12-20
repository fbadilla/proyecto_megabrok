import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
import { Link } from "react-router-dom";
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
										<div className="gtco-section ">
											<div className="row">
												<div className="col-md-8">
													<p>
														Aca se mostraran todos los reclamos, si deseas crear uno nuevo
														presiona el boton Crear reclamo
													</p>
												</div>
											</div>
											<div className="row">
												<div className="col-md-8">
													<div className="input-group  input-group-lg">
														<div className="input-group-prepend">
															<span className="input-group-text" id="basic-addon1">
																<i className="ti-search" />
															</span>
														</div>

														<input
															name="filtro_reclamo"
															type="text"
															className="form-control"
															placeholder="Filtro"
															onChange={e => actions.handleFiltroReclamo(e)}
														/>
													</div>
												</div>
												<div className="col-md-3 offset-1">
													<Link to="/ingresareclamo" className="btn btn-primary">
														Crear Reclamo
													</Link>
												</div>
											</div>
										</div>
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
