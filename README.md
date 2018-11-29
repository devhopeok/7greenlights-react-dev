# 7GreenLights front-end

## Dependencies
 - Node.js for running development server
 - npm for handling JS packages
 - Webpack to bundle our files into static assets for the web server

**Note:**  *recommended Node >= 6 and npm >= 3 for faster installation speed and better disk usage*

## Getting Started
 1. Clone the repo
 2. Enter its directory
 3. Install Webpack `$ npm i webpack@1.13.2 -g`
 4. Install Webpack Dev Server `$ npm install webpack-dev-server@1.16.1 -g` *(might need sudo)*
 5. Install project dependencies `$ npm install`
 6. Create three credentials files on the project's root folder called credentials-local.js, credentials-prod.js and credentials-dev.js where you'll store your external API keys and server URL for webpack to grab. The content of each file is as follows with the corresponding keys for each environment:
 ```
 var credentials = {
    serverUrl: "YOUR-7G-API-URL",
    facebookAppId: "FACEBOOK-APP-ID",
    instagramClientId: "INSTAGRAM-CLIENT-ID",
    instagramClientSecret: "INSTAGRAM-CLIENT-SECRET",
    pusherKey: "PUSHER-KEY",
    soundCloudClientId: "SOUNDCLOUD-CLIENT-ID",
 };

 module.exports = credentials;
 ```
 7. Start the dev server to get the server running on port 8080! `$ npm start`

## Running tests
 1. Simply run `$ npm run test` to have a watcher running tests on the background

## Libraries used
 - [**ReactJS**](https://facebook.github.io/react/)
 - [**Redux**](http://redux.js.org)
 - [**react-redux**](https://github.com/reactjs/react-redux) which brings a nice way to integrate both
 - [**redux-devtools**](https://github.com/facebook/react-devtools) for debugging
 - [**react-router**](https://github.com/ReactTraining/react-router) for routing
 - [**redux-form**](http://redux-form.com/) for form handling using Redux
 - [**validate.js**](https://validatejs.org) for form validation
 - [**Webpack**](https://webpack.github.io/) for bundling JS and other assets into static files
 - [**axios**](https://github.com/mzabriskie/axios) library to make remote HTTP requests using promises
 - [**Mocha**](https://mochajs.org/) Mocha for running JS tests
 - [**Chai**](http://chaijs.com/) Chai for test assertions
 - **Babel** with its ES6 and React presets to transpile our code to normal JS since ES6 and JSX are not fully supported by all browsers
 - Linting libraries for JS ES6, Babel, JSX and SCSS for dev environments
