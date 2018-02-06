var Menu = function() {
	this.Init = init;
	
	function init(){
		oCADController.Create(menuAct);
		// x$('#menu').removeClass('hidden');
		x$('#div_' + menuAct).removeClass('hidden');
		// x$('#lnkMenu').click(function() { 
		// 	document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
		// }); 
		
		var opts = x$('li').has('.optMenu');
		for (var index = 0; index < opts.length; index++) {
			var element = opts[index];
			x$(element).find('a').click(function(){
				menuSel = String(x$(this).attr('id')).split("_")[1];
				if(menuAct != menuSel) 
				{
					x$('#div_' + menuAct).addClass('hidden');
					x$('#div_' + menuAct).html('');
					removeActive(menuSel);
					x$('#div_' + menuSel).removeClass('hidden');
					x$(this).addClass('active');
					oCADController.Create(menuSel);
				}
				else {
					oCADController.Create(menuSel);
				}
				closeNav();
				// x$('#lnkNav').html('- ' + x$(this).html());
				// document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
			});
		}	
	}

	function removeActive(menuSel) {
		
		if(menuAct != menuSel) 
		{
			x$('#lnk_' + menuAct).removeClass('active');
			menuAct = menuSel;
		}
		// x$('#lnkNav').html('');
	}
}