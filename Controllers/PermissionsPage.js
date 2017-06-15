var app = angular.module("EvalSystem", []);
var termsSelected = []; // holds the terms that the user has selected
var departmentsSelected = []; //holds the departments that the user has selected
var coursesSelected = [];
var rolesSelected = [];
var roleIDs = 0;
var FacultyList = [];
var SelectedFaculty = "Professor Name's Permissions:";
var SelectedFacultyId = "";
var reportDisplayOption = "";
var tempDepartmentOption = "";
var tempPermSelected = "";
var indexSelected = 0;

// NOTE: This will need to be changed each semester to the path that the current group has set up for their API calls
var apiPath = "https://icarus.cs.weber.edu/~ck50991/CS4450/v1/"; //This is the path to the API calls that interface with the database.


//This is used to keep track of what information the user is allowed access to.
// i.e. If the user is a adjunct admin, they should see the results from the adjuncts but only from within their department
var loggedInUserID = 887969243; // brad peterson

app.controller("FacultySelectController", function ($scope, $http) {
    $http(
        {
            url: apiPath + "instructors",
            method: "get",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
    )
        .then(
        function successCallback(response) {
           
            FacultyList = response.data;
            $scope.facs = response.data;
            console.log(FacultyList);
            // get the select we're going to add all our options to
            //var select = document.getElementById("facultyList");

            // remove any existing options (for repeated use)
            //select.options.length = 0;

            // add all our new ones
            //for (var i = 0; i < instructors.length; i++) {
            //    // new Option (text, value)
            //    //select.options[select.options.length] = new Option(instructors[i].LastName + ", " + instructors[i].FirstName);
            //}
        },
        function errorCallback(response) {
            console.log(response);
        }
        );
    $scope.showSelectValue = function (FacultySelected) {
        
        SelectedFacultyId = FacultySelected[0];
        console.log(SelectedFacultyId);
        for (var i = 0; i < FacultyList.length; i++) {
            if (FacultyList[i].instructorID == SelectedFacultyId) {
                //console.log("Success")
                SelectedFaculty = FacultyList[i].LastName + ", " + FacultyList[i].FirstName
                //console.log(SelectedFaculty)
                //$scope.name = SelectedFaculty;
                document.getElementById("FacultyNameHeader").innerHTML = SelectedFaculty + " - Permissions:";
            }
        }
    }
});

app.controller("RoleController", function ($scope, $http) {

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
    $scope.buildRoleList = function () {
        var Roles = document.getElementById("roleList").options;

        // strip out the information we need to get objects in the form of
        // {Dempartment - Role}
        rolesSelected.length = 0;
        for (var i = 0; i < Roles.length; i++) {
            if (Roles[i].selected) {
                rolesSelected.push({
                    RoleId: roleIDs,
                    RolePermission: Roles[i].Permissions,
                    RoleDepartment: Roles[i].Department
                });
            }
        }
    }

    //$scope.SelectFacultyMember = function () {
    //    var Roles = document.getElementById("roleList").options;
    //    SelectedFaculty = "";
    //    SelectedFacultyID = "";
    //}

    // on click add role
    $scope.AddRole = function () {        
        console.log("Add Role Clicked");
        rolesSelected.push({
            RoleId: roleIDs,
            RolePermission: tempPermSelected,
            RoleDepartment: tempDepartmentOption
        });
        console.log(roleIDs);
        roleIDs++;
        $scope.roles = rolesSelected;
        console.log($scope.roles);
    }
    // on click remove role
    $scope.RemoveRole = function () {
        console.log("Remove Role Clicked");
        rolesSelected.splice(indexSelected, 1); 
    }
    
    // change in role selected
    $scope.showSelectValue = function (roleListSelected) {
        indexSelected = roleListSelected;// cant figure out how to get indexOf() to work
        console.log(indexSelected);

    }
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
    $scope.showSelectValue = function (deptListSelected) {
        console.log(deptListSelected);
        tempDepartmentOption = deptListSelected;
    }
});

app.controller("PermissionsListController", function ($scope) {
    $scope.showSelectValue = function (permListSelected) {
        console.log(permListSelected);
        tempPermSelected = permListSelected;
    }
    
});



