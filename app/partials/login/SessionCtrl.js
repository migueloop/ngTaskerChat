chatApp.controller('SessionCtrl', function ($scope, $location, auth, store) {
  $scope.auth = auth;

  $scope.go = function (target) {
    $location.path(target);
  };

  var saveUserInfo = function(profile, token) {
    store.set('profile', profile);
    store.set('token', token);
  }

  $scope.signup = function() {
    auth.signup({popup:  true, auto_login: false})
      .then(function(profile, id_token) {
        saveUserInfo(profile, id_token);
        $location.path('/');

      })
  }

  $scope.reset = function () {
    auth.reset({}, function () {
        // TODO Handle when login succeeds
        console.log("OK");
      }, function () {
        console.log("FAIL");
        // TODO Handle when login fails
      });
  };
  $scope.login = function () {
       auth.signin({}, function (profile, id_token) {
          saveUserInfo(profile, id_token);
          $location.path('/');
        }, function () {
          // TODO Handle when login fails
        });
  };

 $scope.logout = function () {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
     };
});