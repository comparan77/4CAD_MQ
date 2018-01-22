var DesOrdController = function() {
	
	this.Init = init;
	var grd_ordenes;
	
	function cargar_ordenes() {
		try {
			
			var arrExistentes = localStorage.getItem('ordenes');

			var arrOrdTbj = [];
			localStorage.removeItem('ordenes_bak');
			localStorage.setItem('ordenes_bak', arrExistentes);
			
			OperationModel.carga_ordenes_trabajo(function(data) {
				var objOrdTbj;
				var arrOrdTbjSer = [];
				var objOrdTbjSer;
				var pLstOTSer;
				var objEntLiv;
				if(data.length == 0) {
					Common.notificationAlert('No existen órdenes de trabajo en sistema', 'Info', 'Ok');
				}

				for(var x in data) {
					arrOrdTbjSer = [];
					objOrdTbj = new Bean_orden_trabajo(
						data[x].id,
						data[x].Folio,
						data[x].Referencia,
						data[x].Fecha,
						data[x].Supervisor
					);
					pLstOTSer = data[x].PLstOTSer;
					for (var y in pLstOTSer) {
						objOrdTbjSer = new Bean_orden_trabajo_servicio(
							pLstOTSer[y].Id,
							pLstOTSer[y].Id_orden_trabajo,
							pLstOTSer[y].Id_servicio,
							pLstOTSer[y].Id_etiqueta_tipo,
							pLstOTSer[y].Piezas,
							pLstOTSer[y].PiezasMaq,
							pLstOTSer[y].Ref1,
							pLstOTSer[y].Ref2
						);
						objOrdTbjSer.PEtiquetaTipo = pLstOTSer[y].PEtiquetaTipo;
						objOrdTbjSer.PLstPasos = pLstOTSer[y].PLstPasos;
						if(objOrdTbjSer.Id_orden_servicio == 1) {
							objEntLiv = new BeanEntrada_liverpool(
								pLstOTSer[x].PEntLiv.Id,
								pLstOTSer[x].PEntLiv.Id_entrada,
								pLstOTSer[x].PEntLiv.Proveedor,
								pLstOTSer[x].PEntLiv.Trafico,
								pLstOTSer[x].PEntLiv.Pedido,
								pLstOTSer[x].PEntLiv.Piezas,
								pLstOTSer[x].PEntLiv.Fecha_confirma,
								pLstOTSer[x].PEntLiv.Piezas_maq,
								pLstOTSer[x].PEntLiv.Fecha_maquila,
								pLstOTSer[x].PEntLiv.Num_pasos
							)
							objOrdTbjSer.PEntLiv = objEntLiv;
						}
						arrOrdTbjSer.push(objOrdTbjSer);
					}
					objOrdTbj.PLstOTSer = arrOrdTbjSer;
					arrOrdTbj.push(objOrdTbj);
				}
				localStorage.removeItem('ordenes');
				if(arrOrdTbj.length>0) {
					localStorage.setItem('ordenes', JSON.stringify(arrOrdTbj));
					fillOrdenesTbl();					
					Common.notificationAlert('Se cargaron ' + arrOrdTbj.length + ' ordenes correctamente', 'Info', 'Ok');			
				}
				Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargar órdenes', false);
			}, 
			function (error) {
				Common.notificationAlert('Error: ' + error + '\nFavor de contactar al administrador', 'Error', 'Ok');
				Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargar órdenes', false);
			});

		} catch (error) {
			Common.notificationAlert(error.message, 'Error', 'Ok');
			Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargar órdenes', false);			
		}
	}

	function fillOrdenesTbl() {

		arrExistentes = localStorage.getItem('ordenes');
		if(arrExistentes!=null && arrExistentes.length>0) {
			arrExistentes = JSON.parse(arrExistentes);
			var v_LstOTSer;
			var arrData = [];
			var objOrd;
			for(var x in arrExistentes) {
				var objOrd = {
					Folio: '',
					Fecha: '',
					Precio: '',
					Nom: ''
				};
				objOrd.Folio = arrExistentes[x].Folio;
				objOrd.Fecha = arrExistentes[x].Fecha.replace(/(T.*)/g, "");
				v_LstOTSer = arrExistentes[x].PLstOTSer;
				
				for(var y in v_LstOTSer) {
					switch (v_LstOTSer[y].Id_servicio) {
						case 1:
							objOrd.Precio = v_LstOTSer[y].Piezas + '/' + v_LstOTSer[y].PiezasMaq;
							break;
						case 2:
							objOrd.Nom = v_LstOTSer[y].Piezas + '/' + v_LstOTSer[y].PiezasMaq;
							break;
						default:
							break;
					}
				}
				arrData.push(objOrd);
			}
			try {
				grd_ordenes = new DataGrid({
					Id: 'grd_ordenes',
					source: arrData
				});
				grd_ordenes.open();
				grd_ordenes.dataBind();	
			} catch (error) {
				console.log(error.message);
			}
			
		}

	}

	function find_ordenes_maquilados(codliver) {
		var maquilados = [];
		try {
			if(codliver!=null && codliver.length>0) {
				codliver = JSON.parse(codliver);
				maquilados = codliver.filter(function(obj) {
					return obj.Piezas_maquiladas_hoy > 0;
				});	
			}
		} catch (error) {
			console.log('method find_ordenes_maquilados error: ' + error.message);
		}
		
		return maquilados;
	}

	function init() {
		init_controls();
	} 

	function init_controls() {
		x$('#btn_load').on('click', function() {
			if(grd_ordenes) 
				grd_ordenes.clear();
			switch (Common.checkConnection().tipo) {
				case Connection.UNKNOWN:
				case Connection.NONE:
					Common.notificationAlert('Es necesario tener acceso a internet para descargar las órdenes de trabajo');
					break;
				default:
					Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargando ordenes...', true);
					cargar_ordenes();
					break;
			}
        });
	}
}