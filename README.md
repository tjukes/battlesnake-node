# battlesnake-node(js)

A simple [BattleSnake AI](http://battlesnake.io) written in Javascript for NodeJS. Founded on the [Sendwithus starter snake](https://github.com/sendwithus/battlesnake-node)

--------------------------------

### Team: Nate Rosenstock, Arkadi Futerman, Ryder Bergerud, Tana Jukes

Use branches for feature development or personal experimentation: `git checkout -b some-new-branch-name`

Merge to master via Github pull requests.

--------------------------------

### Getting started (from Sendwithus)
See https://github.com/sendwithus/battlesnake-node for full details or to start a new snake from a blank slate.

To get started you'll need a working NodeJS development environment, and at least read the Heroku docs on [deploying a NodeJS app](https://devcenter.heroku.com/articles/getting-started-with-nodejs).

If you haven't setup a NodeJS development environment before, read [how to get started with NodeJS](http://nodejs.org/documentation/tutorials/). You'll also need [npm](https://www.npmjs.com/) for easy JS dependency management.

This client uses [Express4](http://expressjs.com/en/4x/api.html) for easy route management, read up on the docs to learn more about reading incoming JSON params, writing responses, etc.


### Running the AI locally

Clone this repo via HTTPS or SSH.

Install the client dependencies:

```
npm install
```

Create an `.env` file in the root of the project and add your environment variables (optional).

Run the server:

```
nf start web
```

Test the client in your browser: [http://localhost:5000](http://localhost:5000)

--------------------------------

### Deploying to Heroku

Current Heroku deployment: http://this-snake.herokuapp.com/

Can be updated or replaced as development progresses.
