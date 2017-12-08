var CapmaqController = function() {
	
	this.Init = init;
	var arrExistentes;
	var traficoFinded;
	var pedidoFinded;
	var oNavigator = new navigator();
	var vPaso = 0;

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
		oNavigator.Init(4);
		btn_search_trafico_click();
		btn_search_pedido_click();
		
		servicio_click();
		
		getPhoto_click();

		btn_save_click();
		div_new_search_click();
	}

	function appendPaso(txtPromt) {

		try {
			var pasos = document.getElementById('div_pasos');
			
			var divRow = document.createElement('div');
			divRow.setAttribute('id', 'div_paso_' + vPaso)
			divRow.className = 'pure-g';

			var divCellPaso = document.createElement('div');
			divCellPaso.className = 'pure-u-1-3';
			var divSpnPaso = document.createElement('span');
			divSpnPaso.innerHTML = vPaso;
			divSpnPaso.className = 'spnPaso';
			divCellPaso.appendChild(divSpnPaso);
			divRow.appendChild(divCellPaso);

			var divCellImg = document.createElement('div');
			divCellImg.className = 'pure-u-1-3';
			var imgPaso = document.createElement('img');
			var img = document.getElementById("img_foto");
			imgPaso.setAttribute('src', img.getAttribute('src'));
			imgPaso.setAttribute('width', '50%');
			divCellImg.appendChild(imgPaso);
			divRow.appendChild(divCellImg);
	
			var divCellDesc = document.createElement('div');
			divCellDesc.className = 'pure-u-1-3';
			divCellDesc.innerHTML = txtPromt.toUpperCase();
			divRow.appendChild(divCellDesc);
	
			pasos.appendChild(divRow);
		} catch (error) {
			console.log('appendPaso error: ' + error.message)
		}
		
	}

	function setPhoto(results) {
		switch (results.buttonIndex) {
			case 2:
				var txtPromt = results.input1.trim();
				if(txtPromt.length <= 0) {
					Common.notificationAlert(
						'Es necesario proporcionar la descripción del paso',
						'Error',
						'Ok'
					);
				}
				else {
					vPaso++;
					appendPaso(txtPromt);
					if(vPaso>0) {
						oNavigator.EnabledBtnNext();
						oNavigator.SetStepValid(3);						
					}
				}
				break;
		
			default:
				break;
		}		
	}

	function photoReady(imageData) {
		try {
			var img = document.getElementById("img_foto");
			img.setAttribute('src', imageData);
			getFileContentAsBase64(imageData,function(base64Image) {
				//console.log(base64Image); 
			});
			Common.notificationPrompt(
				'Descripción del paso',
				'Pasos',
				['Cancelar','Ok'],
				'',
				setPhoto
			);
		} catch (error) {
			console.log('PhotoReady: ' + error.message)
		}
    }

	function getPhoto_click() {
		x$('#btn_getPhoto').on('click', function() {
            try {
				Common.getPhoto(photoReady);  
            } catch (error) {
                alert(error);
            }
        });
	}

	function servicio_click() {
		x$('#opt-price-label').on('click', function() {
			oNavigator.EnabledBtnNext();
			oNavigator.SetStepValid(2);
		});

		x$('#opt-uva').on('click', function() {
			oNavigator.EnabledBtnNext();
			oNavigator.SetStepValid(2);
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

					x$('#lbl_proveedor_fin').html(pedidoFinded[0].Proveedor);
					x$('#lbl_piezas_fin').html(pedidoFinded[0].Piezas);

					x$('#lbl_piezas_x_maq').html(pedidoFinded[0].Piezas - pedidoFinded[0].Piezas_maq - pedidoFinded[0].Piezas_maquiladas_hoy);
					oNavigator.EnabledBtnNext();
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
	var arrStepValid = [];
	this.Init = init;
	this.SetStepValid = setStepValid;
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

	function setStepValid(step) {
		if(arrStepValid.indexOf(step)<0)
			arrStepValid.push(step);
	}

	function initControls() {
		prevClick();
		nextClick();
	}

	function nextClick() {
		x$('#lnk_sig').on('click', function() {
			x$('#step_' + stepNum).addClass('hidden');
			stepNum ++;
			x$('#step_' + stepNum).removeClass('hidden');
			enabledBtnPrev();
			if(arrStepValid.indexOf(stepNum)<0)
				disabledBtnNext();
			else
				enabledBtnNext();
			
			x$('#lnk_sig').html('SIG >');
			if(stepNum == MaxStep) {
				x$('#lnk_sig').html('FIN');
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