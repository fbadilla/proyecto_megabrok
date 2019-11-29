const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "http://0.0.0.0:8000",
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
				pago: "COB",
				tipodoc: "Boleta",
				numdoc: "",
				montodoc: "",
				detalle_tratamiento: "",
				datedoc: new Date().toISOString().slice(0, 10),
				docfile: null,
				proveedor_id: null
			},
			documentoid: [],
			documentoid2: [],
			docfile: null,
			reclamo: {},
			mensaje: {},
			filtro: false,
			estaLoggeado: false,
			aseguradosFiltro: {},
			proveedores: {}
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
			handleSelect: value => {
				const store = getStore();
				let documento = store.documento;
				documento["proveedor_id"] = value.value;
				setStore({
					documento
				});
			},

			//funcion que maneja el Post de un nuevo formulario
			handleFormulario: (e, history) => {
				e.preventDefault();
				getActions().SaveFormulario(history);
			},

			//funcion que maneja el Post de un nuevo formulario, ademas realiza un GET de documentos por ID, antes y despues del POST
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
				const filtro = store.busqueda.trim().toLowerCase();
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

			//funcion que maneja el Post para crear un nuevo reclamo en api/claim
			handleGenerate: (e, history) => {
				e.preventDefault();
				getActions().PostReclamo(history);
			},

			//funcion que maneja los file y actualiza el store
			handleFileChange: e => {
				const docfile = e.target.files[0];

				setStore({
					docfile
				});
			},
			handleModReclamo: item => {
				const store = getStore();
				let formulario = store.formulario;
				formulario = item;
				setStore({ formulario });
			},
			handleDeleteReclamo: item => {
				const store = getStore();
				let deleteselect = store.deleteselect;
				deleteselect = item;
				setStore({ deleteselect });
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
							(item.asociacion_id__id_persona__nombre + " " + item.asociacion_id__id_persona__apellido)
								.toLowerCase()
								.includes(filtroReclamo) ||
							item.asociacion_id__id_persona__rut.toLowerCase().includes(filtroReclamo) ||
							item.detalle_diagnostico.toLowerCase().includes(filtroReclamo) ||
							item.account_id__name_Account.toLowerCase().includes(filtroReclamo) ||
							item.name_estado.toLowerCase().includes(filtroReclamo) ||
							item.asociacion_id__id_poliza__nun_poliza.toLowerCase().includes(filtroReclamo)
					);
					let filtro = true;
					setStore({ filtroReclamo, coleccion, filtro });
				}
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
			handleDeleteDoc: (id, history) => {
				getActions().deleteDocumento(id);
				getActions().getDocumentoId(history);
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
						pago: "COB",
						tipodoc: "Boleta",
						nombre_proveedor: "",
						numdoc: "",
						montodoc: 0,
						detalle_tratamiento: "",
						datedoc: new Date().toISOString().slice(0, 10),
						proveedorValue: ""
					},
					docfile: null
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

			//funcion GET para obtener los documentos por reclamo - GET api propia
			getDocumentoId: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/" + store.formulario.id, {
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
			getDocumentoId2: id => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/" + id, {
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
						setStore({ formulario: data });
						history.push("/formdoc");
					});
			},

			//funcion POST para agregar documentos a un reclamo  - POST api propia
			SaveDocumento: history => {
				const store = getStore();
				const data = store.documento;
				fetch(store.apiUrl + "/api/documentos/" + store.formulario.id, {
					method: "Post",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
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
							}
						});
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
								tipodoc: "",
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
			//funcion GET para obtener los reclamos por usuario - GET api propia
			deleteDocumento: id => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/" + id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(() => getActions().getDocumentoId(history))
					.catch(error => setStore({ error }));
			},
			//funcion PUT para modificar los datos del usuario - PUT api propia
			putFormulario: () => {
				const store = getStore();
				const data = store.formulario;

				fetch(store.apiUrl + "/api/reclamos/" + store.formulario.id, {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ formulario: data });
						alert("se modificaron los datos del paciente");
					});
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
					.then(data => setStore({ personas: data }))
					.catch(error => setStore({ error }));
			},
			restafecha: item => {
				let fecha1 = new Date(item);
				let fecha2 = new Date();
				var dif = fecha2.getTime() - fecha1.getTime();
				var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
				return dias;
			}
		}
	};
};

export default getState;
