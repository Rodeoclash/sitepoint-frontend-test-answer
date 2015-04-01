# Setting up the app

# Running the tests

# Build thoughts

These are some thoughts about the decisions I'm making and the project structure as I set this project up.

* Whoever wrote the server has assumed only two files being served to the client, app.js and app.css - this is kind of odd. It doesn't say anywhere in the instructions that this is a requirement so I'm modifying the server to serve any static asset present in the static folder. I've added:

    app.use(express.static(__dirname + '/static'));

To the server and split the css/js out into their own folders (styles and scripts respectivly)

I also removed two catch alls at the end of the script which would serve the index.html instead of a 404 - this caused problems with debugging as it's useful to know when a file doesn't exist.
