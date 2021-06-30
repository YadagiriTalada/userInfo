# userInfo #

The application provides User Registration and Login through Restful API's. Data is transferred as JSON-objects.

### Swagger documentation ###
On the project, we use the Restful API documentation via Swagger. It is available at swagger folder.

Steps to check the API's docs through swagger.

1. Open editor.swagger.io
2. Copy the contents from design.yaml under the swagger folder.
3. Replace the existing content at editor.swagger.io with this copied content.

### Running the application locally with local database ###
1.  Make sure you have Node.js with version 12.13.1(Recommended) installed on your system. If you don't have Node.js installed, you can install it from [here](https://nodejs.org/en/).
2. Make sure you have MongoDB server and client installed on your system. 
3. It would be good if you can install MongoDB Compass Community for a better UI.
4. Run MongoDB using default port "localhost:27017"
5. Create database with name userInfo.
6. Clone this repository
7. On the command line, navigate to the userInfo folder
8. Install the application dependencies
```sh
$ npm i
```
9. To start local dev server use folowing comand
```sh
$ npm run start
```
### npm scripts listing ###
```
start - run application in development mode
```