# Sitepoint Frontend Test Answer

## Running the development environment

The app has been configured to support docker-compose. If you're using docker-compose, simply: ```docker-compose build``` and ```docker-compose up``` to start the development environment.

Otherwise you'll need Node 0.10.38 (or something close to it) and npm. Simply run ```npm install``` for depedencies then ```npm run start``` to start the development environment.

The development environment itself supports automatic code watching the compilation, however you will need to refresh the browser to see changes.

## Running the tests

```npm test``` will begin Jest and execute the tests. Two _todos_ for the tests are:

* The table component doesn't have tests due to the use of the MartyJS container. I'm not sure how to test it quite yet.
* Some of the Jest tests use setTimeout to watch for ```setState()``` calls. ```jest.runAllTicks()``` should take care of this but doesn't, I'm not sure why.

## Build thoughts

These are some thoughts about the decisions I'm making and the project structure as I set this project up.

* Whoever wrote the server has assumed only two files being served to the client, app.js and app.css - this is kind of odd. It doesn't say anywhere in the instructions that this is a requirement so I'm modifying the server to serve any static asset present in the static folder. I've added:

    ```app.use(express.static(__dirname + '/static'));```

    To the server and moved the counter.js into the scripts folder. This is how I would setup a project with the expectation that it might host multiple apps.

    I also removed two catch alls at the end of the script which would serve the index.html instead of a 404 - this caused problems with debugging as it's useful to know when a file doesn't exist!

## Used 3rd party libs

* Webpack (ES6 syntax, packaged assets, modular build)
* React
* ImmutableJS (easy state updates)
* MartyJS (flux pattern implementation)
* Jest (test runner, mocks and assertions)
* Docker/Docker-compose (local environment management)

## Conclusion

This actually took quite a bit longer then I would have liked for a few reasons.

- Work is quite stop start when you have a baby!
- MartyJS had undergone quite a few changes even in the space of the month since I'd last used it.
- I had a false start with the intention of using RequireJS to satisfy the requirement of no globel installs for npm before I'd figured out how to run Webpack locally.
- I wanted to improve the quality of my tests using Jest so it took a bit longer to figure out using it correctly.
- I'd never used docker/docker-compose
- This is the first project I've written on my new laptop running Arch.
- I wasn't too across using ImmutableJS but wanted to trail using it in an app.

All up it was about 8 - 10 hours total. The actual business logic of the app was very straight forward with most of the time being consumed with enviromental things. Overall though I'm very happy with the outcome of the project and will likely use this setup or something very similar to it as a template for future React/Flux apps. I particually like having docker-compose so I don't have to pollute my machine with various libraries. It would also make deploying the app much easier.

Sam (sam@richardson.co.nz)
