var CapmaqController = function() {
	
	this.Init = init;
	var arrExistentes;

	function init() {
		arrExistentes = localStorage.getItem('ordenes');
		if(arrExistentes!=null && arrExistentes.length>0) {
			arrExistentes = JSON.parse(arrExistentes);
			init_controls();
		}
		else {
			Common.setEstatusBtn('btn_search_orden','<i class="sprite icon Search"></i>Buscar Orden', true);
			Common.notificationAlert('No existen códigos cargados en el dispositivo, favor de realizar la carga.', 'Advertencia', 'Ok');
		}
	} 

	function init_controls() {
		wizard1 = new Wizard({
			content: 'wizard_1',
			maxStep: 2,
			arrCallBackAnt: [
				disabledStep1
			]
		});
		
		wizard1.open();	
		btn_search_orden_click();
		btn_new_search_click();
	}

	function disabledStep1() {
		wizard1.remStepValid(1);
		wizard1.disabledBtnNext();
	}

	function fillTblServ(data) {
		try {
			var table = document.getElementById("tbody_serv_pasos");
			table.innerHTML = '';
			for(var x in data) {
				var row = table.insertRow(x);
				if(x % 2 != 0)
					row.className = "pure-table-odd";

				var cellTipo = row.insertCell(0);
				var cellRef = row.insertCell(1);
				var cellPieza = row.insertCell(2);

				switch (data[x].Id_servicio) {
					case 1:
						cellTipo.innerHTML = 'Etiqueta';
						break;
					case 2:
						cellTipo.innerHTML = 'NOM';
						break;
					default:
						break;
				}
				cellRef.innerHTML = '<a href="#" id="lnkSerSel_' + data[x].Id + '">' + data[x].Ref2 + '</a>';
				cellPieza.innerHTML = data[x].Piezas;
				cellPieza.setAttribute('align', 'center');

				x$('#lnkSerSel_' + data[x].Id).on('click', function(){
					try {

						var lbl_trafico = document.getElementById('lbl_trafico');
						var lbl_referencia = document.getElementById('lbl_referencia');

						lbl_trafico.innerHTML = '';
						lbl_referencia.innerHTML = '';

						var v_idServ = String(x$(this).attr('id')).split('_')[1] * 1;
						serSelected = ordenFinded[0].PLstOTSer.filter(function (obj) {
							return obj.Id == v_idServ;
						});

						if(serSelected[0].PLstPasos != undefined) {
							wizard1.setStepValid(1);
							wizard1.enabledBtnNext();

							lbl_trafico.innerHTML = serSelected[0].Ref1;
							lbl_referencia.innerHTML = serSelected[0].Ref2;
						} 

					} catch (error) {
						console.log(error.message);						
					}
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	function btn_search_orden_click() {
		x$('#btn_search_orden').on('click', function() {
			try {
				Common.setEstatusBtn('btn_search_orden', 'Buscando orden ...', true);

				var ordenBuscada = String(x$('#txt_orden').attr('value'));
				ordenBuscada = ordenBuscada.toUpperCase();
				ordenFinded = arrExistentes.filter(function (obj) {
					return obj.Folio.toUpperCase() == ordenBuscada;
				});

				if(ordenFinded.length > 0) {
					x$('#div_sel_servicio').removeClass('hidden');
					x$('#div_new_search').removeClass('hidden');
					x$('#div_search_orden').addClass('hidden');
					fillTblServ(ordenFinded[0].PLstOTSer);
				}
				else {
					Common.notificationAlert('El la orden no ha sido encontrada', 'info', 'ok');
				}
				Common.setEstatusBtn('btn_search_orden', '<i class="sprite icon Search"></i>Buscar Orden', false);
			} catch (error) {
				Common.setEstatusBtn('btn_search_orden', '<i class="sprite icon Search"></i>Buscar Orden', false);
			}
		});
	}

	function btn_new_search_click() {
		x$('#btn_new_search').on('click', function() { 
			clear_form();
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