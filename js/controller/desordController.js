var DesOrdController = function() {
	
	this.Init = init;
	
	function cargar_ordenes() {
		try {
			//localStorage.clear();
			
			var arrExistentes = localStorage.getItem('ordenes');
			// var arrCodMaq = [];
			// var arrCodxMaq = [];
			// var arrCod = [];
			// var codMaq;

			var arrOrdTbj = [];
			localStorage.removeItem('ordenes_bak');
			localStorage.setItem('ordenes_bak', arrExistentes);
			// arrCodMaq = find_ordenes_maquilados(arrExistentes);
			
			OperationModel.carga_ordenes_trabajo(function(data) {
				var objOrdTbj;
				var arrOrdTbjSer = [];
				var objOrdTbjSer;
				var pLstOTSer;
				var objEntLiv;

				for(var x in data) {
					arrOrdTbjSer = [];
					objOrdTbj = new Bean_orden_trabajo(
						data[x].id,
						data[x].Folio,
						data[x].Referencia,
						data[x].Fecha
					);
					pLstOTSer = data[x].PLstOTSer;
					for (var y in pLstOTSer) {
						objOrdTbjSer = new Bean_orden_trabajo_servicio(
							pLstOTSer[y].Id,
							pLstOTSer[y].Id_orden_trabajo,
							pLstOTSer[y].Id_servicio,
							pLstOTSer[y].Piezas,
							pLstOTSer[y].Ref1,
							pLstOTSer[y].Ref2
						);
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
			});

			// if(arrCodMaq.length>0) {
			// 	codMaq = arrCodMaq.filter(function(obj) {
			// 		return obj.Id == objOrdTbj.Id;
			// 	});
			// }
			// if(codMaq!= undefined && codMaq.length>0) {
			// 	objOrdTbj.Piezas_maquiladas_hoy = codMaq[0].Piezas_maquiladas_hoy;
			// 	arrCod.push(objOrdTbj);
			// }
			// else{
			// 	arrCod.push(objOrdTbj);
			// }

		} catch (error) {
			Common.notificationAlert(error.message, 'Error', 'Ok');
			Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargar órdenes', false);			
		}
	}

	function fillOrdenesTbl() {

		arrExistentes = localStorage.getItem('ordenes');
		if(arrExistentes!=null && arrExistentes.length>0) {
			arrExistentes = JSON.parse(arrExistentes);
			var table = document.getElementById("tbody_ordenes");
			table.innerHTML = '';
			var v_LstOTSer;
			for(var x in arrExistentes) {
				var row = table.insertRow(x);
				if(x % 2 != 0)
					row.className = "pure-table-odd";

				var cellFolio = row.insertCell(0);
				var cellFecha = row.insertCell(1);
				var cellPrecio = row.insertCell(2);
				var cellNOM = row.insertCell(3);

				cellFolio.innerHTML = arrExistentes[x].Folio;
				cellFolio.setAttribute('align', 'center');
				cellFecha.innerHTML = arrExistentes[x].Fecha;
				cellFecha.setAttribute('align', 'center');

				v_LstOTSer = arrExistentes[x].PLstOTSer;
				
				for(var y in v_LstOTSer) {
					switch (v_LstOTSer[y].Id_servicio) {
						case 1:
							cellPrecio.innerHTML = v_LstOTSer[y].Piezas;
							cellPrecio.setAttribute('align', 'center');
							break;
						case 2:
							cellNOM.innerHTML = v_LstOTSer[y].Piezas;
							cellNOM.setAttribute('align', 'center');
							break;
						default:
							break;
					}
				}
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
			Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargando ordenes...', true);
			cargar_ordenes();
        });
	}
}