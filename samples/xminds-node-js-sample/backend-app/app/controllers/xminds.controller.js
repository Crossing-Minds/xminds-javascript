const { ApiClient } = require("xminds-sdk-nodejs");

let client = null;

const {
    SERVICE_ACCOUNT_NAME,
    SERVICE_ACCOUNT_PASS,
    SERVICE_ACCOUNT_DBID
} = process.env;

exports.loginService = (req, res) => {
    // Initialize the client instance
    client = new ApiClient(req.body.opts || {});
    // Login as service
    client.loginService(SERVICE_ACCOUNT_NAME, SERVICE_ACCOUNT_PASS,
        SERVICE_ACCOUNT_DBID, req.body.frontendUserId, req.body.opts)
        .then(data => {
            // Send refresh token back to frontend
            res.send({refresh_token: data.refresh_token});
        })
        .catch(err => {
            // Handle error
            res.status(503).send({error: 'unexpected server error'});
        });
}
