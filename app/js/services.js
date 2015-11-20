'use strict';

/* Services */

angular.module('ChatApp.services', [])

    /*
     Local storage 
    */
  .factory("LS", function($window, $rootScope) {
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
})
.factory("Auth", function(){
  var user;
  var ref = new Firebase('https://ng-tasker-chat.firebaseio.com/');
  var authData = ref.getAuth();
  return{
      setUser : function(aUser){
          user = aUser;
      },
      isLoggedIn : function(){
        if(authData){
          return true;
        }else{
          return false;
        }
      },
      logout : function(){
        ref.unauth();
      }
    }
});