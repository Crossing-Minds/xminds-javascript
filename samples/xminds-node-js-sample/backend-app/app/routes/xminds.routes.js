module.exports = app => {
    const xminds = require("../controllers/xminds.controller.js");
    var router = require("express").Router();
    // Login as service account
    router.post("/loginService", xminds.loginService);
    app.use("/api/xminds", router);
};
