import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
import { ListaPersonas } from "../component/listaPersonas";
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
										<div className="row">
											<div className="col-md-12">
												<div className="col-md-10 ">
													<h2>Buscar cliente</h2>
													<form action="#" onSubmit={e => actions.handleFiltroPersona(e)}>
														<div className="row form-group">
															<div className="col-md-5">
																<div className="feature-left">
																	<span className="icon">
																		<i className="ti-search" />
																	</span>
																	<div className="feature-copy">
																		<input
																			name="busqueda"
																			id="busqueda"
																			placeholder="buscar cliente"
																			type="text"
																			className="form-control"
																			onChange={e => actions.handleChange(e)}
																		/>
																	</div>
																</div>
															</div>
														</div>
														<div className="row">
															<div className="form-group">
																<input
																	type="submit"
																	value="buscar"
																	className="btn btn-primary"
																/>
															</div>
														</div>
													</form>

													<h3>Resultados </h3>
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
