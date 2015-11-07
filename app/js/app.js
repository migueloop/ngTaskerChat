'use strict';

angular.module('ChatApp', ['ChatApp.services','ChatApp.controllers', 'ngRoute', 'ngMaterial', 'firebase', 'luegg.directives', 'ui.gravatar'])
.config(['$routeProvider', function($routeProvider) {
  /*configure theme*/
  //$mdThemingProvider.theme('default').dark();
  /*configure route provider*/  
  $routeProvider
  .when("/", {
	    templateUrl: "app/partials/welcome/welcome.html", 
	    template: "welcome",
	    controller: "WelcomeCtrl",
  	  controllerAs:"vm"
	  })
	  .when("/chat", {
  	  templateUrl: "app/partials/chat/chat.html",
  	  template: "chat",
  	  controller: "ChatCtrl",
  	  controllerAs:"vm"
  	})
  	.otherwise({
  	  redirectTo: '/'
  	});
}]);