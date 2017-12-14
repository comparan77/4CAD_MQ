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

OperationModel.maquila_addLst = function(obj, callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=maquila&opt=addLst';
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