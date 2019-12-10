import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
import ModalPersona from "../component/modalPersona";
import PropTypes from "prop-types";

export class MantenedorPersonas extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.getPersonas();
		this.actionsContext.getaccount();
		this.actionsContext.vaciarFiltro();
	}
	render() {
		return (
			<Animated animationIn="fadeInLeft" animationOut="bounceOutLeft" animationInDuration={500} isVisible={true}>
				<Context.Consumer>
					{({ store, actions }) => {
						const foo = () => {
							if (store.personasFiltro.length > 0) {
								return store.personasFiltro.map((item, i) => {
									return (
										<tr key={i}>
											<td scope="row">{item.nombre + item.apellido}</td>
											<td>{item.rut}</td>
											<td>{item.emailPrimario}</td>
											<td>{item.direccionParticular}</td>
											<td>{item.celular + " / " + item.telefonoCasa}</td>
											<td>{item.telefonoOficina}</td>
											<td>
												<button
													type="button"
													className="btn btn-primary2"
													data-toggle="modal"
													data-target="#modalProveedorUpdate"
													onClick={() => actions.handleUpdateProveedor(item)}>
													<i className="ti-marker-alt" />
												</button>
											</td>
											<td>
												<button
													type="button"
													className="btn btn-primary3"
													data-toggle="modal"
													data-target="#ModalDeleteProveedor"
													//onClick={() => actions.handleDelete(item.id)}
												>
													<i className="ti-trash" />
												</button>
											</td>
										</tr>
									);
								});
							} else {
								return "";
							}
						};
						this.storeContext = store;
						this.actionsContext = actions;
						return (
							<Fragment>
								<div className="gtco-section border-bottom">
									<div className="gtco-container">
										<div className="row justify-content-center">
											<div className="col-md-10 ">
												<form action="#" onSubmit={e => actions.handleFiltroPersona(e)}>
													<div className="row form-group">
														<div className="col-md-4">
															<div className="input-group  input-group-lg">
																<div className="input-group-prepend">
																	<span
																		className="input-group-text"
																		id="basic-addon1">
																		<i className="ti-search" />
																	</span>
																</div>
<<<<<<< HEAD
															</div>
															<div className="col-md-5">
=======
>>>>>>> 1cf88e19f25f831a0ebe4023ab53fab51912641f
																<input
																	name="busqueda"
																	type="busqueda"
																	className="form-control"
																	placeholder="Buscar"
																	onChange={e => actions.handleChange(e)}
																/>
															</div>
														</div>
														<div className="col-md-2">
															<input
																type="submit"
																value="Buscar"
																className="btn btn-primary"
															/>
														</div>
														<div className="col-md-2 offset-4">
															<button
																type="button"
																className="btn btn-primary"
																data-toggle="modal"
																data-target="#ModalAddPersona">
																<i className="ti-plus" /> AGREGAR
															</button>
														</div>
													</div>
												</form>
												<div className="gtco-section ">
													<div className="table-responsive">
														<table className="table">
															<thead>
																<tr>
																	<th scope="col">Nombres</th>
																	<th scope="col">Rut</th>
																	<th scope="col">E-mail Primario</th>
																	<th scope="col">Direccion Particular</th>
																	<th scope="col">Telefonos </th>
																	<th scope="col">Oficina </th>
																	<th scope="col">Editar</th>
																	<th scope="col">Eliminar</th>
																</tr>
															</thead>
															<tbody>{foo()}</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>
									<ModalPersona />
								</div>
							</Fragment>
						);
					}}
				</Context.Consumer>
			</Animated>
		);
	}
}
MantenedorPersonas.propTypes = {
	history: PropTypes.object
};
