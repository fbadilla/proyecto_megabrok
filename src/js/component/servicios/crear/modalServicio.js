import React from "react";
import { Context } from "../../../store/appContext";
import PropTypes from "prop-types";
import Select from "react-select";

export default class ModalServicio extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
	componentDidMount() {
		this.actionsContext.getProveedoresAutocompletar();
	}
	render() {
		return (
			<Context.Consumer>
				{({ store, actions }) => {
					this.storeContext = store;
					this.actionsContext = actions;

					return (
						<div
							className="modal fade"
							id="modalservicio"
							tabIndex="-1"
							role="dialog"
							aria-labelledby="myLargeModalLabel"
							aria-hidden="true">
							<div className="modal-dialog" role="document">
								<div className="modal-content">
									<div className="modal-header">
										<h5 className="modal-title" id="exampleModalLabel">
											<label htmlFor="inputNombre">Ingresar servicio </label>
										</h5>
										<button type="button" className="close" data-dismiss="modal" aria-label="Close">
											<i className="ti-close" />
										</button>
									</div>
									<div className="modal-body">
										<form action="#">
											<div className="form-row">
												<div className="col-md-12">
													<div className="feature-left">
														<label>Proveedor</label>
														<Select
															value={store.proveedores[store.servicio.proveedor_id - 1]}
															className="basic-single"
															classNamePrefix="select"
															onChange={value => actions.handleServicioSelect(value)}
															options={store.proveedores}
														/>
													</div>
												</div>
											</div>

											<div className="modal-footer">
												<button
													type="submit"
													className="btn btn-primary"
													data-dismiss="modal"
													data-toggle="modal"
													data-target="#modalDetalleServicio">
													Siguiente
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					);
				}}
			</Context.Consumer>
		);
	}
}
ModalServicio.propTypes = {
	history: PropTypes.array
};
