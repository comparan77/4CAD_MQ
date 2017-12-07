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
}