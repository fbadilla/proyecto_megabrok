const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			apiUrl: "http://127.0.0.1:8000",
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
			formulario: {},
			formularios: [],
			formulariosId: [],
			documento: {},
			documentoid: [],
			documentoid2: [],
			docfile: {},
			reclamo: {},
			mensaje: {}
		},

		actions: {
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

			//funcion que maneja el Post de un nuevo formulario
			handleFormulario: (e, history) => {
				e.preventDefault();
				getActions().SaveFormulario(history);
			},

			//funcion que maneja el Post de un nuevo formulario, ademas realiza un GET de documentos por ID, antes y despues del POST
			handleEnvioDocumento: (e, history) => {
				getActions().getDocumentoId(history);
				getActions().SaveDocumentoSinFile(history);
				getActions().getDocumentoId(history);
			},

			//funcion que maneja el Post para obtener un nuevo TOKEN
			handleLogin: (e, history) => {
				e.preventDefault();
				const store = getStore();
				getActions().login(store.username, store.password, history);
			},
			//funcion que maneja el Post para crear un nuevo usuario
			handleRegister: e => {
				e.preventDefault();
				const store = getStore();
				getActions().register(store.username, store.email, store.password);
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

			//funcion que crea un nuevo store.aseguradoselected con la la poliza seleccionada
			handleAseguradoSelected: (item, history) => {
				const store = getStore();
				setStore({
					aseguradoselected: item
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
						setStore({ token: data, username: "", password: "" });
						localStorage.setItem("token", data.access);

						history.push("/formulariochile");
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
						Authorization: "Bearer " + store.token.access
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
						Authorization: "Bearer " + store.token.access
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
						Authorization: "Bearer " + store.token.access
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
						Authorization: "Bearer " + store.token.access
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
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ account: data });
					});
			},

			//funcion PUT para modificar los datos del usuario - PUT api propia
			putAccount: history => {
				const store = getStore();
				const data = store.account;

				fetch(store.apiUrl + "/api/profile/", {
					method: "PUT",
					body: JSON.stringify(data),
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
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

			//funcion POST para crear un nuevo reclamo - POST api propia
			SaveFormulario: history => {
				const store = getStore();
				const data = store.formulario;
				fetch(store.apiUrl + "/api/reclamos/" + store.account.id, {
					method: "Post",
					body: JSON.stringify(data),
					headers: {
						Authorization: "Bearer " + getStore().token.access,
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
						Authorization: "Bearer " + getStore().token.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ documento: data });
					});
			},
			//funcion POST para agregar documentos a un reclamo se envia con Formdata, ya que se adjunta File del documento - POST api propia
			SaveDocumentoSinFile: history => {
				const store = getStore();
				let form_data = new FormData();
				form_data.append("docfile", store.docfile, store.docfile.name);
				form_data.append("datedoc", store.documento.datedoc);
				form_data.append("nombre_proveedor", store.documento.nombre_proveedor);
				form_data.append("tipodoc", store.documento.tipodoc);
				form_data.append("numdoc", store.documento.numdoc);
				form_data.append("montodoc", store.documento.montodoc);
				form_data.append("detalle_tratamiento", store.documento.detalle_tratamiento);
				form_data.append("pago", store.documento.pago);
				const data = store.documento;
				fetch(store.apiUrl + "/api/documentos/" + store.formulario.id, {
					method: "Post",
					body: form_data,
					mimeType: "multipart/form-data",
					headers: {
						Authorization: "Bearer " + getStore().token.access
					}
				})
					.then(resp => resp.json())
					.then(data => {
						setStore({ documento: data });
					});
			},
			//funcion GET para obtener los reclamos por usuario - GET api propia
			getFormulario: () => {
				const store = getStore();
				fetch(store.apiUrl + "/api/reclamos/" + store.account.id, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ formulariosId: data }))
					.catch(error => setStore({ error }));
			},
			//funcion GET para obtener los reclamos por usuario - GET api propia
			deleteDocumento: id => {
				const store = getStore();
				fetch(store.apiUrl + "/api/documentos/" + id, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.token.access
					}
				})
					.then(resp => resp.json())
					.then(data => setStore({ mensaje: data }))
					.catch(error => setStore({ error }));
			}
		}
	};
};

export default getState;
