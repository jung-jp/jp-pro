define(function(){
	var routers = [{hash:'#list', controller:'ListController'},
	               {hash:'#add', controller:'AddController'}]
	var defaultRoute = '#list';
	var currentHash = '';
	
	function startRouting(){		
		window.location.hash = window.location.hash || defaultRoute;
		setInterval(hashCheck, 100);		
	}
	
	function hashCheck(){
		
		if( window.location.hash != currentHash){
			for( var i = 0, currentRoute; currentRoute = routers[i++];) {
				if( window.location.hash == currentRoute.hash )
					loadController(currentRoute.controller);				
			}
			currentHash = window.location.hash;
		}
	}
	
	function loadController(controllerName) {		
		require(['Controllers/'+controllerName], function(controller){
			controller.start();
		});
	}
	
	return {
		startRouting:startRouting
	};
	
});