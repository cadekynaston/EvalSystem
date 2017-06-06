var app = angular.module("EvalSystem", []);
var termsSelected = []; // holds the terms that the user has selected
var departmentsSelected = []; //holds the departments that the user has selected
var coursesSelected = [];
var courseOrInstructor = ""; //holds the string of "Course" or "Instructor" based on which option the user chooses to sort the returned info by
var reportDisplayOption = "";

// NOTE: This will need to be changed each semester to the path that the current group has set up for their API calls
var apiPath = "https://icarus.cs.weber.edu/~ck50991/CS4450/v1/"; //This is the path to the API calls that interface with the database.


//This is used to keep track of what information the user is allowed access to.
// i.e. If the user is a adjunct admin, they should see the results from the adjuncts but only from within their department
var loggedInUserID = 887969243; // brad peterson

app.controller("FacultySelectController", function($scope, $http) {
    let departmentsSelectedJSONString = "{";
    departmentsSelectedJSONString += "\"departments\":" + JSON.stringify(departmentsSelected);
    departmentsSelectedJSONString += ",\"userID\":" + loggedInUserID;
    departmentsSelectedJSONString += "}";

    console.log(departmentsSelectedJSONString);

    $http(
        {
            url: apiPath + "instructors",
            method: "POST",
            data: departmentsSelectedJSONString,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    )
        .then(
        function successCallback(response) {
            console.log(response.data);
            var instructors = response.data;

            // get the select we're going to add all our options to
            var select = document.getElementById("facultyList");

            // remove any existing options (for repeated use)
            select.options.length = 0;

            // add all our new ones
            for (var i = 0; i < instructors.length; i++) {
                // new Option (text, value)
                select.options[select.options.length] = new Option(instructors[i].FirstName + " " + instructors[i].LastName);
            }
        },
        function errorCallback(response) {
            console.log(response);
        }
        );
});

app.controller("RoleController", function($scope, $http) {
    //$http(
    //    {
    //        method: 'GET',
    //        url: apiPath + 'roles'
    //    }
    //)
    //    .then(
    //    function successCallback(response) {
    //        console.log(response.data); //outputs the received data to the console (for debugging purposes only)
    //        $scope.Roles = response.data;
    //    },
    //    function errorCallback(response) {
    //        console.log(response);
    //    }
    //    );
    //$scope.buildRoleList = function () {
    //    var Roles = document.getElementById("roleList").options;

    //    // strip out the information we need to get objects in the form of
    //    // {Dempartment - Role}
    //    RolesSelected.length = 0;
    //    for (var i = 0; i < Roles.length; i++) {
    //        if (departments[i].selected) {
    //            Roles.push({
    //                DepartmentCode: departments[i].value,
    //                DepartmentName: departments[i].text
    //            });
    //        }
    //    }
    //}
});

/* -- Department Controller --
  Used in Pane 2
  This controller returns a list of department names only which have instructors
  It is generic, and is not dependent on any prior selections.
*/
app.controller("DeptController", function ($scope, $http) {
    $http(
        {
            method: 'GET',
            url: apiPath + 'departments'
        }
    )
        .then(
        function successCallback(response) {
            console.log(response.data); //outputs the received data to the console (for debugging purposes only)
            $scope.depts = response.data;
        },
        function errorCallback(response) {
            console.log(response);
        }
        );
    $scope.buildDepartmentsSelected = function () {
        var departments = document.getElementById("deptList").options;

        // strip out the information we need to get objects in the form of
        // {code: 8001, name: Computer Science}
        departmentsSelected.length = 0;
        for (var i = 0; i < departments.length; i++) {
            if (departments[i].selected) {
                departmentsSelected.push({
                    DepartmentCode: departments[i].value,
                    DepartmentName: departments[i].text
                });
            }
        }

        console.log(departmentsSelected); //outputs the received data to the console (for debugging purposes only)
        //document.getElementById('pane3-button').click(); //moves the view to the next window pane
    }
});


