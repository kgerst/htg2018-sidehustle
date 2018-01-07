hustleApp.controller('ProjectController', function($scope, $http) {
  console.log('ProjectController loaded');
  var vm = this;
  // vm.myProjects = ["goal1", "goal2", "goal3", "goal4"];
  // var newInput = vm.newInput;
  // var hours = vm.hours;
  // var progress = vm.progress

  vm.btnClick = function(id){
    console.log('this', $(this) );
    console.log('id', id);
    $('.connected').addClass('open');
  };
  vm.btnDismiss = function(id){
    console.log('this', $(this) );
    console.log('id', id);
    $('.connected').removeClass('open');
  };

  vm.getProjects = function(){
  console.log("in GET call for projects");
  return $http({
    method: 'GET',
    url: '/projects'
  }).then(function(response){
    console.log("response from server in get projects: ", response.data);
    vm.myProjects = response.data;
    return response.data;
  });
};

vm.getProjects();


});
