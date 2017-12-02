var CADController = function() {
    this.Create = create;

    function create(type){
        var obj;
        try {
            if (type === "login") {
                obj = new Login();
            } else if (type === "inicio") {
                obj = new Inicio();
            } else if (type === "carcod") {
                obj = new CarcodController();
            } else if (type === "capmaq") {
                obj = new CapmaqController();
            } else if (type == "desmaq") {
                obj = new DesmaqController();
            }
            x$('#div_' + type).xhr('./' + type + '.html', {
                async: true,
                callback: function() { 
                    x$('#div_' + type).html(this.responseText);
                    obj.Init();
                },
            });
        } catch (error) {
            console.log(error);
        }
        
    }
}