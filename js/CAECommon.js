
/**Control de multiples llamadas asincronas */
var MyRequestsCompleted = (function() {
    var numRequestToComplete, requestsCompleted, callBacks, singleCallBack;

    return function(options) {
        if (!options) options = {};
        
        numRequestToComplete = options.numRequest || 0;
        requestsCompleted = options.requestsCompleted || 0;
        callBacks = [];

        var fireCallbacks = function() {
            //alert("we're all complete");
            for (var i = 0; i < callBacks.length; i++) callBacks[i]();
        };
        if (options.singleCallback) callBacks.push(options.singleCallback);

        this.addCallbackToQueue = function(isComplete, callback) {
            if (isComplete) requestsCompleted++;
            if (callback) callBacks.push(callback);
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.requestComplete = function(isComplete) {
            if (isComplete) requestsCompleted++;
            if (requestsCompleted == numRequestToComplete) fireCallbacks();
        };
        this.setCallback = function(callback) {
            callBacks.push(callBack);
        };
    };
})();

function Common() {}

Common.fetchJSONFile = function (path, callback, error, type, jsonData) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.open(type, path, true);
    httpRequest.setRequestHeader("Content-type", "application/json");    
    
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            } else {
                if(error) error(httpRequest.status);
            }
        }
    };
    httpRequest.send(jsonData);
} 

/**Cambia el estado de un boton mientras se ejecutan las llamadas asincronas */
Common.setEstatusBtn = function(element, text, disabled) {
    if(disabled) {
        if(typeof(element)==='string')
            x$('#' + element).html(text).attr('disabled','disabled');
        else {
            element.setAttribute('disabled', 'disabled');
            element.innerHTML = text;
        }
    }
    else {
        if(typeof(element)==='string') {
            x$('#' + element).html(text);
            document.getElementById(element).removeAttribute('disabled');
        }
        else {
            element.removeAttribute('disabled');
            element.innerHTML = text;
        }
    }
}
 

/**Devuelve el valor buscado de un json por ejemplo */
Common.getValueByKey = function (key, data) {
    var i, len = data.length;
    
    for (i = 0; i < len; i++) {
        if (data[i] && data[i].hasOwnProperty(key)) {
            return data[i][key];
        }
    }
    
    return -1;
}

/**Gif para ajax loading */
Common.loadAjax = function(state) {
    state ? x$('#divLoading').removeClass('hidden') : x$('#divLoading').addClass('hidden');
}

/**Llena un select  */
Common.fillDropDownList = function (ddl, data, firstOpt) {
    var opts = '';
    x$('#' + ddl).html('');
    if(typeof(firstOpt)==='string') {
        opts+= '<option value=0>' + firstOpt + '</option>';
    }
    for(var x in data) {
        opts+= '<option value=' + data[x].Id + '>' + data[x].Nombre + '</option>';
    }
    x$('#' + ddl).html('inner',opts);
}

/**Funciones para la camra */
Common.capturePhoto = function(onSuccess) {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true,
        targetWidth: 1000,
        targetHeight: 1000
    });
}

Common.getPhoto = function (onSuccess) {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM 
    });
}

function onPhotoURISuccess(imageURI) {
    document.getElementById("foto").style.backgroundImage="url('"+imageURI+"')";
    document.getElementById("foto").style.backgroundSize="100% 100%";
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function getFileContentAsBase64(path,callback) {
    window.resolveLocalFileSystemURL(path, gotFile, fail);
            
    function fail(e) {
          alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                   var content = this.result;
                   callback(content);
              };
              // The most important point, use the readAsDatURL Method from the file plugin
              reader.readAsDataURL(file);
           });
    }
}

/**Notificaciones */
Common.notificationAlert = function (msg, title, buttonName, alertDismissed) {
    navigator.notification.alert(
        msg,            // message
        alertDismissed, // callback
        title,          // title
        buttonName      // buttonName
    );
} 

Common.notificationConfirm = function (msg, title, buttonName, onConfirm) {
    navigator.notification.confirm(
        msg,                    // message
        onConfirm,              // callback return buttonindex function onConfirm(buttonindex)
        title,                  // title
        buttonName              // buttonName ['Reiniciar','Salir']
    );
} 

Common.notificationPrompt = function (msg, title, buttonName, defaultText, onPrompt) {
    navigator.notification.prompt(
        msg,            // message
        onPrompt,       // callback to invoke return buttonindex like notificationConfirm
        title,          // title
        buttonName,     // buttonLabels
        defaultText     // defaultText
    );
} 

Common.notificationBeep = function () {
    navigator.notification.beep(2);
}

/**Notificaciones CRUD */
Common.notificaRegExitoso = function() {
    Common.notificationAlert('Registro Exitoso', 'Registro de Información', 'Ok');
}

/**Conectividad */
Common.checkConnection = function() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Conexion desconocida';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = 'Conexion 2G';
    states[Connection.CELL_3G]  = 'Conexion 3G';
    states[Connection.CELL_4G]  = 'Conexion 4G';
    states[Connection.CELL]     = 'Conexion genérica';
    states[Connection.NONE]     = 'Sin conexión';

    var result = {
        tipo: networkState,
        descripcion: states[networkState]
    }
    return result;
}