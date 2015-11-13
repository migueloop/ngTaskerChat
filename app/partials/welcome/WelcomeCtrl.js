angular
.module('ChatApp.controllers')
.controller('WelcomeCtrl', WelcomeCtrl);

WelcomeCtrl.$inject = ['$scope', '$firebaseArray',  '$mdDialog', 'LS', '$location'];

function WelcomeCtrl($scope, $firebaseArray,  $mdDialog, LS, $location){
  /* jshint validthis: true */
  var vm = this;  
  $scope.connectedUsers = [];
  
  var ref = new Firebase('https://ng-tasker-chat.firebaseio.com/');
  $scope.connectedUsers = $firebaseArray(ref);

  
   // Welcome dialog
   vm.showSelectAliasAlert = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'app/partials/welcome/pick-alias-dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:false
      })
    };
    
    function DialogController($scope, $mdDialog) {
      $scope.answer = function() {
        //store alias in browser
        LS.setData($scope.currentUser);
        //update users list
        $scope.connectedUsers = $firebaseArray(ref);
        $scope.connectedUsers.$add({
          name: $scope.currentUser
        });
        $mdDialog.hide();
        //redirect to chat
        $location.path("chat");
      };
    };
    
    $scope.init = function init() {
        //load stored data
       /* $scope.currentUser = LS.getData();
            if(!$scope.currentUser){
                vm.showSelectAliasAlert();
            } else{
                $location.path("chat");
              }*/
              
          //check authentication state
          var authData = ref.getAuth();

          var isNewUser = true;

          ref.onAuth(function(authData) {
            if(!authData){
                ref.authWithOAuthPopup("google", function(error, authData) {
               if (error) {
                 console.log("Login Failed!", error);
               } else {
                console.log("authenticated redirecting");
                $location.path("chat");
               }
               }); 
            }
            if (authData) {
              if(isNewUser){
              // save the user's profile into the database so we can list users,
              // use them in Security and Firebase Rules, and show profiles
                ref.child("users").child(authData.uid).set({
                  provider: authData.provider,
                  name: getName(authData)
                });
              }
              $location.path("chat");
            }
        });
      };

    // find a suitable name based on the meta info given by each provider
    function getName(authData) {
      switch(authData.provider) {
       case 'password':
       return authData.password.email.replace(/@.*/, '');
       case 'google':
       return authData.google.displayName;
       case 'facebook':
       return authData.facebook.displayName;
     }
   };

 };
