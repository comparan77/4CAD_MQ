var CapmaqController = function() {
	
	this.Init = init;
	var arrExistentes;
	var traficoFinded;
	var pedidoFinded;

	function init() {
		// arrExistentes = localStorage.getItem('pedidos');
		// if(arrExistentes!=null && arrExistentes.length>0) {
		// 	arrExistentes = JSON.parse(arrExistentes);
		// 	init_controls();
		// }
		// else {
		// 	Common.setEstatusBtn('btn_search_trafico','<i class="sprite icon Search"></i>Buscar Tr&aacute;fico', true);
		// 	Common.setEstatusBtn('btn_save','Guardar Maquila', true);
		// 	Common.notificationAlert('No existen códigos cargados en el dispositivo, favor de realizar la carga.', 'Advertencia', 'Ok');
		// }
	} 

	function init_controls() {
		// btn_search_trafico_click();
		// btn_search_pedido_click();
		// btn_save_click();
		// div_new_search_click();
	}

	function div_new_search_click() {
		x$('#div_new_search').on('click', function() { 
			clear_form();
		});
	}

	function btn_search_trafico_click() {
		x$('#btn_search_trafico').on('click', function() {
			try {
				var traficoBuscado = String(x$('#txt_trafico').attr('value'));

				x$('#div_pedido').addClass('hidden');
				x$('#div_maquila').addClass('hidden');
				traficoBuscado = traficoBuscado.toUpperCase();
				Common.setEstatusBtn('btn_search_trafico', 'Buscando trafico ...', true);
				traficoFinded = arrExistentes.filter(function (obj) {
					return obj.Trafico.toUpperCase() == traficoBuscado;
				});
				if(traficoFinded.length > 0) {
					x$('#div_pedido').removeClass('hidden');			
				}
				else {
					Common.notificationAlert('El número de tráfico proporcionado no existe.', 'Advertencia', 'Ok');
				}
			} catch (error) {
				Common.setEstatusBtn('btn_search_trafico', '<i class="sprite icon Search"></i>Buscar Tráfico', false);	
			} 
			Common.setEstatusBtn('btn_search_trafico', '<i class="sprite icon Search"></i>Buscar Tráfico', false);	
        });
	}

	function btn_search_pedido_click() {
		x$('#btn_search_pedido').on('click', function() {
			try {
				var pedidoBuscado = String(x$('#txt_pedido').attr('value'));

				x$('#div_maquila').addClass('hidden');

				Common.setEstatusBtn('btn_search_pedido', 'Buscando pedido ...', true);
				pedidoFinded = traficoFinded.filter(function (obj) {
					return obj.Pedido == pedidoBuscado;
				});
				if(pedidoFinded.length > 0) {
					x$('#lbl_proveedor').html(pedidoFinded[0].Proveedor);
					x$('#lbl_piezas').html(pedidoFinded[0].Piezas);
					x$('#lbl_piezas_x_maq').html(pedidoFinded[0].Piezas - pedidoFinded[0].Piezas_maq - pedidoFinded[0].Piezas_maquiladas_hoy);
					x$('#txt_pieza_maq').attr('value', pedidoFinded[0].Piezas_maquiladas_hoy);
					x$('#txt_num_pasos').attr('value', pedidoFinded[0].Num_pasos);
					if(pedidoFinded[0].Piezas_maquiladas_hoy != 0) {
						Common.notificationAlert('El número de pedido ya cuenta con una captura de maquila.', 'Advertencia', 'Ok');	
					}
					else{
						x$('#txt_pieza_maq').attr('value','');
						x$('#txt_num_pasos').attr('value','');
					}
					x$('#div_maquila').removeClass('hidden');
					x$('#div_search').addClass('hidden');
					x$('#div_new_search').removeClass('hidden');
				}
				else {
					Common.notificationAlert('El número de pedido proporcionado no existe.', 'Advertencia', 'Ok');
				}
			} catch (error) {
				Common.setEstatusBtn('btn_search_pedido', '<i class="sprite icon Search"></i>Buscar Pedido', false);	
			} 
			Common.setEstatusBtn('btn_search_pedido', '<i class="sprite icon Search"></i>Buscar Pedido', false);	
        });
	}

	function btn_save_click() {
		x$('#btn_save').on('click', function() { 
			try {
				var piezasMqHoy = String(x$('#txt_pieza_maq').attr('value')) * 1;
				pedidoFinded[0].Piezas_maquiladas_hoy = piezasMqHoy;

				var d = new Date();
				pedidoFinded[0].Fecha_maquila = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();

				var num_pasos = String(x$('#txt_num_pasos').attr('value')) * 1;
				pedidoFinded[0].Num_pasos = num_pasos;

				Common.setEstatusBtn('btn_save', 'Guardando maquila ...', true);
				Common.notificationAlert('La maquila ha sido guardada correctamente.', 'Info', 'Ok');
				localStorage.setItem('pedidos', JSON.stringify(arrExistentes));
				clear_form();
			} catch (error) {
				Common.notificationAlert(error.message, 'Error', 'Ok');
				Common.setEstatusBtn('btn_save', 'Guardar Maquila', false);
			}
		});
	}
	
	function clear_form() {
		var oCadCtr = new CADController();
		oCadCtr.Create('capmaq');
	}
}