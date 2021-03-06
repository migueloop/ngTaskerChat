angular
.module('ChatApp.controllers')
.controller('SessionCtrl', SessionCtrl);

SessionCtrl.$inject = ['$scope', 'LS', '$location' , 'Auth'];

function SessionCtrl($scope,LS, $location , Auth) {
 /* jshint validthis: true */
 var vm = this;  
 var ref = new Firebase('https://ng-tasker-chat.firebaseio.com/');
 $scope.login = function () {
  ref.authWithOAuthPopup("google", function(error, authData) {
    if (error) {
      console.log(error);
    }else{
      Auth.setUser(authData.auth);
      location.reload();
    }
   });
  };

  $scope.logout = function () {
    Auth.logout();
    $location.path("/");
  };

}