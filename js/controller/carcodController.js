var CarcodController = function() {
	
	this.Init = init;
	
	function cargar_pedidos() {
		try {
			//localStorage.clear();
			
			var arrExistentes = localStorage.getItem('pedidos');
			var arrCodMaq = [];
			var arrCodxMaq = [];
			var arrCod = [];
			var codMaq;

			localStorage.removeItem('pedidos_bak');
			localStorage.setItem('pedidos_bak', arrExistentes);
			arrCodMaq = find_pedidos_maquilados(arrExistentes);
			OperationModel.carga_pedidos_Liverpool(function(data) {
				var objPedLiv;
				for(var x in data) {
					objPedLiv = new BeanEntrada_liverpool(
						data[x].Id,
						data[x].Id_entrada,
						data[x].Proveedor,
						data[x].Trafico,
						data[x].Pedido,
						data[x].Piezas,
						data[x].Fecha_confirma,
						data[x].Piezas_maq,
						data[x].Fecha_maquila
					)
					if(arrCodMaq.length>0) {
					 	codMaq = arrCodMaq.filter(function(obj) {
							return obj.Id == objPedLiv.Id;
						});
					}
					if(codMaq!= undefined && codMaq.length>0) {
						objPedLiv.Piezas_maquiladas_hoy = codMaq[0].Piezas_maquiladas_hoy;
						arrCod.push(objPedLiv);
					}
					else{
						arrCod.push(objPedLiv);
					}
				}
				localStorage.removeItem('pedidos');
				if(arrCod.length>0) {
					localStorage.setItem('pedidos', JSON.stringify(arrCod));
					Common.notificationAlert('Se cargaron ' + arrCod.length + ' pedidos correctamente', 'Info', 'Ok');			
				}
				Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargar Pedidos', false);
			});
		} catch (error) {
			Common.notificationAlert(error.message, 'Error', 'Ok');
			Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargar Pedidos', false);			
		}
	}

	function find_pedidos_maquilados(codliver) {
		var maquilados = [];
		try {
			if(codliver!=null && codliver.length>0) {
				codliver = JSON.parse(codliver);
				maquilados = codliver.filter(function(obj) {
					return obj.Piezas_maquiladas_hoy > 0;
				});	
			}
		} catch (error) {
			console.log('method find_pedidos_maquilados error: ' + error.message);
		}
		
		return maquilados;
	}

	function init() {
		init_controls();
	} 

	function init_controls() {
		x$('#btn_load').on('click', function() {
			Common.setEstatusBtn('btn_load', '<i class="sprite icon DownloadfromtheCloud"></i>&nbsp;Descargando pedidos...', true);
			cargar_pedidos();
        });
	}
}