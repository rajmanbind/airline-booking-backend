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

### Setup the project

-  Download this template from github and open it in your favourite text editor.
- Go inside the root directory and execute the following command: 
```
npm install
```
- In the root directory create `.env` file and the following env variables
``` 
    PORT= <port number of your choice>
```
ex:
```
PORT=3000

```
- Inside the `src/config` folder create a file name as `config.json` and write the following code:
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
- Go inside `src` folder and run the following command: 
```
npx sequelize init
```
- by executing the above command you will get migrations and seeeders folder along with `config.json` file inside the config folder.

- If you are setting up your developement evironment, then write the username of your db, passwordof your db and in  dialec mention whatever db you are using for ex:  mysql, pg, mariadb etc

- If you're setting up test or production environment, make sure you also replace the post with the hosted db url.

- To run the server execute:
``` 
npm run dev
```