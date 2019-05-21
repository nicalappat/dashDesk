angular.module('coursesApp', ['ngCookies'])

.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])



  .controller('coursesController', function($scope, $http, $interval, $cookies, $timeout) {
  
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
      
      $scope.currentDisplayPage = 1;
      $scope.totalDisplayPages = 1;
      $scope.isContentFound = false;
      $scope.comments = "";
      $scope.courseSelect = "";
      $scope.teacherId = "";
      
        $scope.initializeContent = function(){
          $scope.newContentSaveError = "";
          $scope.newCourseContent = {};
          $scope.newCourseContent.name = "";
          $scope.newCourseContent.category = "";
          $scope.newCourseContent.stream = "";
          $scope.newCourseContent.courseId = "";
          $scope.newCourseContent.class = "";          

    }
    $scope.initializeContent();
     
            //Fetch Content
  $scope.fetchContent = function(content){
   var co_data = {};
   co_data.courseSelect = content;
   co_data.token = $cookies.get("dashManager");
   console.log("going data", co_data);


   
           $http({
             method  : 'POST',
             url     : 'http://www.schooldash.xyz/services/fetchcourses.php',
             data    : co_data,
             headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
            console.log(response);
         if(response.data.status){
         
               $scope.isContentFound = true;             
               $scope.active_content = response.data.response;
                                                                  
          }
         
           else{ 
              $scope.isContentFound = false;      
              $scope.active_content = {};
           }
              }); 
            $('#filterModal').modal('hide');
          }
        $scope.fetchContent("");

      $scope.initCourses = function(){
        $scope.seatPlanError = "";
        var data = {};
        data.token = $cookies.get("dashManager");
        $http({
          method  : 'POST',
          url     : 'http://www.schooldash.xyz/services/fetchfiltercourseslist.php',
          data    : data,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
         .then(function(response) {
         console.log(response)
           if(response.data.status){
            $scope.seatPlanError = '';
              $scope.courseList = response.data.response;
              console.log($scope.courseList);
            }
           else{
              $scope.seatPlanError = response.data.error;
           }
          });
          
      }

       //View Content

 $scope.viewCourseFilters = function() {
 	console.log("Hi");
      $('#filterModal').modal('show');
      $scope.initCourses(); 
  }
   $scope.viewMyContent = function(content){
      $scope.viewContent = content;
      $('#viewModal').modal('show');      
   }

   $scope.showCourseOptions = function(content){
        $('#courseModal').modal('show'); 
        $scope.courseInfo = content;     
    }

    $scope.askForDelete = function(){
      $('#confirmationModal').modal('show');
    }

    $scope.addCourseModal = function() {
    $('#addCourseModal').modal('show');  
  }

  $scope.createCourse = function(){

    if($scope.newCourseContent.class === ""){
                  $scope.newContentSaveError = "Select the Class";
                }
    else if(($scope.newCourseContent.class > 10) && ($scope.newCourseContent.stream === "")){
                  $scope.newContentSaveError = "Select the Stream";
                }
    else if($scope.newCourseContent.category === ""){
                  $scope.newContentSaveError = "Select the Course Category";
                }
    else if($scope.newCourseContent.name === ""){
                  $scope.newContentSaveError = "Mention the course Name";
                }
    else if($scope.newCourseContent.courseId === ""){
                  $scope.newContentSaveError = "Enter a Course ID";
                }
                
                
    else{

                  $scope.newContentSaveError = "";
                  
                  $('#loading').show(); $("body").css("cursor", "progress");
            
               var data = {};
               data.token = $cookies.get("dashManager");
               data.class = $scope.newCourseContent.class;
               data.name = $scope.newCourseContent.name;
               
               data.category = $scope.newCourseContent.category;
               if(data.class > 10){ 
               	data.stream = $scope.newCourseContent.stream;
               }
               data.courseId = $scope.newCourseContent.courseId;    

               console.log('GOes to Server');  
               console.log(data);
               
                 $http({
                   method  : 'POST',
                   url     : 'http://www.schooldash.xyz/services/createcourse.php',
                   data    : data,
                   headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                  })
                  .then(function(response) {
                       $('#loading').hide(); $("body").css("cursor", "default");
                       if(response.data.status){
                           console.log('COmes from Server')
                            console.log(response); 
                            $timeout(function() {
                              $scope.fetchContent();
                      }, 300);
                            $('#addCourseModal').modal('hide');
                            $scope.initializeContent();
                       }
                       else{
                        $scope.newContentSaveError = response.data.error;
                       }
                  });
               }
  }

    $scope.deleteCourse = function(){ 
      var data = {};
        
        data.token = $cookies.get("dashManager");
        data.courseId = $scope.courseInfo.courseId;

        console.log("going Data for delete course", data);
        
        $http({
          method  : 'POST',
          url     : 'http://schooldash.xyz/services/deletecourse.php',
          data    : data,
          headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
         .then(function(response) {

        console.log(response);
        if(response.data.status){
          $('#courseModal').modal('hide');
          $('#confirmationModal').modal('hide');
          $scope.fetchContent();
        }
        else{
          alert('Error: '+response.data.error);
        }

         }); 



    }  

    $scope.viewTeachers = function(){
    $timeout(function () {
      $('#teacherModal').modal('show');
    }, 200);

      var co_data = {};
      co_data.courseId = $scope.courseInfo.courseId;
        console.log("Going data for teachers' list", co_data);
      co_data.token = $cookies.get("dashManager");


   
           $http({
             method  : 'POST',
             url     : 'http://www.schooldash.xyz/services/fetchteacherlistforcourse.php',
             data    : co_data,
             headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
            console.log(response);
         if(response.data.status){
         
               $scope.isContentFound = true;             
               $scope.active_content1 = response.data.response;             
                                                                  
          }
         
           else{ 

              $scope.isContentFound = false;      
              $scope.active_content = {};

           }
              }); 

    }

    $scope.viewStudents = function(){
    $timeout(function () {
      $('#studentModal').modal('show');
    }, 200);

      var co_data = {};
      co_data.key = $scope.courseInfo.course + "-" + $scope.courseInfo.division;
        console.log("Going data for students' list", co_data);
      co_data.token = $cookies.get("dashManager");


   
           $http({
             method  : 'POST',
             url     : 'http://www.schooldash.xyz/services/fetchstudents.php',
             data    : co_data,
             headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(response) {
            console.log(response);
         if(response.data.status){
         
               $scope.isContentFound = true;             
               $scope.active_content2 = response.data.response;             
                                                                  
          }
         
           else{ 

              $scope.isContentFound = false;      
              $scope.active_content = {};

           }
              }); 
    }     
    
  


  });