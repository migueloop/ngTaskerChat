angular
.module('ChatApp.controllers')
.controller('ChatCtrl', ChatCtrl);

ChatCtrl.$inject = ['$scope', '$firebaseArray', 'Auth'];

function ChatCtrl($scope, $firebaseArray , Auth){

  $scope.getMessages = function() {
    // create a query for the most recent 25 messages on the server
    var query = messagesRef.orderByChild("timestamp").limitToLast(25);
    return $firebaseArray(query);
   };

   $scope.addMessage = function(msg){
     $scope.messages.$add({
      text: msg.text,
      author: Auth.getUser()
    });
   };

  var messagesRef = new Firebase('https://ng-tasker-chat.firebaseio.com/messages');
  var usersRef = new Firebase('https://ng-tasker-chat.firebaseio.com/users');
  
  $scope.users = $firebaseArray(usersRef);
  $scope.$messages = $scope.getMessages();


}