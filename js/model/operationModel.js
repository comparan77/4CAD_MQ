function OperationModel() {}

OperationModel.carga_pedidos_Liverpool = function(callback) {
    var url = urlHandler + 'handlers/CAEApp.ashx?op=entrada_liverpool&opt=getCodigosPendientes';
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

OperationModel.asignaQRPivote = function(obj, callback) {
    var url = urlHandler + 'handlers/AccesoPersonal.ashx?op=qrpivote&opt=add';
    try {
        Common.fetchJSONFile (
            url,
            function(data) {
                callback(data);
            },
            'POST',
            JSON.stringify(obj)
        );
    } catch (error) {
        alert('asignaQRPivote' + error);
    }
}

OperationModel.PerFotoAdd = function(obj, callback) {
    var url = urlHandler + 'handlers/AccesoPersonal.ashx?op=perfoto&opt=add';
    try {
        Common.fetchJSONFile (
            url,
            function(data) {
                callback(data);
            },
            'POST',
            JSON.stringify(obj)
        );
    } catch (error) {
        alert('PerFotoAdd' + error);
    }
}