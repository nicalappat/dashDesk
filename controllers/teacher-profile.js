angular.module('TeacherProfileApp', ['ngCookies'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])


.controller('TeacherProfileController', function($scope, $http, $cookies) {

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

      $scope.isSearched = false;
      $scope.isFound = false;
      $scope.singleTeacher = false;
      $scope.teacherData = "";

      $scope.searchKey = "";

      $scope.search = function(search_key){

            var data = {};
            data.token = $cookies.get("dashManager");
            data.key = search_key;
            console.log("Goes to server");
            console.log(data);

            $http({
              method  : 'POST',
              url     : 'http://www.schooldash.xyz/services/fetchteachers.php',
              data    : data,
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
             })
             .then(function(response) {
                console.log("Comes from server");
                console.log(response);

            if(response.data.status){
              $scope.isSearched = true;
              $scope.isFound = true;
              $scope.teacherData = response.data.response;

              if($scope.teacherData.length == 1){
                $scope.singleTeacher = true;
                $scope.teacherData = $scope.teacherData[0];
                console.log($scope.teacherData);
              }

              else{
                $scope.singleTeacher = false;
              }
            }
            
            else{
              $scope.isSearched = true;
              $scope.isFound = false;
              $scope.teacherData = {};
            }

            });
              
      }

      $scope.goToTeacherProfile = function(search_key){
            
            var data = {};
            data.token = $cookies.get("dashManager");
            data.key = search_key;
            console.log("Goes to server");
            console.log(data);

            $http({
              method  : 'POST',
              url     : 'http://www.schooldash.xyz/services/fetchteachers.php',
              data    : data,
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
             })
             .then(function(response) {
                console.log("Comes from server");
                console.log(response);

            if(response.data.status){
              $scope.singleTeacher = true;
              $scope.isSearched = true;
              $scope.isFound = true;

              $scope.teacherData = response.data.response[0];   
            }

            else{
              $scope.isSearched = true;
              $scope.isFound = false;
              $scope.teacherData = {}
            }
      });
    }


      //Edit Teacher Info

         setTimeout(function(){
        $('#dob').datetimepicker({  
            format: "dd-mm-yyyy",
            weekStart: 1,
              todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
        })  
      }, 200);

  $scope.teacherEditInfo = $scope.teacherData;
      console.log($scope.teacherData)
        console.log($scope.teacherEditInfo);

      $scope.saveEditChanges = function(){

      }

})
   

;