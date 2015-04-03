# Sitepoint Frontend Test Answer

## Setting up the app

...

## Tests

My testing strategy has been quite straight forward. For components, I'm only testing those that contain state, in this case that's just the validation around the <CounterAdd/> component. Other components simply broadcast events and it's unnecessary to test MartyJS / React functionality in component unit tests. 

The other significant amount of testing occurs in the CounterStore component. It's test from the "outside" by simulating events and observing that the stores state matches what it should be.

## Build thoughts

These are some thoughts about the decisions I'm making and the project structure as I set this project up.

* Whoever wrote the server has assumed only two files being served to the client, app.js and app.css - this is kind of odd. It doesn't say anywhere in the instructions that this is a requirement so I'm modifying the server to serve any static asset present in the static folder. I've added:

    app.use(express.static(__dirname + '/static'));

To the server and moved the counter.js into a scripts folder. This is how I would setup a project with the expectation that it might host multiple apps.

I also removed two catch alls at the end of the script which would serve the index.html instead of a 404 - this caused problems with debugging as it's useful to know when a file doesn't exist.

## 3rd party libs

* Webpack (ES6 syntax, packaged assets, modular build)
* React
* ImmutableJS (easy state updates)
* MartyJS (flux pattern implementation)
* Jest (test runner, mocks and assertions)
* Docker/Docker-compose (local environment management)