var ATMApp = angular.module("ATMrApp", []);
ATMApp.controller("ATMCtrl", function ($scope, ATMService) {
  /**variables initialize*/
  $scope.StartSDate = "";
  $scope.EndSDate = "";
  $scope.QueryKeys = "";
  $scope.LogList = [];
  $scope.LogListSize = "";
  $scope.selectedLog = {};

  /**個案回饋表 顯示 隱藏 */
  $scope.Query_FeedBack_show = function () {
    document.getElementById("FeedBack_table").style.display='';
  };
  $scope.Query_FeedBack_nonedisplay = function () {
    document.getElementById("FeedBack_table").style.display='none';
  };


  $scope.Query = function () {
    $scope.Clear();
    for (var key in $scope.selectedLog) {
      if ($scope.selectedLog[key].trim() == "")
        delete $scope.selectedLog[key];
    }
    var QueryKeys = $scope.selectedLog;
    ATMService.Load_Trans(QueryKeys).then(function (res) {
      if (res.recordset == "") {
        $scope.LogListSize = 0;
        $scope.LogList = [];
      } else {
        $scope.LogList = res.data;
        $scope.LogListSize = $scope.LogList.length;
      }
    });
  };

  $scope.Insert = function () {
    ATMService.Add_Trans($scope.selectedLog).then(function (res) {
      if (res.data == "success") {
        alert("新增成功");
        $scope.Query();
      } else {
        alert("新增失敗: 有可能是資料庫中已經有該個案" + res);
      }
    });
  };

  $scope.Update = function () {
    ATMService.Update_Trans($scope.selectedLog).then(function (res) {
      if (res.data == "success") {
        alert("修改成功");
        $scope.Query();
      } else {
        alert("修改失敗: " + res);
      }
    });
  };

  $scope.Delete = function () {
    ATMService.Delete_Trans($scope.selectedLog).then(function (res) {
      if (res.data == "success") {        
        alert("刪除成功");
        $scope.Query();
      } else {
        alert("刪除失敗: " + res);
      }
    });
  };

  $scope.Clear = function () {
    $scope.LogList = "";
    $scope.selectedLog = "";
    $scope.LogListSize = 0;
  }

  $scope.getLog = function (item, target) {
    console.log(item);
    $scope.selectedLog = $scope.LogList.indexOf(item);
    $scope.selectedLog = {
      "Inday": item.Inday,
      "IdNo": item.IdNo,
      "Name": item.Name,
      "Gender": item.Gender,
      "BSRS": item.BSRS,
      "Status": item.Status,
      "ConsultIssue": item.ConsultIssue,
      "ConsultIssue2": item.ConsultIssue2,
      "Birthday": item.Birthday,
      "Age": item.Age,
      "Phone": item.Phone,
      "Addr": item.Addr,
      "City": item.City,
      "City2": item.City2,
      "Emergency_Contact_Person": item.Emergency_Contact_Person,
      "Emergency_Contact_Phone": item.Emergency_Contact_Phone,
      "Come": item.Come,
      "Firsttime_Person": item.Firsttime_Person,
      "Firsttime_Note": item.Firsttime_Note,
      "Firsttime_Date": item.Firsttime_Date,
      "Psychologist": item.Psychologist,
      "Psychologist_Note": item.Psychologist_Note,
      "Consultstart": item.Consultstart,
      "Consultend": item.Consultend,
      "Consulttime_week": item.Consulttime_week,
      "Consulttime": item.Consulttime,
      "ConsultNo": item.ConsultNo,
      "Call": item.Call,
      "Black": item.Black,
      "ConsultMode": item.ConsultMode,
      "Feedback_Q1": item.Feedback_Q1,
      "Feedback_Q2": item.Feedback_Q2,
      "Feedback_Q3": item.Feedback_Q3,
      "Feedback_Q4": item.Feedback_Q4,
      "Feedback_Q5": item.Feedback_Q5,
      "Feedback_Q6": item.Feedback_Q6,
      "Feedback_Q7": item.Feedback_Q7,
      "Feedback_Q8": item.Feedback_Q8,
      "Feedback_Q9": item.Feedback_Q9,
      "Feedback_Q10": item.Feedback_Q10,
      "Feedback_Q11": item.Feedback_Q11,
      "Feedback_Q12": item.Feedback_Q12,
      "Feedback_Q13": item.Feedback_Q13,
      "Feedback_Q14": item.Feedback_Q14,
      "Feedback_Q15": item.Feedback_Q15,
      "Feedback_Q16": item.Feedback_Q16,
      "Feedback_Q17": item.Feedback_Q17,
      "Feedback_Q18": item.Feedback_Q18,
      "Feedback_Q19": item.Feedback_Q19
    };
    targetElem = target;
  };
});

ATMApp.service('ATMService', function ($http) {
  return ({
    Load_Trans: Load_Trans,
    Add_Trans: Add_Trans,
    Update_Trans: Update_Trans,
    Delete_Trans: Delete_Trans
  });

  function Load_Trans(QueryKeys) {
    var request = $http({
      method: "GET",
      url: "/api/log",
      params: 
      {
         StartSDate: QueryKeys.StartSDate,
         EndSDate: QueryKeys.EndSDate
      }
    });
    return (request.then(handleSuccess, handleError));
  }

  function Add_Trans(instance) {
    var request = $http({
      method: "POST",
      url: "/api/log",
      params: instance
    });
    return (request.then(handleSuccess, handleError));
  }

  function Update_Trans(instance) {
    instance.method = "update";
    var request = $http({
      method: "POST",
      url: "/api/log",
      params: instance
    });
    return (request.then(handleSuccess, handleError));
  }

  function Delete_Trans(instance) {
    var request = $http({
      method: "POST",
      url: "/api/log",
      params: {
        "method": "delete",
        "IdNo": instance.IdNo,
        "ConsultDate": instance.ConsultDate
      }
    });
    return (request.then(handleSuccess, handleError));
  }

  function handleSuccess(response) {
    return (response);
  }

  function handleError(response) {
    return (response);
  }
});