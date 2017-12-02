/**Entrada Auditoria Mercancia */
var BeanEntrada_liverpool = function (id, id_entrada, proveedor, trafico, pedido, piezas, fecha_confirma, piezas_maq, fecha_maquila) {
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
}
//**Entrada Auditoria Mercancia Fotos */
var BeanEntrada_aud_mer_files = function(path) {
    this.Id = 0;
    this.Id_entrada_aud_mer = 0;
    this.Path = path;
}
//**Entrada Auditoria Unidades */
var BeanEntrada_aud_uni = function (id_entrada_precarga, id_transporte_tipo, referencia, operador, placa, caja, caja1, caja2, sello, sello_roto, acta_informativa, vigilante, lst_files) {
    this.PUsuario = oUsuario;
    this.Id = 0;
    this.Id_entrada_pre_carga = id_entrada_precarga;
    this.Id_transporte_tipo = id_transporte_tipo;
    this.Informa = oUsuario.Nombre;
    this.Referencia = referencia;
    this.Operador = operador;
    this.Placa = placa;
    this.Caja = caja;
    this.Caja1 = caja1;
    this.Caja2 = caja2;
    this.Sello = sello;
    this.Sello_roto = sello_roto;
    this.Acta_informativa = acta_informativa;
    this.Fecha = '01/01/0001';
    this.Vigilante = vigilante;
    this.PLstEntAudUniFiles = lst_files;
}
//**Entrada Auditoria Unidades Fotos */
var BeanEntrada_aud_uni_files = function(path) {
    this.Id = 0;
    this.Id_entrada_aud_uni = 0;
    this.Path = path;
}
/** @description Salida Auditoria Unidades 
 * @param  {number} id_salida_orden_carga
 * @param  {number} id_transporte_tipo
 * @param  {string} referencia
 * @param  {string} operador
 * @param  {string} placa
 * @param  {string} caja
 * @param  {string} caja1
 * @param  {string} caja2
 * @param  {string} sello
 * @param  {string} acta_informativa
 * @param  {string} vigilante
 * @param  {object} lst_files
 */
var BeanSalida_aud_uni = function (id_salida_orden_carga, id_transporte_tipo, referencia, operador, placa, caja, caja1, caja2, sello, acta_informativa, vigilante, lst_files) {
    this.PUsuario = oUsuario;
    this.Id = 0;
    this.Id_salida_orden_carga = id_salida_orden_carga;
    this.Id_transporte_tipo = id_transporte_tipo;
    this.Informa = oUsuario.Nombre;
    this.Referencia = referencia;
    this.Operador = operador;
    this.Placa = placa;
    this.Caja = caja;
    this.Caja1 = caja1;
    this.Caja2 = caja2;
    this.Sello = sello;
    this.Acta_informativa;
    this.Fecha = '01/01/0001';
    this.Vigilante;
    this.PLstSalAudUniFiles = lst_files;
}
/** @description Salida Auditoria Unidades Fotos
 * @param  {string} path
 */
var BeanSalida_aud_uni_files = function(id, path) {
    this.Id = id;
    this.Id_salida_aud_uni = 0;
    this.Path = path;
}