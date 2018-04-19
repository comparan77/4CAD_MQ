var DesmaqController = function() {
	
	this.Init = init;
	var arrExistentes;
	var arrCapturados;
	var arrXguardar = [];
	var grd_maquila;
	var arrSinMaquila = [];

	function subir_maquila() {
		try {
			OperationModel.maquila_addLst(arrXguardar, function(data) { 
				if(isNaN(data)) {
					Common.notificationAlert(data, 'Error', 'ok');
					Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subir Maquila', false);
				}
				else {
					// if(arrSinMaquila.length > 0)
					// 	arrSinMaquila = JSON.stringify(arrSinMaquila);
					// else 
					// 	arrSinMaquila = '';
					arrExistentes = JSON.stringify(arrExistentes);
					DesOrdController.writeFileOrdenes(arrExistentes, function() { 
						Common.notificationAlert('Se subieron ' + data + ' capturas correctamente.', 'Info', 'Ok');
						oCADController.Create('desmaq');
					});
				}
			}, 
			function (error) {
				Common.notificationAlert('Error: ' + error + '\nFavor de contactar al administrador', 'Error', 'Ok');
				Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargar órdenes', false);
			});
		} catch (error) {
			Common.notificationAlert(error.message, 'Error', 'Ok');
			Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subir Maquila', false);
		}
	}

	function fillMaquilaCapturada() {
		Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Sin maquila capturada', true);
		
		if(arrExistentes!=null && arrExistentes.length>0) {
			arrExistentes = JSON.parse(arrExistentes);
			
			var numRow = 0;
			arrCapturados = [];

			var idxOT = 0;
			var idxOTS = 0;
			var idxOTSMaq = 0;
			arrExistentes.filter( function(objOT) {
				objOT.PLstOTSer.filter(function(objOTS) {
					if(objOTS.PLstMaq != undefined && objOTS.PLstMaq.length >0) {
						objOTS.PLstMaq.filter(function(objOTSMaq) {
							if(!objOTSMaq.Capturada) {

								var objCap = {
									folio: objOT.Folio,
									servicio: objOTS.Id_servicio == 1 ? 'Precio' : 'NOM',
									pasos: objOTS.PLstPasos.length,
									piezas: objOTSMaq.Piezas
								};

								arrCapturados.push(objCap);

								var objMaq = new Bean_maquila(
									0,
									objOTS.Id,
									objOTSMaq.Fecha,
									objOTSMaq.Piezas,
									objOTSMaq.Bultos,
									objOTSMaq.Pallets,
									true
								)

								objMaq.PLstPasos = objOTS.PLstPasos;
								arrXguardar.push(objMaq);
								numRow ++;
								arrExistentes[idxOT].PLstOTSer[idxOTS].PLstMaq[idxOTSMaq].Capturada = true; 
								arrExistentes[idxOT].PLstOTSer[idxOTS].PLstMaq[idxOTSMaq].Id = -1;
							}
							idxOTSMaq++;
						});
					}
					idxOTS++;
					idxOTSMaq = 0;
				});
				idxOT++;
				idxOTS = 0;
			});

			/* for(var a in arrExistentes) {
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
								
								var objCap = {
									folio: objOT.Folio,
									servicio: objOTSer.Id_servicio == 1 ? 'Precio' : 'NOM',
									pasos: objOTSer.PLstPasos.length,
									piezas: objOTSerMaq.Piezas
								};

								arrCapturados.push(objCap);

								var objMaq = new Bean_maquila(
									0,
									objOTSer.Id,
									objOTSerMaq.Fecha,
									objOTSerMaq.Piezas,
									objOTSerMaq.Bultos,
									objOTSerMaq.Pallets,
									true
								)

								objMaq.PLstPasos = objOTSer.PLstPasos;
								arrXguardar.push(objMaq);
								numRow ++;
							}
						}
					}
				} 
			} */

			if(numRow>0) {
				grd_maquila = new DataGrid({
					'Id': 'grd_maquila',
					'source': arrCapturados
				});
				grd_maquila.open();
				grd_maquila.dataBind();
				Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subir Maquila', false);

			}
				
		}
	}

	function init() {
		DesOrdController.readFileOrdenes(function(data){
			arrExistentes = data;
			fillMaquilaCapturada();
			init_controls();
		});
	}
	
	function init_controls() {
		x$('#btn_upload').on('click', function() {
			switch (Common.checkConnection().tipo) {
				case Connection.UNKNOWN:
				case Connection.NONE:
					Common.notificationAlert('Es necesario tener acceso a internet para subir las maquilas');
					break;
				default:
					Common.setEstatusBtn('btn_upload', '<i class="sprite icon UploadtotheCloud"></i>&nbsp;Subiendo Maquila...', true);
					subir_maquila();	
					break; 
			}
        });
	}
}