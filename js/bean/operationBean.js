/**Orden de trabajo */
var Bean_orden_trabajo = function(id, folio, referencia, fecha) {
    this.Id = id;
    this.Folio = folio;
    this.Referencia = referencia;
    this.Fecha = fecha;
    this.PLstOTSer;
}

var Bean_orden_trabajo_servicio = function(id, id_orden_trabajo, id_servicio, piezas, ref1, ref2) {
    this.Id = id;
    this.Id_orden_trabajo = id_orden_trabajo;
    this.Id_servicio = id_servicio;
    this.Piezas = piezas;
    this.Ref1 = ref1;
    this.Ref2 = ref2;
    this.PEntLiv;
    this.PLstMaq = [];
    this.PLstPasos = [];
}

var Bean_orden_trabajo_servicio_paso = function(id_orden_trabajo, id_servicio, foto64) {
    this.Id_orden_trabajo = id_orden_trabajo;
    this.Id_servicio = id_servicio;
    this.Foto64 = foto64;
}

var Bean_orden_trabajo_ser_maq = function(id, id_servicio, id_ord_tbj_srv, fecha, piezas, capturada) {
    this.Id = id;
    this.Id_servicio = id_servicio;
    this.Id_ord_tbj_srv = id_ord_tbj_srv;
    this.Fecha = fecha;
    this.Piezas = piezas;
    this.Capturada = capturada;
}

/**Entrada Auditoria Mercancia */
var BeanEntrada_liverpool = function (id, id_entrada, proveedor, trafico, pedido, piezas, fecha_confirma, piezas_maq, fecha_maquila, num_pasos) {
    this.Id = id;
    this.Id_entrada = id_entrada;
    this.Proveedor = proveedor;
    this.Trafico = trafico;
    this.Pedido = pedido;
    this.Piezas = piezas;
    this.Fecha_confirma = fecha_confirma;
    this.Piezas_maq = piezas_maq;
    this.Fecha_maquila = fecha_maquila;
    this.Piezas_maquiladas_hoy = 0;
    this.Num_pasos = num_pasos;
    this.PLstMaquila;
}

var BeanEntrada_liverpool_maquila = function (id, id_entrada_liverpool, piezas, fecha_maq) {
    this.Id = id;
    this.Id_entrada_liverpool = id_entrada_liverpool;
    this.Piezas = piezas;
    this.Fecha_maq = fecha_maq;
    this.PEntLivSer;
}

var BeanEntrada_liverpool_servicio = function (id, id_liverpool_maquila, id_servicio) {
    this.Id = id;
    this.Id_liverpool_maquila = id_liverpool_maquila;
    this.Id_servicio = id_servicio;
}