hustleApp.controller('ProfileController', function($scope, $http) {
  console.log('ProfileController loaded');
  var vm = this;
  // vm.myProjects = ["goal1", "goal2", "goal3", "goal4"];
  // var newInput = vm.newInput;
  // var hours = vm.hours;
  // var progress = vm.progress


  vm.getProfiles = function(){
  console.log("in GET call for profiles");
  vm.myProfiles = [{
    name: "Elise", 
    last_name: "Ogden",
    bio: "I am a photographer and product person. I enjoy taking portraits most but am also experienced in urban landscapes and event photography. I'd like to contribute my skills to any project with a social mission.",
    skills: ["Photography", "Illustration", "Music"],
    imgname: "elise"
  },
  {
    name: "Amanda", 
    last_name: "Schlosser",
    bio: "I am an exerpienced designer who loves making cat cards in my free time! I'm looking for projects where I can grow my experience in front end design but would also love contribute my design experience to any projects involving art or cats!",
    skills: ["Painting", "Design", "Music"],
    imgname: "amanda"    
  },
  {
    name: "Jessica", 
    last_name: "Oakes",
    bio: "I am a backend developer and illustrator. Happy to put my skills to use on any project!",
    skills: ["Illustration", "Developer"],
    imgname: "jessica"        
  }];
  // return $http({
  //   method: 'GET',
  //   url: '/users'
  // }).then(function(response){
  //   console.log("response from server in get projects: ", response.data);
  //   vm.myProfiles = response.data;
  //   return response.data;
  // });
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
