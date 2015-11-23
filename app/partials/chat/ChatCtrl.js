angular.module('ChatApp.controllers').controller('ChatCtrl', ChatCtrl);

function ChatCtrl($scope, $firebaseArray,  $mdDialog, LS){

$scope.connectedUsers = [];
 
  var ref = new Firebase('https://ng-tasker-chat.firebaseio.com/');
  $scope.messages = $firebaseArray(ref);
  $scope.connectedUsers = $firebaseArray(ref);
  
 
  var vm = this;
   
   $scope.addMessage = function(msg){
     $scope.messages.$add({
      text: msg.text,
      author: $scope.currentUser
    });
   };
   
   // Welcome dialog
    $scope.showSelectAliasAlert = function(ev) {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'pick-alias-dialog.tmpl.html',
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
      };
    };
    
    
    /*//executed when user leaves the page
   $scope.$on('$locationChangeStart', function( event ) {
      var answer = confirm("Are you sure you want to leave this page?")
      if (!answer) {
          event.preventDefault();
      }
    }); */
    
    $scope.init = function () {
      //load stored data
    $scope.currentUser = LS.getData();
      if(!$scope.currentUser){
          $scope.showSelectAliasAlert();
      }  
    };
}