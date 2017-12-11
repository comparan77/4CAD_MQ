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
}