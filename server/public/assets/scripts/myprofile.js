hustleApp.controller('MyProfileController', function($scope, $http) {
  console.log('MyProfileController loaded');
  var vm = this;
  // vm.myProjects = ["goal1", "goal2", "goal3", "goal4"];
  // var newInput = vm.newInput;
  // var hours = vm.hours;
  // var progress = vm.progress

//
//   vm.getProjects = function(){
//   console.log("in GET call for projects");
//   return $http({
//     method: 'GET',
//     url: '/projects'
//   }).then(function(response){
//     console.log("response from server in get projects: ", response.data);
//     vm.myProjects = response.data;
//     return response.data;
//   });
// };
//
// vm.getProjects();


$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});
});
