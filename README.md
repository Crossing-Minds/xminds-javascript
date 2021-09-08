# Xminds Javascript SDK

The JS Xminds SDK is a lightweight library that allows you to integrate Crossing Minds into your website using a `refresh_token`. 

It is based on the Crossing Minds B2B API and will have access to the three types of recommendation endpoints:
- profile-to-items recommendations (requires user_id)
- session-to-items recommendations (does not require user_id)
- item-to-items recommendations (does not require user_id)


As well as managing user/item ratings or interactions, such as:
- create new interaction e.g. add one purchase (requires user_id)
- get items and users



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
const host = "https://staging-api.crossingminds.com";
const refreshToken = "/lDHAxJIFwGg02B3Z8m1XA/RtqgoZczWUCeo93UsZceS/kmJfe8p++50hOBJnyaqjrU8pPGmFmCvSxk6JPdxTg=="; // comes from the backend, and is linked to db_id and userId
const client = new ApiClient(refreshToken, host);
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
