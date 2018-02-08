var ConfigController = function() {
    this.Init = init;
    var txt_url;
    var btn_save;
    var lbl_chk_produccion;
    var chk_produccion;

    function initControles() {
        txt_url = document.getElementById('txt_url');
        btn_save = document.getElementById('btn_save');
        txt_url.value = urlHandler;
        lbl_chk_produccion = document.getElementById('lbl_chk_produccion');
        chk_produccion = document.getElementById('chk_produccion');        

        chk_produccion.checked = urlHandler == URL_PROD;
        isProduction(chk_produccion.checked);

        btn_save_click();
        chk_produccion_click();
    }

    function init() {
        ConfigController.readUrlHandler(function(data) {
            urlHandler = data;
            initControles();
        });
    }

    function btn_save_click() {
        btn_save.addEventListener('click', function() {
            
            ConfigController.writeUrlHandler(txt_url.value, function() {
                Common.notificationAlert('La configuración se ha guardado correctamente.', 'Info', 'Ok'); 
            });
        });
    }

    function chk_produccion_click() {
        chk_produccion.addEventListener('click', function() {
            if(this.checked) {
                isProduction(true);
                ConfigController.writeUrlHandler(URL_PROD, function() {
                    Common.notificationAlert('La configuración se ha guardado correctamente.', 'Info', 'Ok'); 
                })
            }
            else {
                isProduction(false);
            }
        });
    }

    function isProduction(isProd) {
        if(isProd) {
            lbl_chk_produccion.innerHTML = 'Producción';
            x$('#lbl_chk_produccion').addClass('selected');
            x$('#div_conf_url').addClass('hidden');
        }
        else {
            lbl_chk_produccion.innerHTML = 'Otro';            
            x$('#lbl_chk_produccion').removeClass('selected');
            x$('#div_conf_url').removeClass('hidden');
        }
    }
}

ConfigController.writeUrlHandler = function(url, callback) {
    Common.CreateFile('urlHandler.txt', false, function(obj) {
        Common.writeFile(obj, url, false, function() {
             //console.log('grabada la url');
             //Common.notificationAlert('La configuración se ha guardado correctamente.', 'Info', 'Ok');
             if(callback) callback();
        });
    });
}

ConfigController.readUrlHandler = function(callback) {
    Common.CreateFile('urlHandler.txt', false, function(obj) { 
        return Common.readFile(obj, function(result) {
            //console.log(result);
            // urlHandler = result;
            if(callback) callback(result);
        });
    });
}