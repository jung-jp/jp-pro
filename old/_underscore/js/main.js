require(['Models/User', 'Router'], function(User, Router){
	
	var users = JSON.parse(localStorage.users);
	
	if( users.length < 1 ) {
		users = [new User('barney'),
	             new User('Cartman'),
	             new User('Sheldon'),
	             ];
		localStorage.users = JSON.stringify(users);
	}
	
	
	Router.startRouting();
});