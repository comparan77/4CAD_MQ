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

		var txt_orden = document.getElementById('txt_orden');
			var txt_orden_mask = document.getElementById('txt_orden_mask');
			txt_orden.addEventListener('keyup', function() {
				txt_orden_mask.value = txt_orden.value.replace(/\D/g,'').substring(0, 8);
				txt_orden.value = txt_orden_mask.value.replace(/(\d{6})(\d{2})/,"OT-$1-$2");
			});

		wizard1 = new Wizard({
			content: 'wizard_2',
			maxStep: 2,
			arrCallBackAnt: [
				disabledStep1
			]
		});
		
		wizard1.open();	
		btn_search_orden_click();
		btn_new_search_click();
		btn_save_maquila_click();
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

						wizard1.remStepValid(1);
						wizard1.disabledBtnNext();

						var lbl_trafico = document.getElementById('lbl_trafico');
						var lbl_referencia = document.getElementById('lbl_referencia');
						var lbl_no_pasos = document.getElementById('lbl_no_pasos');
						var lbl_piezas_sol = document.getElementById('lbl_piezas_sol');
						var lbl_piezas_x_maq = document.getElementById('lbl_piezas_x_maq');
						var lbl_etiqueta_tipo = document.getElementById('lbl_etiqueta_tipo');

						lbl_trafico.innerHTML = '';
						lbl_referencia.innerHTML = '';
						lbl_no_pasos.innerHTML = '';
						lbl_piezas_sol.innerHTML = '';
						lbl_piezas_x_maq.innerHTML = '';
						lbl_etiqueta_tipo.innerHTML = '';

						var v_idServ = String(x$(this).attr('id')).split('_')[1] * 1;
						serSelected = ordenFinded[0].PLstOTSer.filter(function (obj) {
							return obj.Id == v_idServ;
						});
						if(serSelected[0].PLstPasos != undefined)
							if(serSelected[0].PLstPasos.length > 0) {
								wizard1.setStepValid(1);
								wizard1.enabledBtnNext();

								lbl_trafico.innerHTML = serSelected[0].Ref1;
								lbl_referencia.innerHTML = serSelected[0].Ref2;
								lbl_no_pasos.innerHTML = serSelected[0].PLstPasos.length;
								lbl_piezas_sol.innerHTML = serSelected[0].Piezas;
								lbl_piezas_x_maq.innerHTML = serSelected[0].Piezas - serSelected[0].PiezasMaq;
								lbl_etiqueta_tipo.innerHTML = serSelected[0].PEtiquetaTipo.Nombre;
								//console.log(serSelected[0].PLstMaq[0].Fecha);
							} else {
								Common.notificationAlert('Es necesario realizar el registro de pasos para el servicio seleccionado', 'info', 'ok');
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

	function btn_save_maquila_click() {
		x$('#btn_save_maquila').on('click', function() { 
			try {
				var d = new Date();
				var objMaq = new Bean_maquila (
					0,
					serSelected[0].Id,
					d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(),
					String(x$('#txt_pieza_maq').attr('value')) * 1,
					false
				);
				serSelected[0].PLstMaq = [];
				serSelected[0].PLstMaq.push(objMaq);

				Common.setEstatusBtn('btn_save', 'Guardando maquila ...', true);
				Common.notificationAlert('La maquila ha sido guardada correctamente.', 'Info', 'Ok');
				localStorage.setItem('ordenes', JSON.stringify(arrExistentes));
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