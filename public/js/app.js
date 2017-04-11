(function(){

	var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  firebase.initializeApp(config);

var app=angular.module('app',['firebase','ngRoute','ui.tree','ngGeolocation']);


app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
	
	$routeProvider.when('/', {
	   	templateUrl:'login/login.html',
	   	controller:'loginCtrl',
	   	controllerAs:'loginCtl'

	   })
	.when('/login', {
	   	templateUrl:'login/login.html',
	   	controller:'loginCtrl',
	   	controllerAs:'loginCtl'

	   })
	.when('/signup', {
	   	templateUrl:'login/Signup.html',
	   	controller: 'loginCtrl',
	   	controllerAs:'loginCtrl'

	   })
	.when('/home', {
	   	templateUrl:'home/home.html',
	   	controller: 'homeCtrl',
	   	controllerAs:'homeCtrl'

	   })
	.when('/resetpassword', {
	   	templateUrl:'login/resetpassword.html',
	   	controller: 'ResetpasswordCtrl',
	   	controllerAs:'ResetpasswordCtrl'

	   })
	.otherwise({redirectTo:'/'});

}]);

/*app.controller('MyCtrl', function($firebaseObject){
	const rootRef = firebase.database().ref().child('angular');
	const ref = rootRef.child('object');
	this.object= $firebaseObject(ref);
});*/
	
}());
