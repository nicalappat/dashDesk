angular.module('dashboardApp', ['ngCookies'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])


.controller('dashboardController', function($scope, $http, $cookies) {

      //Check if logged in
      /*if($cookies.get("dashManager")){
        $scope.isLoggedIn = true;
      }
      else{
        $scope.isLoggedIn = false;
        window.location = "adminlogin.html";
      }*/
      
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
      
      $scope.fetchTime = 'now';
      $scope.isContentFound = false;
      $scope.sections = [{value: "Higher Secondary", option: "HSS"}, {value: "High School", option: "HS"}, {value: "Upper Primary", option: "UP"}, {value: "Lower Primary", option: "LP"}, {value:"Kindergarten", option: "KG"}];
      $scope.classList = [];
      $scope.pollOptions = {};
      $scope.maxPoll = [];
      $scope.dashboardRequests = [];
      $scope.dashboardLeaves = [];
      $scope.isRequestsFound="";
      $scope.isLeavesFound="";

      //All Common Functions
      $scope.initHighlights = function(){     
  
     var co_data = {};
     co_data.token = $cookies.get("dashManager");
     
             $http({
               method  : 'POST',
               url     : 'http://www.schooldash.xyz/services/fetchhighlights.php',
               data    : co_data,
               headers : {'Content-Type': 'application/x-www-form-urlencoded'}
              })
              .then(function(response) {
              
                if(response.data.status){
                  $scope.highlightsList = response.data.response;
                }
                
              })                 
      }
      
      $scope.initHighlights();

       $scope.initDashboard = function(){     
  
     var co_data = {};
     co_data.token = $cookies.get("dashManager");
     
             $http({
               method  : 'POST',
               url     : 'http://www.schooldash.xyz/services/fetcheventsdashboard.php',
               data    : co_data,
               headers : {'Content-Type': 'application/x-www-form-urlencoded'}
              })
              .then(function(response) {
                if(response.data.status){

                  $scope.dashboardEvents = response.data.response;
                  $scope.isContentFound = true;
                  console.log($scope.dashboardEvents);
                }
                else{
                  $scope.isContentFound = false;
                }
                
              });
    

      }   
      $scope.initDashboard();

      $scope.fetchDashboardRequests = function(){
         var co_data = {};
         co_data.token = $cookies.get("dashManager");
         
                 $http({
                   method  : 'POST',
                   url     : 'http://www.schooldash.xyz/services/fetchrequestsdashboard.php',
                   data    : co_data,
                   headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                  })
                  .then(function(response) {
                  console.log(response);
               if(response.data.status){
               
                     $scope.isRequestsFound = true;             
                     $scope.dashboardRequests = response.data.response;
                                                       
                }
               
                 else{ 
                    $scope.isRequestsFound = false;      
                    $scope.dashboardRequests = {};
                 }
                    }); 
      }

      $scope.fetchDashboardRequests();

      $scope.fetchDashboardLeaves = function(){
         var co_data = {};
         co_data.token = $cookies.get("dashManager");
         
                 $http({
                   method  : 'POST',
                   url     : 'http://www.schooldash.xyz/services/fetchleavesdashboard.php',
                   data    : co_data,
                   headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                  })
                  .then(function(response) {
                  console.log(response);
               if(response.data.status){
               
                     $scope.isLeavesFound = true;             
                     $scope.dashboardLeaves = response.data.response;
                                                       
                }
               
                 else{ 
                    $scope.isLeavesFound = false;      
                    $scope.dashboardLeaves = {};
                 }
                    }); 
      }

      $scope.fetchDashboardLeaves();

      $scope.dashboardPolls = function (){
        var data = {};
    data.token = $cookies.get("dashManager");
     
             $http({
               method  : 'POST',
               url     : 'http://www.schooldash.xyz/services/fetchpollsdashboard.php',
               data    : data,
               headers : {'Content-Type': 'application/x-www-form-urlencoded'}
              })
              .then(function(response) {
                console.log("Poll Response Log", response);
                if(response.data.status){

              $scope.response = response.data.response;
              var j=0;
              angular.forEach($scope.response, function(value, key){
                  $scope.pollOptions = value.pollOptions;
                  $scope.maxPoll[j] = $scope.pollOptions[0];
                  
                  var i=0;
                  angular.forEach($scope.pollOptions, function(resp, key){  
                      resp.count = String(response.data.response[j].counts[i]);
                      i++;   
                      if(resp.count > $scope.maxPoll[j].count){
                        $scope.maxPoll[j] = resp;
                      }
                   });
                  j++;
               });

                                console.log("Max Poll: ", $scope.maxPoll);
              $scope.isPollResponseFound = true;
              }
              else{
                  $scope.isContentFound = false;
              }
                
          });
      }

      $scope.dashboardPolls();

      $scope.dashboardPayments = function(){
        var data = {};
        data.token = $cookies.get("dashManager");
                      
        $http({
          method  : 'POST',
          url     : 'http://www.schooldash.xyz/services/fetchpaymentsdashboard.php',
          data    : data,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
         .then(function(response) {
          console.log(response);
            if(response.data.status){

              $scope.isPaymentsFound = true;
              $scope.payments = response.data.response;
              if($scope.payments.length%10 != 0){
                $scope.isMoreLeft = false;
              }
            }
            else{
              $scope.isPaymentsFound = false;
            }
          });
      }

      $scope.dashboardPayments();

      $scope.loadMorePayments = function() {
          $scope.limiter = $scope.limiter + 10;
          
          var data = {};
          data.token = $cookies.get("dashManager");
          data.limiter = $scope.limiter;
            
          $http({
            method  : 'POST',
            url     : 'http://www.schooldash.xyz/services/fetchpaymentsdashboard.php',
            data    : data,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
           })
           .then(function(response) {
              console.log(response);
              if(response.data.status){
                $scope.payments = $scope.payments.concat(response.data.response);
                if($scope.payments.length%10 != 0){
                  $scope.isMoreLeft = false;
                }
              }
              else{
                $scope.isMoreLeft = false;
              }
            });
        }

      $scope.getMyClass = function(clss){
          if(clss == null){
            return 'btn-warning';
          }
          
          else{
            return 'btn-success';
          }
      }

      $scope.initSeatPlan = function(){
  
    $scope.seatPlanError = "";
        var data = {};
        data.token = $cookies.get("dashManager");
        $http({
          method  : 'POST',
          url     : 'http://www.schooldash.xyz/services/fetchclassesdashboard.php',
          data    : data,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
         .then(function(response) {
         console.log(response)
           if(response.data.status){
            $scope.seatPlanError = '';
              $scope.classList = response.data.response;
              $scope.fetchTime = response.data.time;
              console.log($scope.classList);
            }
           else{
              $scope.seatPlanError = response.data.error;
           }
          });
  }
      
      $scope.openSeatPlanView = function(){
        $scope.initSeatPlan();        
        $('#seatingPlanViewModal').modal('show');
      }
  

});
