hustleApp.controller('ProfileController', function($scope, $http) {
  console.log('ProfileController loaded');
  var vm = this;
  // vm.myProjects = ["goal1", "goal2", "goal3", "goal4"];
  // var newInput = vm.newInput;
  // var hours = vm.hours;
  // var progress = vm.progress

  vm.getProfiles = function(){
  console.log("in GET call for profiles");
  return $http({
    method: 'GET',
    url: '/users'
  }).then(function(response){
    console.log("response from server in get projects: ", response.data);
    vm.myProfiles = response.data;
    // console.log(response.data);
    return response.data;
  });
};

vm.getProfiles();

  // var user = session.user;

  // console.log('hours:', hours);
  // vm.myIntentions = [];

    // vm.addIntention = function(newInput, hours, userthing){
    //   IntentionsService.addIntention(newInput, hours, userthing);
    //   IntentionsService.updateIntentions().then(function(data){
    //     vm.myIntentions = data;
    //     createData(vm.myIntentions);
    //   });
    // };
    //
    // vm.removeIntention = function(thing){
    //   IntentionsService.removeIntention(thing);
    //   IntentionsService.updateIntentions().then(function(data){
    //     vm.myIntentions = data;
    //     createData(vm.myIntentions);
    //     });
    // };
});
