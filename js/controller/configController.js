var ConfigController = function() {
    this.Init = init;
    var txt_url;
    var btn_save;
    var lbl_chk_produccion;

    function initControles () {
        txt_url = document.getElementById('txt_url');
        btn_save = document.getElementById('btn_save');
        txt_url.value = urlHandler;
        lbl_chk_produccion = document.getElementById('lbl_chk_produccion');

        btn_save_click();
        chk_produccion_click();
    }

    function init() {
        initControles();
    }

    function btn_save_click() {
        btn_save.addEventListener('click', function() {
            urlHandler = txt_url.value;
            localStorage.setItem('urlHandler', urlHandler);
            Common.notificationAlert('La configuración se ha guardado correctamente.', 'Info', 'Ok');
        });
    }

    function chk_produccion_click() {
        document.getElementById('chk_produccion').addEventListener('click', function() {
            
            if(this.checked) {
                lbl_chk_produccion.innerHTML = 'Producción';
                x$('#lbl_chk_produccion').addClass('selected');
                x$('#div_conf_url').addClass('hidden');
                localStorage.setItem('urlHandler', URL_PROD);
            }
            else {
                x$('#lbl_chk_produccion').removeClass('selected');
                x$('#div_conf_url').removeClass('hidden');
            }
        });
    }
}