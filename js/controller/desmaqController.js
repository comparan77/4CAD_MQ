var DesmaqController = function() {
	
	this.Init = init;
	var arrExistentes;
	var arrCapturados;
	var arrXguardar = [];
	var tbody_maquiladas;

	function subir_maquila() {
		try {
			OperationModel.carga_maquila_Liverpool(arrXguardar, function(data) { 
				Common.notificationAlert('Se subieron las capturas de maquila correctamente.', 'Info', 'Ok');
				localStorage.clear();
				oCADController.Create('desmaq');
			});
		} catch (error) {
			Common.notificationAlert(error.message, 'Error', 'Ok');
			Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subir Maquila', false);
		}
	}

	function fillMaquilaCapturada() {
		arrExistentes = localStorage.getItem('ordenes');
		Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Sin maquila capturada', true);
		if(arrExistentes!=null && arrExistentes.length>0) {
			arrExistentes = JSON.parse(arrExistentes);
			
			arrCapturados = arrExistentes.filter(function(obj) {
				return obj.PLstOTSer.length >=0;
			});

			for(var x in arrCapturados) {
				var capturado = arrCapturados[x];
				if(capturado.PLstMaq.length > 0) {
					for(var y in capturado.PLstMaq) {
						var objOrdTbjSerMaq = capturado.PLstMaq[y];
						if(objOrdTbjSerMaq.Capturada == false) {
							addRow(capturado, objOrdTbjSerMaq);
						}
					}
				}
			}

			// if(arrCapturados != undefined && arrCapturados.length>0) {
				
			// 	var objPedLiv;
			// 	var table = document.getElementById("tbody_maquiladas");

			// 	for(var x in arrCapturados) {
					
			// 		var row = table.insertRow(x);

			// 		if(x % 2 != 0)
			// 			row.className = "pure-table-odd";

			// 		var cellTrafico = row.insertCell(0);
			// 		var cellPedido = row.insertCell(1);
			// 		var cellPiezas = row.insertCell(2);
			// 		var cellPasos = row.insertCell(3);
					
			// 		cellTrafico.innerHTML = arrCapturados[x].Trafico;
			// 		cellPedido.innerHTML = arrCapturados[x].Pedido;
			// 		cellPiezas.setAttribute('align', 'center');
			// 		cellPiezas.innerHTML = arrCapturados[x].Piezas_maquiladas_hoy;
			// 		cellPasos.setAttribute('align', 'center');
			// 		cellPasos.innerHTML = arrCapturados[x].Num_pasos;

			// 		objPedLiv = new BeanEntrada_liverpool(
			// 			arrCapturados[x].Id,
			// 			arrCapturados[x].Id_entrada,
			// 			arrCapturados[x].Proveedor,
			// 			arrCapturados[x].Trafico,
			// 			arrCapturados[x].Pedido,
			// 			arrCapturados[x].Piezas,
			// 			arrCapturados[x].Fecha_confirma,
			// 			arrCapturados[x].Piezas_maq,
			// 			arrCapturados[x].Fecha_maquila,
			// 			arrCapturados[x].Num_pasos
			// 		);
			// 		objPedLiv.Piezas_maquiladas_hoy = arrCapturados[x].Piezas_maquiladas_hoy;
			// 		arrXguardar.push(objPedLiv);
			// 	}

			// 	Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subir Maquila', false);
			// }
		}
	}

	function addRow(capturado, objOrdTbjSerMaq, numRow) {
		
		var row = tbody_maquiladas.insertRow(numRow);

		if(numRow % 2 != 0)
			row.className = "pure-table-odd";

		var cellOT = row.insertCell(0);
		var cellServ = row.insertCell(1);
		var cellPasos = row.insertCell(2);
		var cellPiezas = row.insertCell(3);
		
		cellOT.innerHTML = capturado.Folio;
		switch (capturado) {
			case value:
				
				break;
		
			default:
				break;
		}

		cellTrafico.innerHTML = arrCapturados[x].Trafico;
		cellPedido.innerHTML = arrCapturados[x].Pedido;
		cellPiezas.setAttribute('align', 'center');
		cellPiezas.innerHTML = arrCapturados[x].Piezas_maquiladas_hoy;
		cellPasos.setAttribute('align', 'center');
		cellPasos.innerHTML = arrCapturados[x].Num_pasos;
	}

	function init() {
		fillMaquilaCapturada();
		tbody_maquiladas = document.getElementById('tbody_maquiladas');
		//init_controls();
	} 
	
	function init_controls() {
		x$('#btn_upload').on('click', function() {
			Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subiendo Maquila...', true);
			subir_maquila();	
        });
	}
}