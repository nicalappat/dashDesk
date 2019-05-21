angular.module('adminsApp', ['ngCookies'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])

  .controller('adminsController', function($scope, $http, $interval, $cookies) {
  
      //Check if logged in
      if($cookies.get("dashManager")){
        $scope.isLoggedIn = true;
      }
      else{
        $scope.isLoggedIn = false;
        window.location = "adminlogin.html";
      }
      
      //Logout function
      $scope.logoutNow = function(){
        if($cookies.get("dashManager")){
          $cookies.remove("dashManager");
          window.location = "adminlogin.html";
        }
      }
      
      //Schools basic info
      $scope.schoolCode = localStorage.getItem("schoolCode");
      $scope.schoolFancyName = localStorage.getItem("schoolCity");
      
      $scope.isContentFound = false;

            //Fetch Content
  $scope.fetchContent = function(){
   var co_data = {};
   co_data.token = $cookies.get("dashManager");


   
           $http({
             method  : 'POST',
             url     : 'http://www.schooldash.xyz/services/fetchadmins.php',
             data    : co_data,
             headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
            console.log(response);
         if(response.data.status){
         
               $scope.isContentFound = true;             
               $scope.active_content = response.data.response;
               if($scope.active_content.length == 0){
                  $scope.isContentFound = false;
               }
                                                                  
          }
         
           else{ 
              $scope.isContentFound = false;      
              $scope.active_content = {};
           }
              }); 
          }
        $scope.fetchContent();

  });