const path = require("path")

module.exports = {
    entry: "./lib/index.js",
    output: {
        filename: "xminds-sdk.js",
        path: path.resolve(__dirname, "dist"),
        library: "XmindsClient"
    }
}