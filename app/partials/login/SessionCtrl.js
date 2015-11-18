angular
.module('ChatApp.controllers')
.controller('SessionCtrl', SessionCtrl);

SessionCtrl.$inject = ['$scope', '$firebaseArray',  '$mdDialog', 'LS', '$location'];

function SessionCtrl($scope, $firebaseArray,  $mdDialog, LS, $location) {

 /* jshint validthis: true */
 var vm = this;  
 var ref = new Firebase('https://ng-tasker-chat.firebaseio.com/');
 var authData = ref.getAuth();
 

 ref.onAuth(function(authData) {
  if (authData) {
    $location.path("chat");
  }
});

 $scope.login = function () {
  ref.authWithOAuthPopup("google", function(error, authData) {
    if (error) {
      console.log(error);
    }else{
      location.reload();
    }
  });
};

  $scope.logout = function () {
    ref.unauth();
    $location.path("/");
  };
}