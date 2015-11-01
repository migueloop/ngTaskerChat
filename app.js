var app = angular.module('StarterApp', ['ngMaterial', 'firebase','luegg.directives', 'ui.gravatar']);

app.controller('AppController', function($mdSidenav, $scope, $firebaseArray,  $mdDialog, LS) {
  
 $scope.connectedUsers = [];
 
  var ref = new Firebase('https://ng-tasker-chat.firebaseio.com/');
  $scope.messages = $firebaseArray(ref);
  $scope.connectedUsers = $firebaseArray(ref);
  
 
  var vm = this;
  vm.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
   
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
        clickOutsideToClose:true
      })
    };
    
    function DialogController($scope, $mdDialog) {
      $scope.answer = function() {
        LS.setData($scope.currentUser);
        $mdDialog.hide();
      };
    };
    
    
    //executed when user leaves the page
   $scope.$on('$locationChangeStart', function( event ) {
      var answer = confirm("Are you sure you want to leave this page?")
      if (!answer) {
          event.preventDefault();
      }
    }); 
    
    $scope.init = function () {
      //load stored data
    $scope.currentUser = LS.getData();
      if(!$scope.currentUser){
          $scope.showSelectAliasAlert();
      }  
    };
});


/*
This directive allows us to pass a function in on an enter key to do what we want.
 */
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

/*
 Local storage 
*/
app.factory("LS", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'my-storage') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('my-storage', val);
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('my-storage');
    }
  };
});