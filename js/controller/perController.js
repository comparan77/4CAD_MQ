var oBeanPerFoto;
var PerController = function() {
    this.Init = init;

    function init() {
        initControls();
    }

    function initControls() {
        btn_capturePhoto_Click();
        btn_save_Click();
    }

    function photoReady(imageData) {
        var img = '<img class="pure-img" src="data:image/jpeg;base64,' + imageData + '" >';
        x$('#div_foto').html('');
        x$('#div_foto').html('top', '<div id="photo" class="pure-u-1-2"><div class="l-box">' + img + '</div></div>');
        x$('#photo').on('click', function(){
            confirmDeletePhoto(this);
        });
        oBeanPerFoto = new BeanPerFoto(imageData, oUsuario.Id);
    }

    function btn_capturePhoto_Click() {
        x$('#btn_capturePhoto').on('click', function() {
            try {
                Common.capturePhoto(photoReady);  
            } catch (error) {
                alert(error);
            }
        });
    }

    function btn_save_Click() {
        x$('#btn_save').on('click', function() {
             Common.setEstatusBtn('btn_save', 'Guardando', true);
             try {
                OperationModel.PerFotoAdd(oBeanPerFoto, function(data) {
                    // if(typeof(data)=="object") {
                    //     Common.notificaRegExitoso();  
                    //     window.open(urlHandler + 'rpt/salidas_aud/' + data.Referencia + '/' + data.prefixImg + 'casc028.pdf?' + new Date().getTime(), '_system', 'location=yes');
                    // }
                    // else {
                    //     alert(data);
                    // }
                    Common.setEstatusBtn('btn_save', 'Guardar', false);
                    //clearFormValues();                    
                });
            } catch (error) {
                alert(error);
            }
        });
    }
}