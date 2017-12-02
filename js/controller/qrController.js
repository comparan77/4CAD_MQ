var QrController = function() {
    this.Init = init;

    function init() {
        initControls();
    }

    function initControls() {
        x$('#bth_init_scan').on('click', function() {
            //lanza el escaneo
            scanear();
        });
    }

    function scanear(){
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                var oBeanPerQRPivote = new BeanPerQRPivote(result.text, oUsuario.Id);
                OperationModel.asignaQRPivote(oBeanPerQRPivote, function(data) {
                    x$('#lbl_folio').html(data.Idf);
                });
            },
            function (error) {
                Common.notificationAlert(error, 'Fallo escaneo', 'Ok');
            }
        );
    };
}