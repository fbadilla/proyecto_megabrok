const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "http://0.0.0.0:8006",
			apiUrl2: "https://apy-cors-fcobad.herokuapp.com/https://mobile.bestdoctorsinsurance.com/spiritapi/api",
			token: {
				refresh: "",
				access: ""
			},
			documentos: [],
			accounts: [],
			account: {},
			username: "",
			password: "",
			password2: "",
			email: "",
			asegurados: [],
			aseguradoselected: {},
			numpoliza: "",
			error: {},
			idReclamo: "",
			formulario: {
				name_estado: "Pendiente"
			},
			formularios: [],
			formulariosId: [],
			deleteselect: {},
			documento: {
				tipodoc: "Boleta",
				numdoc: "",
				montodoc: "",
				datedoc: new Date().toISOString().slice(0, 10)
			},
			servicio: {
				archivoServicio: null,
				proveedor_id: 1,
				detalleServicio: []
			},
			detalleServicio: {
				detalle: "",
				pago: "COB",
				documentos: []
			},
			servicios: [],
			documentoid: [],
			documentoid2: [],
			docfile: null,
			reclamo: {},
			mensaje: {},
			filtro: false,
			estaLoggeado: false,
			aseguradosFiltro: {},
			proveedores: {},
			serviceSelected: {
				pago: "",
				detalle: ""
			},
			numservice: null,
			proveedor: {
				nombre_proveedor: "",
				grupo: "",
				rut_proveedor: ""
			},
			persona: {},
			personas: [],
			personasFiltro: {},
			servicios2: [],
			servicioid: {},
			archivo: {},
			serviceSelectedUpdate: {}
		},

		actions: {
			// -----------------------------------------HANDLES-------------------------------
			//funcion que actualiza los valores en el store
			handleChange: e => {
				const { name, value } = e.target;
				setStore({
					[name]: value
				});
			},

			//funcion que actualiza los valores del store.formulario
			handleForm: e => {
				const { name, value } = e.target;
				const store = getStore();
				let formulario = store.formulario;
				formulario[name] = value;

				setStore({
					formulario
				});
			},
			handleFormPersona: e => {
				const { name, value } = e.target;
				const store = getStore();
				let persona = store.persona;
				persona[name] = value;

				setStore({
					persona
				});
			},

			//funcion que actualiza los valores del store.account
			handleaccount: e => {
				const { name, value } = e.target;
				const store = getStore();
				let account = store.account;
				account[name] = value;
				setStore({
					account
				});
			},

			//funcion que actualiza los valores del store.documento
			handledocumento: e => {
				const { name, value } = e.target;
				const store = getStore();
				let documento = store.documento;
				documento[name] = value;

				setStore({
					documento
				});
			},
			handleDetalle: e => {
				const { name, value } = e.target;
				const store = getStore();
				let detalleServicio = store.detalleServicio;
				detalleServicio[name] = value;
				setStore({
					detalleServicio
				});
			},

			handleServicio: e => {
				const { name, value } = e.target;
				const store = getStore();
				let servicio = store.servicio;
				servicio[name] = value;

				setStore({
					servicio
				});
			},
			handleselect: value => {
				const store = getStore();
				let servicio = store.servicio;
				servicio["proveedor_id"] = value.value;
				setStore({
					servicio
				});
			},
			handleServicioSelect: value => {
				const store = getStore();
				let servicio = store.servicio;
				let serviceSelectedUpdate = store.serviceSelectedUpdate;
				servicio["proveedor_id"] = value.value;
				serviceSelectedUpdate["proveedor_id"] = value.value;
				setStore({
					servicio,
					serviceSelectedUpdate
				});
			},
			handleServicioMod: e => {
				const { name, value } = e.target;
				const store = getStore();
				let serviceSelected = store.serviceSelected;
				serviceSelected[name] = value;
				setStore({
					serviceSelected
				});
			},
			handleServicioSelectMod: value => {
				const store = getStore();
				let serviceSelected = store.serviceSelected;
				serviceSelected["proveedor_id"] = value.value;
				setStore({
					serviceSelected
				});
			},
			//funcion que maneja el Post de un nuevo formulario
			handleFormulario: (e, history) => {
				e.preventDefault();
				getActions().SaveFormulario(history);
			},
			//funcion que maneja el Post de un nuevo formulario, ademas realiza un GET de documentos por ID, antes y despues del POST
			handleAceptarDocumento: history => {
				const store = getStore();
				let documentos = store.detalleServicio.documentos;
				let detalleServicio = store.detalleServicio;

				let doc = store.documento;
				if (doc.montodoc != "" && doc.numdoc != "") {
					documentos.push(store.documento);
				} else {
					alert("ingresa todos los campos del documento");
				}
				detalleServicio["documentos"] = documentos;
				setStore({
					detalleServicio,
					documento: {
						tipodoc: "Boleta",
						numdoc: "",
						montodoc: "",
						datedoc: new Date().toISOString().slice(0, 10)
					}
				});
			},
			handleAddDetalle: e => {
				const store = getStore();
				let detalleServicio = store.detalleServicio;
				let servicio = store.servicio;
				servicio["detalleServicio"].push(detalleServicio);
				setStore({
					servicio,
					detalleServicio: {
						detalle: "",
						pago: "COB",
						documentos: []
					}
				});
			},
			handleEnvioServicio: history => {
				const store = getStore();
				// Servicio necesita reclamo_id, archivoServicio, proveedor_id
				let formServicio = new FormData();
				formServicio.append("proveedor_id", store.servicio.proveedor_id);
				formServicio.append("reclamo_id", store.formulario.reclamo_id);
				if (store.servicio.archivoServicio != null)
					formServicio.append(
						"archivoServicio",
						store.servicio.archivoServicio,
						store.servicio.archivoServicio.name
					);
				// Se realiza POST al servicio
				fetch(store.apiUrl + "/api/servicios/", {
					method: "Post",
					body: formServicio,
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(infoServicio => {
						store.servicio.detalleServicio
							.slice(0)
							.reverse()
							.map((detalle, i) => {
								let formDetalle = new FormData();

								formDetalle.append("detalle", detalle.detalle);
								formDetalle.append("pago", detalle.pago);
								formDetalle.append("servicio_id", infoServicio.id);
								// se realiza POST por cada detalle
								fetch(store.apiUrl + "/api/detalleServicio/", {
									method: "Post",
									body: formDetalle,
									headers: {
										Authorization: "Bearer " + store.access
									}
								})
									.then(resp => resp.json())
									.then(infoDetalle => {
										detalle.documentos.slice(0).map((documento, i) => {
											let formDocumento = new FormData();
											formDocumento.append("detalle_servicio_id", infoDetalle.id);
											formDocumento.append("datedoc", documento.datedoc);
											formDocumento.append("montodoc", documento.montodoc);
											formDocumento.append("numdoc", documento.numdoc);
											formDocumento.append("tipodoc", documento.tipodoc);

											// Se realiza POST por cada boleta
											fetch(store.apiUrl + "/api/documentos/", {
												method: "Post",
												body: formDocumento,
												headers: {
													Authorization: "Bearer " + store.access
												}
											});
										});
									});
							});
					})
					.catch(error => {
						setStore({ error });
						alert("No se pudo ingresar el documento, revise los campos");
					})
					.then(() => getActions().getServicios());
			},
			handleEnvioDetalle: history => {
				const store = getStore();
				// Servicio necesita reclamo_id, archivoServicio, proveedor_id
				let formDetalle = new FormData();

				formDetalle.append("detalle", store.detalleServicio.detalle);
				formDetalle.append("pago", store.detalleServicio.pago);
				formDetalle.append("servicio_id", store.serviceSelectedUpdate.id);
				// se realiza POST por cada detalle
				fetch(store.apiUrl + "/api/detalleServicio/", {
					method: "Post",
					body: formDetalle,
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(infoDetalle => {
						store.detalleServicio.documentos.slice(0).map((documento, i) => {
							let formDocumento = new FormData();
							formDocumento.append("detalle_servicio_id", infoDetalle.id);
							formDocumento.append("datedoc", documento.datedoc);
							formDocumento.append("montodoc", documento.montodoc);
							formDocumento.append("numdoc", documento.numdoc);
							formDocumento.append("tipodoc", documento.tipodoc);

							// Se realiza POST por cada boleta
							fetch(store.apiUrl + "/api/documentos/", {
								method: "Post",
								body: formDocumento,
								headers: {
									Authorization: "Bearer " + store.access
								}
							});
						});
						getActions().getServicios();
					})
					.catch(error => {
						setStore({ error });
						alert("No se pudo ingresar el documento, revise los campos");
					})
					.then(() => getActions().getServicios());
			},
			cleanService: () => {
				setStore({
					documento: {
						tipodoc: "Boleta",
						numdoc: "",
						montodoc: "",
						datedoc: new Date().toISOString().slice(0, 10)
					},
					servicio: {
						archivoServicio: null,
						proveedor_id: 1,
						detalleServicio: []
					},
					documentos: [],
					detalleServicio: {
						detalle: "",
						documentos: [],
						pago: "COB"
					}
				});
			},
			handleEnvioServicio2: history => {
				const store = getStore();
				let formServicio = new FormData();
				formServicio.append("proveedor_id", store.servicio.proveedor_id);
				formServicio.append("detalle", store.servicio.detalle);
				formServicio.append("pago", store.servicio.pago);
				formServicio.append("reclamo_id", store.formulario.reclamo_id);
				if (store.servicio.archivoServicio != null)
					formServicio.append(
						"archivoServicio",
						store.servicio.archivoServicio,
						store.servicio.archivoServicio.name
					);
				fetch(store.apiUrl + "/api/servicios/", {
					method: "Post",
					body: formServicio,
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						store.documentos
							.slice(0)
							.reverse()
							.map((item, i) => {
								let formDocumento = new FormData();
								formDocumento.append("servicio_id", data.id);
								formDocumento.append("tipodoc", item.tipodoc);
								formDocumento.append("numdoc", item.numdoc);
								formDocumento.append("datedoc", item.datedoc);
								formDocumento.append("montodoc", item.montodoc);
								fetch(store.apiUrl + "/api/documentos/", {
									method: "Post",
									body: formDocumento,
									headers: {
										Authorization: "Bearer " + store.access
									}
								});
							});
						getActions().getServicios();
					})
					.then(
						setStore({
							documento: {
								tipodoc: "Boleta",
								numdoc: "",
								montodoc: "",
								datedoc: new Date().toISOString().slice(0, 10)
							},
							servicio: {
								pago: "COB",
								detalle: "",
								archivoServicio: null,
								proveedor_id: 1
							},
							documentos: []
						})
					)

					.catch(error => {
						setStore({ error });
						alert("No se pudo ingresar el documento, revise los campos");
					});
			},
			handlePutServicio: () => {
				const store = getStore();
				let formDetalleServicio = new FormData();
				formDetalleServicio.append("proveedor_id", store.serviceSelected.proveedor_id);
				formDetalleServicio.append("detalle", store.serviceSelected.detalle);
				formDetalleServicio.append("pago", store.serviceSelected.pago);
				formDetalleServicio.append("servicio_id", store.serviceSelected.servicio_id);
				fetch(store.apiUrl + "/api/detalleServicio/" + store.serviceSelected.id, {
					method: "Put",
					body: formDetalleServicio,
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(
						setStore({
							documento: {
								tipodoc: "Boleta",
								numdoc: "",
								montodoc: "",
								datedoc: new Date().toISOString().slice(0, 10)
							},
							servicio: {
								pago: "COB",
								detalle: ""
							},
							documentos: []
						})
					)

					.then(() => getActions().getServicios())

					.catch(error => {
						setStore({ error });
						alert("No se pudo modificar el detalle del servicio, revise los campos");
					});
			},
			handlePutServicioArchivo: () => {
				const store = getStore();
				let formServicio = new FormData();
				formServicio.append("proveedor_id", store.serviceSelectedUpdate.proveedor_id);
				formServicio.append("reclamo_id", store.formulario.reclamo_id);
				if (store.serviceSelectedUpdate.archivoServicio != null)
					formServicio.append(
						"archivoServicio",
						store.serviceSelectedUpdate.archivoServicio,
						store.serviceSelectedUpdate.archivoServicio.name
					);
				fetch(store.apiUrl + "/api/servicios/" + store.serviceSelectedUpdate.id, {
					method: "Put",
					body: formServicio,
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(() => {
						setStore({
							documento: {
								tipodoc: "Boleta",
								numdoc: "",
								montodoc: "",
								datedoc: new Date().toISOString().slice(0, 10)
							},
							servicio: {
								archivoServicio: null,
								proveedor_id: 1
							},
							documentos: []
						});
						alert("El archivo se cargo con exito");
					})

					.then(() => getActions().getServicios())

					.catch(error => {
						setStore({ error });
						alert("No se pudo modificar el servicio, revise los campos");
					});
			},
			handlePutProveedorServicio: () => {
				const store = getStore();
				let formProveedorServicio = new FormData();
				formProveedorServicio.append("proveedor_id", store.serviceSelectedUpdate.proveedor_id);
				formProveedorServicio.append("reclamo_id", store.formulario.reclamo_id);
				fetch(store.apiUrl + "/api/servicios/" + store.serviceSelectedUpdate.id, {
					method: "Put",
					body: formProveedorServicio,
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(
						setStore({
							documento: {
								tipodoc: "Boleta",
								numdoc: "",
								montodoc: "",
								datedoc: new Date().toISOString().slice(0, 10)
							},
							servicio: {
								pago: "COB",
								detalle: ""
							},
							documentos: []
						})
					)

					.then(() => getActions().getServicios())

					.catch(error => {
						setStore({ error });
						alert("No se pudo modificar el proveedor");
					});
			},

			handleDeleteDocumento: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/" + store.deleteselect, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(() => getActions().getServicios())
					.catch(error => setStore({ error }));
			},
			handleDeleteServicio: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/servicios/" + store.deleteselect, {
					method: "DELETE",
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(() => getActions().getServicios())
					.then(
						setStore({
							deleteselect: ""
						})
					)

					.catch(error => {
						setStore({ error });
						alert("No se pudo eliminar el servicio");
					});
			},
			handleDeleteDetalleServicio: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/detalleServicio/" + store.deleteselect.id, {
					method: "DELETE",
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(() => getActions().getServicios())
					.then(
						setStore({
							numservice: null
						})
					)
					.catch(error => {
						setStore({ error });
						alert("No se Eliminar el detalle de servicio");
					});
			},

			handleEnvioDocumento: history => {
				getActions().SaveDocumentoSinFile(history);
			},

			//funcion que maneja el Post para obtener un nuevo TOKEN
			handleLogin: (e, history) => {
				e.preventDefault();
				const store = getStore();
				getActions().login(store.username, store.password, history);
				getActions().handleLocalStorage();
			},
			//funcion que maneja el Post para crear un nuevo usuario
			handleRegister: e => {
				e.preventDefault();
				const store = getStore();
				getActions().register(store.username, store.email, store.password);
			},

			handleLocalStorage: e => {
				const store = getStore();
				let access = store.access;
				access = localStorage.getItem("token");

				setStore({
					access
				});
			},
			//funcion que maneja el Post para crear un nuevo usuario
			handleUser: (e, history) => {
				e.preventDefault();
				getActions().putAccount(history);
			},
			//funcion que maneja el GET que busca una poliza en la api claim
			handleSearch: (e, history) => {
				e.preventDefault();
				const store = getStore();
				getActions().getPoliza(history);
			},

			//funcion que maneja el GET que busca una poliza en la api claim
			cargarAsegurados: () => {
				const store = getStore();

				fetch(store.apiUrl + "/api/asociacion", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ asegurados: data, aseguradosFiltro: {} }))
					.catch(error => setStore({ error }));
			},

			handleSearchPersona: (e, history) => {
				e.preventDefault();

				const store = getStore();
				const filtro = store.busqueda;
				let aseguradosFiltro = store.asegurados.filter(
					item =>
						(item.id_persona__nombre.trim() + " " + item.id_persona__apellido.trim())
							.toLowerCase()
							.includes(filtro) ||
						item.id_persona__rut.toLowerCase().includes(filtro) ||
						item.id_poliza__nun_poliza.toLowerCase().includes(filtro)
				);
				setStore({ aseguradosFiltro });
			},

			//funcion que crea un nuevo store.aseguradoselected con la la poliza seleccionada
			handleAseguradoSelected: item => {
				const store = getStore();
				setStore({
					formulario: {
						nameReclamo: item.id_persona__nombre.trim() + " " + item.id_persona__apellido.trim(),
						numpoliza: item.id_poliza__nun_poliza,
						rut: item.id_persona__rut,
						name_estado: "Pendiente",
						asociacion_id: item.id
					}
				});
			},

			//funcion que actualiza los valores del store.reclamo
			handleReclamo: e => {
				const { name, value } = e.target;
				const store = getStore();
				let reclamo = store.reclamo;
				reclamo[name] = value;
				setStore({
					reclamo
				});
			},

			handleProveedor: e => {
				const { name, value } = e.target;
				const store = getStore();
				let proveedor = store.proveedor;
				proveedor[name] = value;
				setStore({
					proveedor
				});
			},

			//funcion que maneja el Post para crear un nuevo reclamo en api/claim
			handleGenerate: (e, history) => {
				e.preventDefault();
				getActions().PostReclamo(history);
			},

			//funcion que maneja los file y actualiza el store
			handleFileChange: e => {
				const store = getStore();
				const archivoServicio = e.target.files[0];
				let servicio = store.servicio;
				let serviceSelectedUpdate = store.serviceSelectedUpdate;
				servicio["archivoServicio"] = archivoServicio;
				serviceSelectedUpdate["archivoServicio"] = archivoServicio;
				setStore({
					servicio,
					serviceSelectedUpdate
				});
			},
			handleFileChangemod: e => {
				const store = getStore();
				const archivoServicio = e.target.files[0];
				let archivo = store.archivo;
				archivo["archivoServicio"] = archivoServicio;
				setStore({
					archivo
				});
			},
			handleModReclamo: (item, history) => {
				const store = getStore();
				let formulario = store.formulario;
				formulario = item;
				setStore({ formulario });
				getActions().getServicios();
			},
			handleDelete: id => {
				const store = getStore();
				let deleteselect = store.deleteselect;
				deleteselect = id;
				setStore({ deleteselect });
			},
			handleSelectedArchivo: servicio => {
				const store = getStore();
				let numservice = servicio;

				setStore({ numservice });
				getActions().getDocumentoId();
			},
			handleSelectedServicio: (id, servicio, servicio_id) => {
				const store = getStore();
				let serviceSelected = servicio;
				serviceSelected["servicio_id"] = servicio_id;
				let numservice = id;
				setStore({ serviceSelected, numservice });
				getActions().getDocumentoId();
			},
			handleSelectedServicioUpdate: servicio => {
				const store = getStore();
				let serviceSelectedUpdate = servicio;
				setStore({ serviceSelectedUpdate });
				getActions().cleanService();
			},
			handleUpdateProveedor: item => {
				let store = getStore();
				let proveedor = Object.assign({}, item);
				setStore({ proveedor });
			},
			handleFiltroReclamo: e => {
				const { name, value } = e.target;
				const store = getStore();
				let filtroReclamo = value.toLowerCase();
				if (filtroReclamo == "") {
					let filtro = false;
					setStore({ filtro });
				} else {
					let coleccion = store.formularios.filter(
						item =>
							(item.nombreReclamante + " " + item.apellidoReclamante)
								.toLowerCase()
								.includes(filtroReclamo) ||
							item.detalle_diagnostico.toLowerCase().includes(filtroReclamo) ||
							item.username.toLowerCase().includes(filtroReclamo) ||
							item.estado.toLowerCase().includes(filtroReclamo) ||
							item.numPoliza.toLowerCase().includes(filtroReclamo)
					);
					let filtro = true;
					setStore({ filtroReclamo, coleccion, filtro });
				}
			},
			handleFiltroProveedor: e => {
				const { name, value } = e.target;
				const store = getStore();
				let filtroValue = value.toLowerCase();
				if (filtroValue == "") {
					let filtro = false;
					setStore({ filtro });
				} else {
					let coleccion = store.proveedores.filter(
						item =>
							item.nombre_proveedor.toLowerCase().includes(filtroValue) ||
							item.grupo.toLowerCase().includes(filtroValue) ||
							item.rut_proveedor.toLowerCase().includes(filtroValue)
					);
					let filtro = true;
					setStore({ filtroValue, coleccion, filtro });
				}
			},
			handleFiltroPersona: e => {
				e.preventDefault();

				const store = getStore();
				const filtro = store.busqueda;
				let personasFiltro = store.personas.filter(
					item =>
						(item.nombre + " " + item.apellido).toLowerCase().includes(filtro) ||
						item.nombre.toLowerCase().includes(filtro) ||
						item.apellido.toLowerCase().includes(filtro) ||
						//item.nombrePila.toLowerCase().includes(filtro) ||
						item.emailPrimario.toLowerCase().includes(filtro)
					//item.emailSecundario.toLowerCase().includes(filtro) ||
					//item.direccionParticular.toLowerCase().includes(filtro) ||
					//item.direccionComercial.toLowerCase().includes(filtro) ||
					//item.nombreConyuge.toLowerCase().includes(filtro) ||
					//item.emailConyuge.toLowerCase().includes(filtro) ||
					//item.telefonoConyuge.toLowerCase().includes(filtro) ||
					//item.telefonoCasa.toLowerCase().includes(filtro) ||
					//item.celular.toLowerCase().includes(filtro) ||
					//item.nombreSecretaria.toLowerCase().includes(filtro) ||
					//item.emailSecretaria.toLowerCase().includes(filtro) ||
					//item.isapre.toLowerCase().includes(filtro) ||
					//item.fecha_nacimiento_persona.toLowerCase().includes(filtro) ||
					//item.telefonoOficina.toLowerCase().includes(filtro)
				);
				setStore({ personasFiltro });
			},
			vaciarFiltro: () => {
				const store = getStore();
				setStore({ filtro: false, filtroReclamo: "" });
			},
			clean: history => {
				const store = getStore();
				setStore({
					username: "",
					password: "",
					access: ""
				});
				localStorage.clear();
			},
			// -----------------------------------------HANDLES-------------------------------

			handleEnvioMod: (e, history) => {
				e.preventDefault();
				getActions().putFormulario(history);
			},
			handlePDFFormulario: (e, id) => {
				const store = getStore();
				fetch(store.apiUrl + "/api/formulario/" + id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						window.open(store.apiUrl + data.pdf);
					});
			},
			handleDocumentoData: documento => {
				const store = getStore();
				setStore({ documento });
			},
			handleCleanData: () => {
				const store = getStore();
				setStore({
					documento: {
						tipodoc: "Boleta",
						numdoc: "",
						montodoc: "",
						datedoc: new Date().toISOString().slice(0, 10)
					},
					servicio: {
						pago: "COB",
						detalle: "",
						archivoServicio: null,
						proveedor_id: 1
					}
				});
			},
			// -----------------------------------------HANDLES-------------------------------

			//funcion para iniciar sesion -  POST api propia
			login: (username, password, history) => {
				const store = getStore();
				const data = {
					username: username,
					password: password
				};
				fetch(store.apiUrl + "/api/token/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ token: data, username: "", password: "", access: data.access, estaLoggeado: true });
						localStorage.setItem("token", data.access);

						history.push("/reclamos");
					});
			},

			//funcion para registrarse - POST api propia
			register: (username, email, password) => {
				const store = getStore();
				const data = {
					username: username,
					email: email,
					password: password
				};
				fetch(store.apiUrl + "/api/registro/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ token: data, username: "", email: "", password: "", password2: "" });
						alert("ya puedes iniciar sesion");
					});
			},
			getServicios: () => {
				const store = getStore();

				fetch(store.apiUrl + "/api/serviciosDocumentos/" + store.formulario.reclamo_id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data =>
						setStore({
							servicios: data
						})
					)
					.catch(error => setStore({ error }));
			},

			getServicios2: () => {
				const store = getStore();

				fetch(store.apiUrl + "/api/serviciosDocumentos/" + store.formulario.reclamo_id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(servicios =>
						setStore({
							servicios: {
								proveedor_id: servicios.proveedor_id,
								nombre_proveedor: servicios.proveedor_id__nombre_proveedor,
								documentos: {
									id: servicios.documentos.id,
									numdoc: servicios.documentos.numdoc
								},
								servicios: {
									id: servicios.id,
									detalle: servicios.detalle,
									pago: servicios.pago,
									archivoServicio: servicios.archivoServicio
								}
							}
						})
					)
					.catch(error => setStore({ error }));
			},

			getPersonas: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/personas/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ personas: data, personasFiltro: {} }))
					.catch(error => setStore({ error }));
			},

			//funcion GET para obtener los documentos por reclamo - GET api propia
			getDocumentoId: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/" + store.numservice.id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ documentoid: data }))
					.catch(error => setStore({ error }));
			},

			//funcion GET para obtener los documentos por reclamo  - GET api propia
			getServicioId2: item => {
				const store = getStore();
				fetch(store.apiUrl + "/api/serviciosDocumentos/" + item.reclamo_id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ servicios: data }))
					.catch(error => setStore({ error }));
			},

			//funcion GET para obtener todos los documentos - GET api propia
			getDocumentoAll: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ documentos: data }))
					.catch(error => setStore({ error }));
			},
			//funcion GET para obtener todos los documentos - GET api propia
			getaccounts: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/account", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ accounts: data }));
			},

			//funcion GET para obtener todos los documentos - GET api propia
			getaccount: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/profile/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ account: data });
					});
			},
			getProveedoresAutocompletar: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/proveedoresAutocompletar/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ proveedores: data }))
					.catch(error => setStore({ error }));
			},
			getProveedores: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/proveedores/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ proveedores: data }))
					.catch(error => setStore({ error }));
			},
			handleChangeProveedor: e => {
				const { name, value } = e.target;
				const store = getStore();
				let proveedorValue = store.documento.proveedorValue;
				proveedorValue = value;

				setStore({
					proveedorValue
				});
			},
			handleSelectProveedor: e => {
				const { value } = e.target;
				const store = getStore();
				let proveedorValue = store.documento.proveedorValue;
				proveedorValue = value;

				setStore({
					proveedorValue
				});
			},
			// matchProveedores: (proveedorValue, value) => {
			// 	return proveedorValue.nombre_proveedor.toLowerCase().indexOf(value.toLowerCase()) !== -1;
			// },
			//funcion PUT para modificar los datos del usuario - PUT api propia
			putAccount: history => {
				const store = getStore();
				const data = store.account;

				fetch(store.apiUrl + "/api/profile/", {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ account: data });
						alert("Tus datos se actualizaron");
						history.push("/usuarios");
					});
			},

			//funcion GET para obtener todos los documentos - GET api propia
			getPoliza: () => {
				const store = getStore();
				fetch(store.apiUrl2 + "/claim/policymembers/" + store.numpoliza, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic QkQxNzYwMy0wMTpOODVGWlJGU1pDMTFSVFNKT0pRRTQwUVFOM0lHRFQxSg=="
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ asegurados: data }))
					.catch(error => setStore({ error }));
			},

			//funcion POST para crear un nuevo reclamo - POST api claim //falta mejorar convertir al formData
			PostReclamo: history => {
				const store = getStore();
				const data = store.reclamo;
				fetch(store.apiUrl2 + "/claim/fileclaim/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic QkQxNzYwMy0wMTpOODVGWlJGU1pDMTFSVFNKT0pRRTQwUVFOM0lHRFQxSg=="
					}
				})
					.then(resp => resp)
					.then(data => {
						setStore({ idReclamo: data });
						alert("reclamo generado con exito" + store.idReclamo.ClaimId);
					});
			},
			deleteReclamo: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/reclamos/" + store.deleteselect, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(() => {
						getActions().getFormulario();
						getActions().getServicios();
					});
			},
			deleteProveedor: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/proveedores/" + store.deleteselect, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(() => {
						getActions().getProveedores();
					});
			},
			proveedorVacio: () => {
				setStore({
					proveedor: {
						nombre_proveedor: "",
						grupo: "",
						rut_proveedor: ""
					}
				});
			},
			postAddProveedor: () => {
				let store = getStore();
				let data = store.proveedor;
				fetch(store.apiUrl + "/api/proveedores/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp)
					.then(data => {
						setStore({
							proveedor: {
								nombre_proveedor: "",
								grupo: "",
								rut_proveedor: ""
							}
						});
					})
					.then(() => {
						getActions().getProveedores();
					});
			},
			putProveedor: () => {
				let store = getStore();
				let data = store.proveedor;
				fetch(store.apiUrl + "/api/proveedores/", {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp)
					.then(data => {
						setStore({
							proveedor: {
								nombre_proveedor: "",
								grupo: "",
								rut_proveedor: ""
							}
						});
					})
					.then(() => {
						getActions().getProveedores();
					});
			},
			postDocumento: () => {
				let store = getStore();
				let data = store.documento;
				data["detalle_servicio_id"] = store.numservice.id;
				fetch(store.apiUrl + "/api/documentos/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp)
					.then(data => {
						setStore({
							documento: {
								tipodoc: "Boleta",
								numdoc: "",
								montodoc: "",
								datedoc: new Date().toISOString().slice(0, 10)
							}
						});
					})
					.then(() => {
						getActions().getDocumentoId();
						getActions().getServicios();
					});
			},
			postAddPersona: () => {
				let store = getStore();
				let data = store.persona;
				fetch(store.apiUrl + "/api/personas/", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp)
					.then(data => {
						setStore({
							persona: {}
						});
					})
					.then(() => {
						getActions().getPersonas();
					});
			},
			//funcion POST para crear un nuevo reclamo - POST api propia
			SaveFormulario: history => {
				const store = getStore();
				const data = store.formulario;
				fetch(store.apiUrl + "/api/reclamos/" + store.account.id, {
					method: "Post",
					body: JSON.stringify(data),
					headers: {
						Authorization: "Bearer " + store.access,
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						// console.log(data);
						setStore({
							formulario: {
								nameReclamo: store.formulario.nameReclamo,
								rut: store.formulario.rut,
								name_estado: store.formulario.name_estado,
								numpoliza: store.formulario.numpoliza,
								reclamo_id: data.id,
								detalle_diagnostico: data.detalle_diagnostico
							}
						});
						history.push("/formdoc");
					});
			},

			//funcion POST para agregar documentos a un reclamo se envia con Formdata, ya que se adjunta File del documento - POST api propia
			SaveDocumentoSinFile: history => {
				const store = getStore();
				let form_data = new FormData();
				if (store.docfile != null) form_data.append("docfile", store.docfile, store.docfile.name);
				form_data.append("datedoc", store.documento.datedoc);
				form_data.append("proveedor_id", store.documento.proveedor_id);
				form_data.append("tipodoc", store.documento.tipodoc);
				form_data.append("numdoc", store.documento.numdoc);
				form_data.append("montodoc", store.documento.montodoc);
				form_data.append("detalle_tratamiento", store.documento.detalle_tratamiento);
				form_data.append("pago", store.documento.pago);
				form_data.append("reclamo_id", store.formulario.id);
				fetch(store.apiUrl + "/api/documentos/" + store.formulario.id, {
					method: "Post",
					body: form_data,
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(() => {
						getActions().getDocumentoId();
						setStore({
							documento: {
								pago: "COB",
								tipodoc: "Boleta",
								proveedor_id: null,
								numdoc: "",
								montodoc: 0,
								detalle_tratamiento: "",
								datedoc: new Date().toISOString().slice(0, 10),
								proveedorValue: ""
							},
							docfile: null
						});
					})
					.catch(error => {
						setStore({ error });
						alert("No se pudo ingresar el documento, revise los campos");
					});
			},
			PutDocumento: () => {
				const store = getStore();
				let form_data = new FormData();
				if (store.docfile == null) {
					// form_data.append("docfile", "");
				} else {
					form_data.append("docfile", store.docfile, store.docfile.name);
				}

				form_data.append("datedoc", store.documento.datedoc);
				form_data.append("nombre_proveedor", store.documento.nombre_proveedor);
				form_data.append("tipodoc", store.documento.tipodoc);
				form_data.append("numdoc", store.documento.numdoc);
				form_data.append("montodoc", store.documento.montodoc);
				form_data.append("detalle_tratamiento", store.documento.detalle_tratamiento);
				form_data.append("pago", store.documento.pago);
				form_data.append("id", store.documento.id);
				fetch(store.apiUrl + "/api/documentos/" + store.documento.reclamo_id, {
					method: "PUT",
					body: form_data,
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						getActions().getDocumentoId2(store.documento.reclamo_id);
						setStore({
							documento: {
								pago: "COB",
								tipodoc: "Boleta",
								nombre_proveedor: "",
								numdoc: "",
								montodoc: 0,
								detalle_tratamiento: "",
								datedoc: new Date().toISOString().slice(0, 10),
								proveedorValue: "",
								docfile: null
							},
							docfile: null
						});
						alert("Las modificaciones se realizon exitosamente!");
					})
					.catch(error => {
						setStore({ error });
						alert("No se pudo ingresar el documento, revise los campos");
					});
			},
			//funcion GET para obtener los reclamos por usuario - GET api propia
			getFormulario: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/reclamos/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ formularios: data }))
					.catch(error => setStore({ error }));
			},

			//funcion PUT para modificar los datos del usuario - PUT api propia
			putFormulario: () => {
				const store = getStore();
				const data = {
					id: store.formulario.reclamo_id,
					detalle_diagnostico: store.formulario.detalle_diagnostico,
					name_estado: store.formulario.estado,
					asociacion_id: store.formulario.asociacion_id
				};

				fetch(store.apiUrl + "/api/reclamos/" + store.formulario.reclamo_id, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						alert("se modificaron los datos del reclamo");
					});
			},
			restafecha: item => {
				let fecha1 = new Date(item);
				let fecha2 = new Date();
				var dif = fecha2.getTime() - fecha1.getTime();
				var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
				return dias;
			},
			enviarReclamo: (reclamo, servicios) => {
				const store = getStore();
				let data = { reclamo, servicios };
				fetch(store.apiUrl + "/api/generarclaim/", {
					method: "Post",
					body: JSON.stringify(data),
					headers: {
						Authorization: "Bearer " + store.access,
						"Content-Type": "application/json"
					}
				})
					.then(resp => {
						if (resp.status === 200) {
							return resp.json().then(data => {
								setStore({ formulario: data });
								alert("Se ha enviado el reclamo exitosamente");
							});
						} else if (resp.status === 400) {
							return resp.json().then(data => alert("No se ha enviado el reclamo: " + data.reason));
						}
					})
					.catch(error => {
						setStore({ error });
						alert("No se puede enviar el reclamo: ");
					});
			}
		}
	};
};

export default getState;
