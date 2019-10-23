import React, { Component } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class FormReclamo extends Component {
    constructor(props) {
		super(props);
		this.state = {
			date_doc: "",
			nombre_proveedor: "",
			tipodoc: "",
			numdoc: "",
			montodoc: "",
			detalle_tratamiento: "",
			pago: ""
		};
		this.storeContext = null;
		this.actionsContext = null;
		this.props.history;
	}
    render() {
        return (
            <Context.Consumer>
                {({ store, actions }) => {
                    this.storeContext = store;
                    this.actionsContext = actions;
                    return (
                        <div className="col-md-10 ">
                            <h2>Ingresar Formulario</h2>
                            <form
                                action="#"
                                onSubmit={e => actions.handleevento(e, this.props.history)}>
                                <div className="row form-group">
                                    <h4>Datos Personales del Reclamante</h4>
                                    <div className="col-md-5">
                                        <div className="feature-left">
                                            <span className="icon">
                                                <i className="ti-user" />
                                            </span>
                                            <div className="feature-copy">
                                                <label>poliza</label> 
                                                <input
                                                    name="PolicyNumber"
                                                    id="PolicyNumber"
                                                    value={store.numpoliza}
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="feature-left">
                                            <div className="feature-copy">
                                            <label>ID asegurado</label> 
                                                <input
                                                    name="PolicyNumber"
                                                    id="PolicyNumber"
                                                    value={store.asegurado}
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="feature-left">
                                            <div className="feature-copy">
                                                <input
                                                    name="numpoliza"
                                                    id="numpoliza"
                                                    placeholder="ejemplo: 5555"
                                                    //onChange={e => actions.handleMiembro(e)}
                                                    type="text"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <h4>Detalles del Diagnostico / Accidente</h4>
                                    <div className="col-md-6">
                                        <div className="feature-left">
                                            <span className="icon">
                                                <i className="ti-clipboard" />
                                            </span>
                                            <div className="feature-copy">
                                                <input
                                                    name="detalle_diagnostico"
                                                    id="mail"
                                                    placeholder="Diagnóstico o Tipo de Accidente"
                                                    onChange={e => actions.handleAseguradoSelected(e)}
                                                    type="text"
                                                    className="form-control"
                                                />
                                                <label>
                                                    <i className="ti-link" />
                                                    En caso de accidente, incluir el Reporte
                                                    Policial
												</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="modificar"
                                            className="btn btn-primary"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    );
                }}
            </Context.Consumer>
        );
    }
}
FormReclamo.propTypes = {
    history: PropTypes.array
};
