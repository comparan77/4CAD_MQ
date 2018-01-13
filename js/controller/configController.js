var ConfigController = function() {
    this.Init = init;
    var txt_url;
    var btn_save;

    function initControles () {
        txt_url = document.getElementById('txt_url');
        btn_save = document.getElementById('btn_save');
        txt_url.value = urlHandler;

        btn_save_click();
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
}