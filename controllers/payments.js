angular.module('paymentsApp', ['ngCookies'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])



  .controller('paymentsController', function($scope, $http, $interval, $cookies, $timeout) {

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

    $scope.schoolCode = localStorage.getItem("schoolCode");
      $scope.schoolFancyName = localStorage.getItem("schoolCity");

      $scope.isPaymentsFound = false;
      $scope.isPaymentResponseFound = false;

      $scope.limiter = 0;
      $scope.isMoreLeft = true;
      $scope.limiter1 = 0;
      $scope.isMoreLeft1 = true;
      $scope.paymentSelect = false;
      $scope.targetList = "";
      $scope.errorMessage = "";
      $scope.searchKey = ""; 

      $scope.initializeContent = function(){
        $scope.newPaymentContent = {};
        $scope.newPaymentContent.title = "";
        $scope.newPaymentContent.brief = "";
        $scope.newPaymentContent.target = "";
        $scope.newPaymentContent.targetAudience = "";
        $scope.newPaymentContent.targetSpecific = "";
        $scope.newPaymentContent.amount = "";
        $scope.newPaymentContent.endDate = "";
        $scope.paymentOptions = [];
        $scope.paymentResponses = [];
        $scope.newPaymentContent.isOptional = "";
      }
      $scope.initializeContent();


  $scope.init = function(){
  
        var data = {};
        data.token = $cookies.get("dashManager");
                      
        $http({
          method  : 'POST',
          url     : 'http://www.schooldash.xyz/services/fetchpayments.php',
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
  
  $scope.init();     

  $scope.createPayment = function(){
    $scope.newPaymentContent.endDate = document.getElementById('paymentEndDate').value;

  var today = new Date();
  var m = today.getMonth()+1;
  var d = today.getDate()+1;
  var y = today.getFullYear();
  
  var tdt = m+"/"+d+"/"+y;

  
  var todate = new Date(tdt).getTime();
        
  var myDate=$scope.newPaymentContent.endDate;
  console.log($scope.newPaymentContent.endDate);
  myDate=myDate.split("-");
  var newDate=myDate[1]+"/"+myDate[0]+"/"+myDate[2];

  var eventDate = new Date(newDate).getTime();
  var patt =/(0[1-9]|[12][0-9]|3[01])[-](0[1-9]|1[012])[-](19|20)\d\d/;

    if($scope.newPaymentContent.title === ""){
                  $scope.newContentSaveError = "Give a title to the payment";
                }
                 
    else if($scope.newPaymentContent.brief === ""){
                  $scope.newContentSaveError = "Add a brief to your payment";
                }
    else if($scope.newPaymentContent.amount === ""){
                  $scope.newContentSaveError = "Enter an amount for the payment";
                }
    else if($scope.newPaymentContent.endDate === ""){
                  $scope.newContentSaveError = "Add an End Date for your payment";
                }
    else if(!/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test($scope.newPaymentContent.endDate)){
                  $scope.newContentSaveError = "Enter a proper date";
                }
    else if(!/^[0-9]*$/.test($scope.newPaymentContent.amount)){
                  $scope.newContentSaveError = "Enter a proper amount";
                }
    else if(eventDate < todate){
                  $scope.newContentSaveError = "Enter a later date";
               }
    else if($scope.newPaymentContent.target === ""){
                  $scope.newContentSaveError = "Mention the Target Audience";
                }
              // else if(!$scope.addNewContent.offer && $scope.myPhotoURL == "" ){
               //  $scope.newContentSaveError = "Promotion must have a photo attachment";
              // }
         
    else{
                  //Add to server
                  if($scope.newPaymentContent.target == 0){
                    $scope.newPaymentContent.targetAudience = 0;
                  }
                  else{
                    $scope.newPaymentContent.targetAudience=document.getElementById('tokenfield-typeahead').value;
                  }

                  $scope.newContentSaveError = "";
                  
                  $('#loading').show(); $("body").css("cursor", "progress");
            
               var data = {};
               data.token = $cookies.get("dashManager");
               data.title = $scope.newPaymentContent.title;
               data.brief = $scope.newPaymentContent.brief; 
               data.amount = $scope.newPaymentContent.amount;
               data.target = $scope.newPaymentContent.targetAudience;
               data.endDate = $scope.newPaymentContent.endDate;      

               console.log('GOes to Server');  
               console.log(data);
               
                 $http({
                   method  : 'POST',
                   url     : 'http://www.schooldash.xyz/services/createpayment.php',
                   data    : data,
                   headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                  })
                  .then(function(response) {
                       $('#loading').hide(); $("body").css("cursor", "default");
                       if(response.data.status){
                           console.log('COmes to Server')
                            console.log(response); 
                            $timeout(function() {
                              $scope.init();
                      }, 300);
                            $('#paymentModal').modal('hide');
                            $scope.initializeContent();
                       }
                       else{
                        $scope.newContentSaveError = response.data.error;
                       }
                  });
               }
  }

  $scope.goBack = function(){
    $scope.paymentSelect = false;
    $scope.selectedPayment = "";
    $scope.paymentResponses = "";
  }

  $scope.showPaymentStats = function(payment){
        
        $scope.paymentSelect = true;
        $scope.selectedPayment = payment;

        var data = {};
        data.token = $cookies.get("dashManager");
        data.paymentId = payment.paymentId;
        
        console.log("Going", data);

        $http({
          method  : 'POST',
          url     : 'http://www.schooldash.xyz/services/fetchpaymenthistory.php',
          data    : data,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
         .then(function(response) {
            console.log(response.data.response);
            if(response.data.status){

              $scope.isPaymentResponseFound = true;
              $scope.paymentResponses = response.data.response;
              if($scope.paymentResponses.length%30 != 0){
                $scope.isMoreLeft1 = false;
                $scope.isPaymentResponsesFound = true;
              }
            }
            else{
              $scope.isPaymentResponsesFound = false;
            }

          });
  }

  $scope.submitSearch = function(){

        var data = {};
        data.token = $cookies.get("dashManager");
        data.paymentId = $scope.selectedPayment.paymentId;
        data.searchKey = document.getElementById('searchKey').value;
        
        console.log("Going", data);

        $http({
          method  : 'POST',
          url     : 'http://www.schooldash.xyz/services/searchpayment.php',
          data    : data,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
         .then(function(response) {
            console.log(response.data.response);
            if(response.data.status){

              $scope.isPaymentResponseFound = true;
              $scope.paymentResponses = response.data.response;
              if($scope.paymentResponses.length%20 != 0){
                $scope.isMoreLeft1 = false;
                $scope.isPaymentResponsesFound = true;
              }
            }
            else{
              $scope.isPaymentResponsesFound = false;
            }

          });
  }

  setTimeout(function(){
        $('#paymentEndDate').datetimepicker({  
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

  $scope.newPayment = function() {
    $('#paymentModal').modal('show');  
   
  }

  //List of Classes
$scope.$watch('newPaymentContent.targetSpecific', function() {
        if($scope.newPaymentContent.targetSpecific !== ""){

            var data = {};
            data.token = $cookies.get("dashManager");
            data.target = $scope.newPaymentContent.target;
            data.targetSpecific = $scope.newPaymentContent.targetSpecific;

            $http({
              method  : 'POST',
              url     : 'http://www.schooldash.xyz/services/fetchtarget.php',
              data    : data,
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
             })
             .then(function(response) {
                if(response.data.status){

                  $scope.isFound = true;
                  $scope.targetList = response.data.response;
                  var temp = JSON.parse(response);
                }
                else{
                  $scope.isFound = false;
                  $scope.targetList = [{value: '12-A'}, {value: '12-B'}, {value: '11-A'} , {value: '11-C'}, {value: '11-B'}];
                }
      
              var temp = JSON.parse(data);

                var engine = new Bloodhound({
          local: $scope.targetList,
          datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.value); 
          },
          queryTokenizer: Bloodhound.tokenizers.whitespace
        });
      
        engine.initialize();
      
      
        $('#tokenfield-typeahead').tokenfield({
          typeahead: [null, { source: engine.ttAdapter() }]
        });

        
            });
}
  
});


  $scope.addTarget = function(targetName){
      if(document.getElementById("tokenfield-typeahead").value == ""){
         $('#tokenfield-typeahead').val(targetName).trigger('change');
      }
      else{
         $('#tokenfield-typeahead').val(document.getElementById("tokenfield-typeahead").value+', '+targetName).trigger('change');
      }  
      
      document.getElementById('button1_'+targetName).style.display = 'none';         
   }   
       
      $scope.loadMore = function() {
          $scope.limiter = $scope.limiter + 10;
          
          var data = {};
          data.token = $cookies.get("dashManager");
          data.limiter = $scope.limiter;
            
          $http({
            method  : 'POST',
            url     : 'http://www.schooldash.xyz/services/fetchpayments.php',
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
        $scope.loadMore1 = function() {
          $scope.limiter1 = $scope.limiter1 + 30;
          
          var data = {};
          data.token = $cookies.get("dashManager");
          data.limiter = $scope.limiter1;
          data.paymentId = $scope.selectedPayment.paymentId;
            
          $http({
            method  : 'POST',
            url     : 'http://www.schooldash.xyz/services/fetchpaymenthistory.php',
            data    : data,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
           })
           .then(function(response) {
              console.log(response);
              if(response.data.status){
                $scope.paymentResponses = $scope.paymentResponses.concat(response.data.response);
                if($scope.paymentResponses.length%30 != 0){
                  $scope.isMoreLeft1 = false;
                }
              }
              else{
                $scope.isMoreLeft1 = false;
              }
            });
        }
        
  })
  ;