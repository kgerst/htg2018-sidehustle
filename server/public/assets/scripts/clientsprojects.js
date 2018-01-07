hustleApp.controller('ProjectController', function($scope) {
  console.log('ProjectController loaded');
  var vm = this;
  vm.myProjects = ["goal1", "goal2", "goal3", "goal4"];
  // var newInput = vm.newInput;
  // var hours = vm.hours;
  // var progress = vm.progress


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
