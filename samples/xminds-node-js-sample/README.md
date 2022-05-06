# Xminds NodeJS + Javascript SDK's examples

Examples of how to use our both NodeJS and Javascript official SDKs.

In particular this example shows how to generate a refresh token with permissions limited to a frontend user.
More information regarding frontend authentication can be found in the [API Documenation](https://docs.api.crossingminds.com/authentication.html#login-and-specifying-a-frontend-user).

This sample is composed of two modules:

**backend-app** to provide examples of how to use our [NodeJS client](https://www.npmjs.com/package/xminds-sdk-nodejs), mainly on how to call `loginServiceAccount` for a specific `frontendUserId`.

**frontend-app** to provide examples of how to use our [Javascript client](https://www.npmjs.com/package/xminds-sdk-js), using a `refreshToken` obtained from the `backend` side.

Both modules are deployed together to be able to interact with each other.

<details><summary>Expand here to see the flow chart</summary>
![mvp javascript and nodejs clients drawio](https://user-images.githubusercontent.com/6473986/160758601-e2fb7640-c864-466f-8672-e693062e8fee.png)
</details>

## API Credentials
Replace the values of the environment file `backend-app/.env`
with the credentials of a Crossing Minds API service account with `frontend` role in the .env file.
You can create a new service account in the [Dashboard](https://dashboard.crossingminds.com/).

## Run the Apps
We can easily run the whole with only a single command:
```bash
docker-compose up
```

Docker will pull the Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the Apps
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```

## Testing the Frontend
Access to `http://localhost:3000/` enter a `User ID` in the text field and click `Get Reco` button to get User to Items recommendations for the given User ID.

The items ID should be similar to the ones you would see in our [User-to-Items Recommedation Dashboard](https://dashboard.crossingminds.com/post-auth/user-to-items) for this user ID.

Note that for this sample demo, the properties of the items are randomly generated in the frontend.


<details><summary>Example</summary>
![Screenshot from 2022-03-30 02-38-57](https://user-images.githubusercontent.com/6473986/160759069-edeb2ed4-4c1a-4dfd-b43f-b1b667b814e4.png)
</details>


## Testing the Backend
Access to `http://localhost:8000/` to get the response `{"message":"Backend application is already working!"}` if the backend is alive!
