'use strict';

angular.module('ChatApp', ['ChatApp.services','ChatApp.controllers', 'ngRoute', 'ngMaterial', 'firebase', 'luegg.directives', 'ui.gravatar'])
.config(['$routeProvider', function($routeProvider) {
  /* configure route provider */  
  $routeProvider
  .when("/", {
	    templateUrl: "app/partials/welcome/welcome.html", 
	    controller: "WelcomeCtrl"
    })
	  .when("/chat", {
  	  templateUrl: "app/partials/chat/chat.html",
  	  controller: "ChatCtrl"
  	})
  	.otherwise({
  	  redirectTo: '/'
  	});
}])
.run(['$rootScope', '$location' ,'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {
      console.log("check if user is logged " + Auth.isLoggedIn());
      if (!Auth.isLoggedIn()) {
         $location.path("/chat");
       }else{
         /* event.preventDefault();*/
          $location.path("/");
       }
    });
}])
  /* configure theme */
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('blue-grey')
    .warnPalette('green')
    .backgroundPalette('blue-grey')
    .dark();
});


;