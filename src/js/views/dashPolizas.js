import React, { Fragment } from "react";
import { Context } from "../store/appContext";
import { ListaPolizas } from "../component/polizas/listaPolizas";

export class DashPolizas extends React.Component {
	constructor(props) {
		super(props);
		this.storeContext = null;
		this.actionsContext = null;
	}
	componentDidMount() {
		this.actionsContext.getPolizas();
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
									<ListaPolizas />
								</div>
							</div>
						</Fragment>
					);
				}}
			</Context.Consumer>
		);
	}
}
