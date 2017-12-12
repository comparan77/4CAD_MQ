var RegPasController = function() {
	
	this.Init = init;
	var arrExistentes;
	var ordenFinded;
	var serSelected;
	var wizard1;
	var vPaso = 0;

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
		try {
			wizard1 = new Wizard({
				content: 'wizard_1',
				maxStep: 2
			});
			wizard1.open();	

			btn_search_orden_click();
		} catch (error) {
			console.log('error wizard: ' + error.message);
		}
		
		btn_new_search_click();
		// oNavigator.Init(4);
		// btn_search_trafico_click();
		// btn_search_pedido_click();
		
		// servicio_click();
		
		// getPhoto_click();

		// btn_save_click();
		// div_new_search_click();
	}

	function clear_form() {
		oCADController.Create('regpas');
	}

	function btn_new_search_click() {
		x$('#btn_new_search').on('click', function() { 
			clear_form();
		});
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
						var v_idServ = String(x$(this).attr('id')).split('_')[1] * 1;
						serSelected = ordenFinded[0].PLstOTSer.filter(function (obj) {
							return obj.Id == v_idServ;
						});
						
						wizard1.setStepValid(1);
						wizard1.enabledBtnNext();
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
					alert('adios');
				}
				Common.setEstatusBtn('btn_search_orden', '<i class="sprite icon Search"></i>Buscar Orden', false);
			} catch (error) {

				Common.setEstatusBtn('btn_search_orden', '<i class="sprite icon Search"></i>Buscar Orden', false);
			}
		});
	}
}