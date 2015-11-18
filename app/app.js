'use strict';

angular.module('ChatApp', ['ChatApp.services','ChatApp.controllers', 'ngRoute', 'ngMaterial', 'firebase', 'luegg.directives', 'ui.gravatar'])
.config(['$routeProvider', function($routeProvider) {
  /*configure theme*/
  //$mdThemingProvider.theme('default').dark();
  /*configure route provider*/  
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
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('blue-grey')
    .warnPalette('green')
    .backgroundPalette('blue-grey')
    .dark();
});


;