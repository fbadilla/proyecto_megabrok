import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import ModalPersona from "../component/modalPersona";
import PropTypes from "prop-types";
import { ListaPersonas } from "../component/listaPersonas";

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
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
MantenedorPersonas.propTypes = {
	history: PropTypes.object
};
