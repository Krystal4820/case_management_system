module.exports = {
    HTTPServer: {
        "viewsRoot": "../views",
        "httpPort": 80,
        "timeout": 30000
    },
    BUILD_MODE: "PRODCUTION", // DEBUG, VERBOSE, PRODCUTION 
    LOG_PATH: "/data/log/debug.log",
    mssql: {
        "MouHgccRecord": { 
            "user": "sa",
            "password": "ntunhsim", 
            "server": "DESKTOP-9UGCCB3\\SQLEXPRESS",
            "database": "MouHgccRecord"
        }
    }
};