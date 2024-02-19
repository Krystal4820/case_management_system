var sqlConfig = require('../../config/setting.js').mssql.MouHgccRecord;
var msSql = require('mssql');

function ExecSQL(SqlStr, Config, Acallback) {
    msSql.connect(Config, function (err) {
        if (err) {
            console.error(err);
            Acallback(err, "");
        }
        var request = new msSql.Request();
        console.log("===========SQL Statement ===========");
        console.log(SqlStr + '\r\n');
        request.query(SqlStr, function (err, rsp) {
            msSql.close();
            if (err) {
                console.error(err);
                Acallback(err, "");
            }
            Acallback(err, rsp.recordset);
        });
    });
};

module.exports.queryLog = function (instance, Acallback) {
    var SqlStr = "SELECT *,IIF(Status='待初談',1,IIF(Status='待派案',2,IIF(Status='諮商中',3,IIF(Status='已結案',4,IIF(Status='未初談未開案',5,IIF(Status='已初談未開案',6,IIF(Status='轉介未開案',7,8))))))) AS 狀態";
        SqlStr += ",convert(int,substring([BSRS],1,CHARINDEX('+',[BSRS])-1)) AS BSRS代號\r\n";
        SqlStr += "FROM DATA\r\n";
        SqlStr += "ORDER BY BSRS代號,Psychologist ASC,狀態 ASC,Inday DESC\r\n";
    ExecSQL(SqlStr, sqlConfig, Acallback);
};

module.exports.InsertLog = function (instance, Acallback) {
        var SqlStr = "INSERT INTO DATA(Inday,IdNo,Name,Gender,BSRS,Status,ConsultIssue,ConsultIssue2,Birthday,Age,Phone,Addr,City,City2,";
        SqlStr += "Emergency_Contact_Person,Emergency_Contact_Phone,Come,";
        SqlStr += "Firsttime_Person,Firsttime_Note,Firsttime_Date,Psychologist,Psychologist_Note,Consultstart,Consultend,Consulttime_week,Consulttime,ConsultNo,Call,Black,ConsultMode,";
        SqlStr += "Feedback_Q1,Feedback_Q2,Feedback_Q3,Feedback_Q4,Feedback_Q5,Feedback_Q6,Feedback_Q7,Feedback_Q8,Feedback_Q9,Feedback_Q10,Feedback_Q11,";
        SqlStr += "Feedback_Q12,Feedback_Q13,Feedback_Q14,Feedback_Q15,Feedback_Q16,Feedback_Q17,Feedback_Q18,Feedback_Q19)\r\n";
        SqlStr += "VALUES('" + instance.Inday + "', '" + instance.IdNo + "', '" + instance.Name + "', '" + instance.Gender + "', '";
        SqlStr += instance.BSRS + "', '" + instance.Status + "', '" + instance.ConsultIssue + "', '" + instance.ConsultIssue2 + "', '" + instance.Birthday + "', '";
        SqlStr += instance.Age + "', '" + instance.Phone + "', '" + instance.Addr + "', '" + instance.City + "', '" + instance.City2 + "', '" + instance.Emergency_Contact_Person + "', '";
        SqlStr += instance.Emergency_Contact_Phone + "', '" + instance.Come + "', '" + instance.Firsttime_Person + "', '" + instance.Firsttime_Note + "', '" + instance.Firsttime_Date + "', '";
        SqlStr += instance.Psychologist + "', '" + instance.Psychologist_Note + "', '" + instance.Consultstart + "', '";
        SqlStr += instance.Consultend + "', '" + instance.Consulttime_week + "', '" + instance.Consulttime + "', '";
        SqlStr += instance.ConsultNo + "', '" + instance.Call + "', '" + instance.Black + "', '" + instance.ConsultMode + "', '" + instance.Feedback_Q1 + "', '";
        SqlStr += instance.Feedback_Q2 + "', '" + instance.Feedback_Q3 + "', '" + instance.Feedback_Q4 + "', '" + instance.Feedback_Q5 + "', '";
        SqlStr += instance.Feedback_Q6 + "', '" + instance.Feedback_Q7 + "', '" + instance.Feedback_Q8 + "', '" + instance.Feedback_Q9 + "', '";
        SqlStr += instance.Feedback_Q10 + "', '" + instance.Feedback_Q11 + "', '" + instance.Feedback_Q12 + "', '" + instance.Feedback_Q13 + "', '";
        SqlStr += instance.Feedback_Q14 + "', '" + instance.Feedback_Q15 + "', '" + instance.Feedback_Q16 + "', '" + instance.Feedback_Q17 + "', '";
        SqlStr += instance.Feedback_Q18 + "', '" + instance.Feedback_Q19;
        SqlStr += "');\r\n";
        SqlStr += "SELECT @@ROWCOUNT AS count";
        ExecSQL(SqlStr, sqlConfig, Acallback);
};

module.exports.UpdateLog = function (instance, Acallback) {
    if (instance.IdNo) {        
        var SqlStr = "UPDATE DATA \r\n SET";
        SqlStr += " Inday='" + instance.Inday+ "',";
        SqlStr += " IdNo='" + instance.IdNo+ "',";
        SqlStr += " Name='" + instance.Name+ "',";
        SqlStr += " Gender='" + instance.Gender+ "',";
        SqlStr += " BSRS='" + instance.BSRS+ "',";
        SqlStr += " Status='" + instance.Status+ "',";
        SqlStr += " ConsultIssue='" + instance.ConsultIssue+ "',";
        SqlStr += " ConsultIssue2='" + instance.ConsultIssue2+ "',";
        SqlStr += " Birthday='" + instance.Birthday+ "',";
        SqlStr += " Age='" + instance.Age+ "',";
        SqlStr += " Phone='" + instance.Phone+ "',";
        SqlStr += " Addr='" + instance.Addr+ "',";
        SqlStr += " City='" + instance.City+ "',";
        SqlStr += " City2='" + instance.City2+ "',";
        SqlStr += " Emergency_Contact_Person='" + instance.Emergency_Contact_Person+ "',";
        SqlStr += " Emergency_Contact_Phone='" + instance.Emergency_Contact_Phone+ "',";
        SqlStr += " Come='" + instance.Come+ "',";
        SqlStr += " Firsttime_Person='" + instance.Firsttime_Person+ "',";
        SqlStr += " Firsttime_Note='" + instance.Firsttime_Note+ "',";
        SqlStr += " Firsttime_Date='" + instance.Firsttime_Date+ "',";
        SqlStr += " Psychologist='" + instance.Psychologist+ "',";
        SqlStr += " Psychologist_Note='" + instance.Psychologist_Note+ "',";
        SqlStr += " Consultstart='" + instance.Consultstart+ "',";
        SqlStr += " Consultend='" + instance.Consultend+ "',";
        SqlStr += " Consulttime_week='" + instance.Consulttime_week+ "',";
        SqlStr += " Consulttime='" + instance.Consulttime+ "',";
        SqlStr += " ConsultNo='" + instance.ConsultNo+ "',";
        SqlStr += " Call='" + instance.Call+ "',";
        SqlStr += " Black='" + instance.Black+ "',";
        SqlStr += " ConsultMode='" + instance.ConsultMode+ "',";
        SqlStr += " Feedback_Q1='" + instance.Feedback_Q1+ "',";
        SqlStr += " Feedback_Q2='" + instance.Feedback_Q2+ "',";
        SqlStr += " Feedback_Q3='" + instance.Feedback_Q3+ "',";
        SqlStr += " Feedback_Q4='" + instance.Feedback_Q4+ "',";
        SqlStr += " Feedback_Q5='" + instance.Feedback_Q5+ "',";
        SqlStr += " Feedback_Q6='" + instance.Feedback_Q6+ "',";
        SqlStr += " Feedback_Q7='" + instance.Feedback_Q7+ "',";
        SqlStr += " Feedback_Q8='" + instance.Feedback_Q8+ "',";
        SqlStr += " Feedback_Q9='" + instance.Feedback_Q9+ "',";
        SqlStr += " Feedback_Q10='" + instance.Feedback_Q10+ "',";
        SqlStr += " Feedback_Q11='" + instance.Feedback_Q11+ "',";
        SqlStr += " Feedback_Q12='" + instance.Feedback_Q12+ "',";
        SqlStr += " Feedback_Q13='" + instance.Feedback_Q13+ "',";
        SqlStr += " Feedback_Q14='" + instance.Feedback_Q14+ "',";
        SqlStr += " Feedback_Q15='" + instance.Feedback_Q15+ "',";
        SqlStr += " Feedback_Q16='" + instance.Feedback_Q16+ "',";
        SqlStr += " Feedback_Q17='" + instance.Feedback_Q17+ "',";
        SqlStr += " Feedback_Q18='" + instance.Feedback_Q18+ "',";
        SqlStr += " Feedback_Q19='" + instance.Feedback_Q19+ "'\r\n";
        SqlStr += " WHERE IdNo='" +instance.IdNo + "'\r\n";
        SqlStr += " SELECT @@ROWCOUNT AS count";
        ExecSQL(SqlStr, sqlConfig, Acallback);
    }
    else {
        Acallback("", "Transation ID does not be specified");
    }
};

module.exports.DeleteLog = function (instance, Acallback) {
    if (instance.IdNo) {
        var SqlStr = "DELETE DATA \r\n";
        SqlStr += " WHERE IdNo='" + instance.IdNo + "'";
        ExecSQL(SqlStr, sqlConfig, Acallback);
    }
    else {
        Acallback("", "fail");
    }
};


