console.log("connected!");

var hustleApp = angular.module('hustleApp', ['ngRoute']);


hustleApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/partials/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/profiles', {
        templateUrl: 'views/partials/profiles.html',
        controller: 'ProfileController',
        controllerAs: 'profiles'
      })
      .when('/projects', {
        templateUrl: 'views/partials/projects.html',
        controller: 'ProjectController',
        controllerAs: 'projects'
      })
      .when('/my-profile', {
        templateUrl: 'views/partials/my-profile.html',
        controller: 'MyProfileController',
        controllerAs: 'mp'
      });


  $locationProvider.html5Mode(true);

  if( window.location.hash == '#!' ) {
  window.location.href = 'http://localhost:3007';
  }

}]);//closes app.config()
