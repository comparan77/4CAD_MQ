var CapmaqController = function() {
	
	this.Init = init;
	var arrExistentes;
	var traficoFinded;
	var pedidoFinded;
	var oNavigator = new navigator();

	function init() {
		arrExistentes = localStorage.getItem('pedidos');
		if(arrExistentes!=null && arrExistentes.length>0) {
			arrExistentes = JSON.parse(arrExistentes);
			init_controls();
		}
		else {
			Common.setEstatusBtn('btn_search_trafico','<i class="sprite icon Search"></i>Buscar Tr&aacute;fico', true);
			Common.setEstatusBtn('btn_save','Guardar Maquila', true);
			Common.notificationAlert('No existen códigos cargados en el dispositivo, favor de realizar la carga.', 'Advertencia', 'Ok');
		}
	} 

	function init_controls() {
		oNavigator.Init(2);
		btn_search_trafico_click();
		btn_search_pedido_click();
		
		servicio_click();
		
		btn_save_click();
		div_new_search_click();


	}

	function servicio_click() {
		x$('#opt-price-label').on('click', function() {
			oNavigator.EnabledBtnNext();
		});

		x$('#opt-uva').on('click', function() {
			oNavigator.EnabledBtnNext();
		});


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
					oNavigator.EnabledBtnNext();
					oNavigator.NextClick(function() {
						if (document.getElementById('opt-price-label').checked || document.getElementById('opt-uva').checked) {
							oNavigator.EnabledBtnNext();
						  }
					});
					// x$('#txt_pieza_maq').attr('value', pedidoFinded[0].Piezas_maquiladas_hoy);
					// x$('#txt_num_pasos').attr('value', pedidoFinded[0].Num_pasos);
					// if(pedidoFinded[0].Piezas_maquiladas_hoy != 0) {
					// 	Common.notificationAlert('El número de pedido ya cuenta con una captura de maquila.', 'Advertencia', 'Ok');	
					// }
					// else{
					// 	x$('#txt_pieza_maq').attr('value','');
					// 	x$('#txt_num_pasos').attr('value','');
					// }
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
		oCADController.Create('capmaq');
	}
}

var navigator = function() {

	var stepNum;
	var MaxStep;
	this.Init = init;
	this.NextClick = nxtClick;
	this.PrevClick = prvClick;
	var _callback;
	this.EnabledBtnNext = enabledBtnNext;
	this.ShowBtnNext = showBtnNext;
	this.DisabledBtnNext = disabledBtnNext;
	this.HideBtnNext = hideBtnNext;
	this.EnabledBtnPrev = enabledBtnPrev;
	this.ShowBtnPrev = showBtnPrev;
	this.DisabledBtnPrev = disabledBtnPrev;
	this.HideBtnPrev = hideBtnPrev;

	function init(maxStep) {
		stepNum = 1;
		MaxStep = maxStep;
		hideBtnPrev();
		disabledBtnNext();
		initControls();
	}

	function initControls() {
		prevClick();
		nextClick();
	}

	function nxtClick(callback) {
		_callback = callback;
	}

	function prvClick(callback) {
		_callback = callback;
	}

	function nextClick() {
		x$('#lnk_sig').on('click', function() {
			x$('#step_' + stepNum).addClass('hidden');
			stepNum ++;
			x$('#step_' + stepNum).removeClass('hidden');
			enabledBtnPrev();
			disabledBtnNext();
			if(stepNum == MaxStep) {
				hideBtnNext();
			}
			if(_callback) {
				_callback();
				_callback = undefined;
			} 
		});
	}

	function prevClick() {
		x$('#lnk_ant').on('click', function() {
			x$('#step_' + stepNum).addClass('hidden');
			stepNum --;
			x$('#step_' + stepNum).removeClass('hidden');
			if(stepNum == 1)
				hideBtnPrev();
			enabledBtnNext();
			if(_callback) {
				_callback();
				_callback = undefined;
			} 
		});
	}

	function enabledBtnNext() {
		Common.setEstatusBtn('lnk_sig', 'SIG >', true);
		x$('#lnk_sig').removeClass('pure-button-disabled');
		showBtnNext();
	}

	function disabledBtnNext() {
		Common.setEstatusBtn('lnk_sig', 'SIG >', false);
		x$('#lnk_sig').addClass('pure-button-disabled');
	}

	function showBtnNext() {
		x$('#lnk_sig').removeClass('hidden');
	}

	function hideBtnNext() {
		x$('#lnk_sig').addClass('hidden');
	}

	function enabledBtnPrev() {
		Common.setEstatusBtn('lnk_ant', '< ANT', true);
		x$('#lnk_ant').removeClass('pure-button-disabled');
		showBtnPrev();
	}

	function disabledBtnPrev() {
		Common.setEstatusBtn('lnk_ant', '< ANT', false);
		x$('#lnk_ant').addClass('pure-button-disabled');
	}

	function showBtnPrev() {
		x$('#lnk_ant').removeClass('hidden');
	}

	function hideBtnPrev() {
		x$('#lnk_ant').addClass('hidden');
	}

}