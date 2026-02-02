This is a node js project template, which anyone ca use as it has been prepared, by keeping some of the most important code priciples and project management recommendation.

`src` --> Inside the src folder all the actuall source code regarding the project will resides, this will not includes any kind of tests(you might want to make seperate tests folder)

Lets take a look insida the `src` folder

- `config` --> In this folder anything and everything regarding any configurations or setup of a library or module will be done for example: setting or .env so that we can use envirorment variable in a cleaner fashion , this is the done in the `server-config.ts`. One more example can be to setup your logging library that can help toyou to prepare miningfull logs, so configuration of this library should also be done here

- `routes` --> In the routes folder , we register a route and the corresponding middleware and controllers to it.

- `middlewares` --> They are just going to intercept the incoming request where we can write our validatorrs , authenticators etc.

- `controllers` --> They are kind of last middlewares as post them you call your business layer to execute the business logic. In controllers we just receives the incoming request and data and then pass it to the business layer, and once business layer returns output we structure the API response in controllers and send the output.

- `repositories` --> This folder contains all the logic using which we interact the DB by writing queries, all the raw queries or ORM queries will go here.

- `services` --> Contains the business logic and interacts with repositories for data from the database.

- `utils` --> Contains helper methods , error classes etc.
