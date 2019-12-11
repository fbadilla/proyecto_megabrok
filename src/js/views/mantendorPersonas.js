import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { Animated } from "react-animated-css";
import ModalPersona from "../component/modalPersona";
import PropTypes from "prop-types";
import ModalProveedor from "../component/modalProveedor";
import { ListaPersonas } from "../component/listaProveedores";

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
						this.storeContext = store;
						this.actionsContext = actions;
						return (
							<Fragment>
								<div className="gtco-container">
									<div className="row justify-content-center">
										<div className="col-md-10 ">
											<ListaPersonas />
										</div>
									</div>
								</div>
								<ModalPersona />

								<ModalProveedor />
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
