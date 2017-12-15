var DesmaqController = function() {
	
	this.Init = init;
	var arrExistentes;
	var arrCapturados;
	var arrXguardar = [];
	var tbody_maquiladas;

	function subir_maquila() {
		try {
			OperationModel.maquila_addLst(arrXguardar, function(data) { 
				if(isNaN(data)) {
					Common.notificationAlert(data, 'Error', 'ok');
					Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subir Maquila', false);
				}
				else {
					Common.notificationAlert('Se subieron ' + data + ' capturas correctamente.', 'Info', 'Ok');
					localStorage.clear();
					oCADController.Create('desmaq');
				}
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
			
			var numRow = 0;
			
			for(var a in arrExistentes) {
				var objOT = arrExistentes[a];
				var arrOTSer = objOT.PLstOTSer.filter(function (obj) {
					return obj.PLstMaq != undefined && obj.PLstMaq.length > 0;
				});
				
				if(arrOTSer != undefined && arrOTSer.length > 0) {
					for(var b in arrOTSer) {
						var objOTSer = arrOTSer[b];
						var arrOTSerMaq = objOTSer.PLstMaq.filter(function (obj) {
							return obj.Capturada == false;
						});

						if(arrOTSerMaq != undefined && arrOTSerMaq.length > 0) {
							for(var c in arrOTSerMaq) {
								var objOTSerMaq = arrOTSerMaq[c];
								addRow(objOT, objOTSer, objOTSerMaq, numRow);
								var objMaq = new Bean_maquila(
									0,
									objOTSer.Id,
									objOTSerMaq.Fecha,
									objOTSerMaq.Piezas,
									true
								)
								objMaq.PLstPasos = objOTSer.PLstPasos;
								arrXguardar.push(objMaq);
								numRow ++;
							}
						}
					}
				}
			}

			if(numRow>0)
				Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subir Maquila', false);
		}
	}

	function addRow(objOT, objOTSer, objOTSerMaq, numRow) {
		
		var row = tbody_maquiladas.insertRow(numRow);

		if(numRow % 2 != 0)
			row.className = "pure-table-odd";

		var cellOT = row.insertCell(0);
		var cellServ = row.insertCell(1);
		var cellPasos = row.insertCell(2);
		var cellPiezas = row.insertCell(3);
		
		cellOT.innerHTML = objOT.Folio;
		switch (objOTSer.Id_servicio) {
			case 1:
				cellServ.innerHTML = 'Etiqueta';
				break;
			case 2:
				cellServ.innerHTML = 'NOM';
				break;
			default:
				break;
		}

		cellPasos.innerHTML = objOTSer.PLstPasos.length;
		cellPasos.setAttribute('align', 'center');

		cellPiezas.innerHTML = objOTSerMaq.Piezas;
		cellPiezas.setAttribute('align', 'center');
	}

	function init() {
		tbody_maquiladas = document.getElementById('tbody_maquiladas');		
		fillMaquilaCapturada();
		init_controls();
	} 
	
	function init_controls() {
		x$('#btn_upload').on('click', function() {
			Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subiendo Maquila...', true);
			subir_maquila();	
        });
	}
}