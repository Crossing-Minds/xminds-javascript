# Xminds-Javascript SDK

Javascript SDK for Crossing Minds B2B API


## Usage

**1) From Node**

```js
const { ApiClient } = require("./lib/ApiClient.js")

// Initialize the client instance
var api = new ApiClient(REFRESH_TOKEN, HOST)

// Get recommendations
api.getRecommendationsSessionToItems(5)
            .then(data => {
                    console.log(data);
                })
            .catch(err => {
                    console.log(err);
                });
```

**2) From Browser**

```js
<html>
    <body>
    
        <script src="./dist/xminds-sdk.js" type="text/javascript"></script>
        
        <script>
            // Initialize the client instance
            XmindsClient.initialize(REFRESH_TOKEN, HOST);
            
            // Get recommendations
            XmindsClient.getRecommendationsSessionToItems(5)
            .then(data => {
                    console.log(data);
                })
            .catch(err => {
                    console.log(err);
                });

        </script>

    </body>
</html>
```
