function OperationModel() {}

OperationModel.carga_ordenes_trabajo = function(callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=orden_trabajo&opt=getOrdenes';
    try {
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            }, 
            'GET'
        );
    } catch (error) {
        alert(error);
    }
}

OperationModel.carga_maquila_Liverpool = function(obj, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=entrada_liverpool&opt=subirMaquila';
    try {
        Common.fetchJSONFile(
            url, 
            function(data) {
                callback(data);
            }, 
            'POST',
            JSON.stringify(obj)
        );
    } catch (error) {
        console.log(error.message);
    }
}