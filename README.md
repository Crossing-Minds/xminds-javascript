# Xminds Javascript SDK

The JS Xminds SDK is a lightweight library that allows you to integrate Crossing Minds into your website. 

It is based on the Crossing Minds B2B API and provides the ability to fetch recommendations, items/users and create interactions.


## Installation

With NPM:
```
npm install xminds-js-sdk
```

## Compile
```
npm run build
```

## Usage

**In Node.js**

```js
const { ApiClient } = require("./lib/ApiClient.js");
```

**In Browser**

```js
import { ApiClient } from "./lib/ApiClient.js";
```

```js
<script src="./dist/xminds-sdk.js" type="text/javascript"></script>
```

## Examples

**Initializing the client**
```js
import { ApiClient } from "./lib/ApiClient.js";

// Initialize the client instance
var api = new ApiClient(REFRESH_TOKEN, HOST)
```
**_REFRESH_TOKEN_** = "wUiVkYKGssmYnoH7C1ydxnrcML1T/6e2ip3YMCHagtxPJa1xARva0f4am2fo3aixo0+cd4+dIivIURMZzfvcRg=="

**_HOST_** = "https://staging-api.crossingminds.com" --Optional--

**Fetching recommendations**
```js
// Params
const amt = 5
const filters = [
    { "property_name": "year", "op": "gt", "value": 2000 }
];
// Get items recommendations given a user ID.
client.getRecommendationsUserToItems("192251", amt, null, filters, false)
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
```

**Fetching users**
```js
// Get one user given its ID.
client.getUser("192251")
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

// Get multiple users given their IDs.
client.listUsers(usersId)
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
```

**Fetching items**
```js
// Get one item given its ID.
client.getItem("031242227X")
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

// Get multiple items given their IDs.
client.listItems(itemsId)
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
```

**Creating interaction**
```js
// Create a new interaction for a user and an item
client.createInteraction("192251", "031242227X", "ProductAction/ADD_TO_CART", null)
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });
```

## Documentation

[API documentation](https://docs.api.crossingminds.com/index.html)
